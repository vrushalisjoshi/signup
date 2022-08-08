const router = require("express").Router();
const { chat } = require("./chat");
var validations = require("./validations.js");

router.post("/", validations, chat);

module.exports = router;
