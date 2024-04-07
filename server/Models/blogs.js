const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  user_info: { userId: { type: String }, username: { type: String } },

  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
