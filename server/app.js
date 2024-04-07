const express = require("express");
const { body } = require("express-validator");
const mid = require("./Middelware/postMiddle");
//const verifyToken = require("./Middelware/verify-jwt");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const Proute = require("./Routes/postRoutes");
const inscRoute = require("./Routes/registRoute");
const aut_route = require("./Routes/authRoute");
require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(mid.log);
app.use(
  "/register",
  body("username").isLength({ min: 5, max: 10 }).trim().escape(),
  body("password").isLength({ min: 5, max: 10 }).trim().escape(),
  inscRoute
);
app.use("/login", aut_route);

app.use("/blogs", /*verifyToken,*/ Proute);

// Handling any routes that don't match the ones above with a 404

app.use(mid.errorHandling);

mongoose
  .connect("mongodb://127.0.0.1:27017/dbApp")
  .then(() => console.log("connecting in the database"));
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
