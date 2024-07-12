const { default: mongoose } = require("mongoose");
const blogModal = require("../Modal/blogModal");
const UserModal = require("../Modal/userModal");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

// Configure multer storage with Cloudinar
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Facebook-Clone", // Folder name in Cloudinary
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => file.originalname,
  },
});
const upload = multer({ storage });

//Create-New-Blog
exports.createBlogContoller = async (req, res) => {
  try {
    let imageUrl = null;
    const { title, image, token } = req.body;
    //user validation
    if (!token || !title) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const user = await UserModal.findOne({ token });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }
    if (image) {
      upload.single("image");
      let imageUrl = req.file.path;
    }
    console.log("imageUrl=>", imageUrl);
    // Create a new blog
    const newBlog = new blogModal({ title, image: imageUrl, user });

    // Save the new blog
    await newBlog.save();

    // Add the new blog to the user's blogs array
    user.blogs.push(newBlog);

    // Save the updated user
    await user.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created Sucessful",
      newBlog,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error While Creating Blog",
      error,
    });
  }
};

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
      message: "Blog Updated Suceesful",
      blog,
    });
  } catch (error) {
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
    const { id } = req.params;
    const token = id;
    const populatedUser = await UserModal.findOne({ token }).populate("blogs");
    if (!userBlog) {
      res.status(404).send({
        success: false,
        message: "Blog not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Blog",
      populatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in user blog",
      error,
    });
  }
};

//Like-Unlike-Blog
exports.likeUnlikeContoller = async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.body;
    const blog = await blogModal.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }
    const user = await UserModal.findOne({ token });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }
    const hasLiked = blog.likes.includes(user._id);

    if (hasLiked) {
      blog.likes = blog.likes.filter((like) => like.toString() !== user._id);
      await blog.save();
      return res.status(200).send({
        success: true,
        message: "Blog unliked",
        blog,
        totalLikes: blog.likes.length,
        like: false,
      });
    } else {
      blog.likes.push(user._id);
      await blog.save();
      return res.status(200).send({
        success: true,
        message: "Blog liked",
        blog,
        totalLikes: blog.likes.length,
        like: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error toggling like on the blog",
      error: error.message,
    });
  }
};
