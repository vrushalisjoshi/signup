const router = require("express").Router();
const { signup } = require("./user");
var validations = require("./validations.js");

router.post("/signup", validations, signup);

module.exports = router;
