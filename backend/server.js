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

app.use("/user", userRouter);
