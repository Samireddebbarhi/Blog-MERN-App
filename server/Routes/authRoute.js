const express = require("express");
const aut_route = express.Router();

aut_route.post("/", require("../Controllers/authController").HandleLogin);
module.exports = aut_route;
