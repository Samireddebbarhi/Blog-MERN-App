const express = require("express");
const crud = require("../Controllers/postControllers");
const verifyToken = require("../Middelware/verify-jwt");
const Proute = express.Router();
Proute.get("/", crud.getBlog);
Proute.post("/", verifyToken, crud.createBlog);
Proute.put("/:id", crud.updateBlog);
Proute.delete("/:id", crud.deleteBlog);
Proute.delete("/", crud.deletedAllBlog);

module.exports = Proute;
