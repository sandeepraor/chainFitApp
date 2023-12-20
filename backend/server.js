const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");

const userRouter = require("./routes/userRoute");

const app = express();

const PORT = 8000 || process.env.PORT;
app.use(express.json({ extended: false }));

dotenv.config();
dbConnect();

app.listen(PORT, function () {
  console.log("Server connected to port ");
});

app.get("/", (req, res) => {
  return res.send(`
    <html>
      <h1>Api End points</h1>
      
        <h2>POST : /user/register</h2>
        <h2>POST : /user/login</h2>
        <h2>POST : /user/auth</h2>
    
    </html>`);
});
app.use("/user", userRouter);
