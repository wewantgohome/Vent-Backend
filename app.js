const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const router = require("./routes");
const { sequelize } = require("./models");
sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

const path = require("path");
const publicPath = path.join(__dirname, "public");
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
