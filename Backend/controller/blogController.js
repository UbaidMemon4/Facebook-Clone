const { default: mongoose } = require("mongoose");
const blogModal = require("../Modal/blogModal");
const UserModal = require("../Modal/userModal");
const jwt = require("jsonwebtoken");

//Get-All-Blogs
exports.getAllBlogsContoller = async (req, res) => {
  try {
    const blogs = await blogModal.find({}).populate("user");

    if (!blogs) {
      return res.status(400).send({
        success: false,
        message: "blog not found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "all blog list",
      blogs,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error While Getting All Blogs",
      error,
    });
  }
};

//Create-New-Blog
exports.createBlogContoller = async (req, res) => {
  try {
    const { title, image, token } = req.body;
    //user validation
    if (!token || !title) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const existingUser = await UserModal.findOne({ token });
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }
    // Create a new blog
    const newBlog = new blogModal({ title, image, token });

    // Save the new blog
    await newBlog.save();

    // Add the new blog to the user's blogs array
    existingUser.blogs.push(newBlog);

    // Save the updated user
    await existingUser.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created Sucessful",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Creating Blog",
      error,
    });
  }
};

//Get-Single-Blog
exports.getBlogByIdContoller = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModal.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found in this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting single blog",
      error,
    });
  }
};

//Update-Blog
exports.updateBlogContoller = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModal.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated Suuceesful",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating blogs",
      error,
    });
  }
};

//Delete-Blog
exports.deleteBlogContoller = async (req, res) => {
  try {
    const blog = await blogModal.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while delete blog",
      error,
    });
  }
};

//Get-User-Blogs
exports.userBlogContoller = async (req, res) => {
  try {
    const { token } = req.params;
    const userBlog = await UserModal.findOne({ token }).populate("blogs");
    if (!userBlog) {
      res.status(404).send({
        success: false,
        message: "Blog not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Blog",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in user blog",
      error,
    });
  }
};
