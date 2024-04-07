const Blog = require("../Models/blogs");

const getBlog = async (req, res, next) => {
  try {
    await Blog.find({}).then((data) => {
      res.status(200).json(data);
      console.log("Getting a blogs from  your profile ...");
    });
  } catch (error) {
    next(error);
  }
};

const createBlog = (req, res, next) => {
  try {
    const blog = req.body;
    const newBlog = new Blog({
      user_info: { userId: req.id, username: req.username },
      ...blog,
    });

    newBlog.save().then((data) => {
      res.status(201).send(`Adding Blog : ${data}`);
      console.log("Created a new Blog!");
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res) => {
  try {
    if (!req.body.content || !req.body.title) {
      res.status(400).send("Missing fields");
    } else {
      await Blog.updateOne(
        { _id: req.params.id, userId: req.id },
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
          },
        }
      ).then((updatedBlog) => {
        res.status(200).send(updatedBlog);
        console.log("Updated Blog");
      });
    }
  } catch (err) {
    res.status(204).send("No content");
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const result = await Blog.deleteOne({ _id: req.params.id, userId: req.id });
    if (!result) {
      return res
        .status(401)
        .json({ msg: "You are not authorized to perform this action" });
    }
    res.status(200).json({ msg: "Deleted blog successfully!" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    next(err);
  }
};

const deletedAllBlog = async (req, res, next) => {
  try {
    await Blog.deleteMany({ userId: req.id }).then(() =>
      res
        .status(200)
        .json({ msg: "all Blogs from your profile are deleted succefully" })
    );
  } catch (err) {
    res.status(500).send("failed!!");
    next(err);
  }
};
module.exports = {
  deletedAllBlog,
  deleteBlog,
  updateBlog,
  getBlog,
  createBlog,
};
