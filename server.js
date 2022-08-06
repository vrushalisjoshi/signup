const path = require("path");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const userRoutes = require("./api/users/router");
const PORT = 3000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/api/users", userRoutes);

const server = app.listen(PORT);

console.log(`Running at Port ${PORT}`);

app.get("/", function (req, res) {
  res.sendFile("/signUp.html", { root: path.join(__dirname, "view") });
});

module.exports = server;
