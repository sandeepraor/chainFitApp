const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { query, validationResult, check } = require("express-validator");

const auth = require("../middleware/auth");
const userModel = require("../schema/userSchema");
const bcrypt = require("bcrypt");

router.post(
  "/register",
  [
    check("username").notEmpty(),
    check("email").notEmpty().isEmail(),
    check("phone").notEmpty().isMobilePhone("en-IN"),
    check("password").notEmpty().isLength({ min: 6, max: 12 }),
    check("emergency").notEmpty().isMobilePhone("en-IN"),
  ],
  async function (req, res) {
    try {
      const result = validationResult(req).array();
      if (!(result.length === 0)) {
        return res.status(301).send(result);
      } else {
        const { username, password, email, phone, emergency } = req.body;
        const emailExists = await userModel.findOne({ email: email });
        if (!(emailExists === null)) {
          return res
            .status(400)
            .send("User with Phone or email already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = new userModel({
          username: username,
          password: hash,
          email: email,
          phone: phone,
          emergency: emergency,
        });
        await user.save();
        const payload = {
          user: {
            id: user._id,
          },
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 360000 },
          function (error, token) {
            return res.status(200).json({ token: token });
          }
        );
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }
);
router.post("/auth", (req, res) => {
  const { token } = req.body;
  if (token === null) return res.status(404).send("Token is required");

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({ user: decode.user, message: "Authenticated" });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userByEmail = await userModel.findOne({ email: email });
    if (!userByEmail) {
      return res.status(404).json({ message: "user not found" });
    }
    const payload = {
      user: {
        id: userByEmail._id,
      },
    };
    const isValid = await bcrypt.compare(password, userByEmail.password);
    if (!isValid)
      return res.status(400).json({ message: "Incorrect Password" });
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 60 },
      function (error, token) {
        return res.status(200).json({ token: token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const userData = await userModel.find();
    return res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
