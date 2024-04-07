const express = require("express");

const inscRoute = express.Router();

inscRoute.post("/", require("../Controllers/register").register);

module.exports = inscRoute;
