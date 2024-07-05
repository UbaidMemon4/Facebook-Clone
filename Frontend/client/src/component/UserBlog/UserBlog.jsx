import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constent";
import BlogCard from "../BlogCard/BlogCard";
import Skeleton from "../Skeleton/Skeleton";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [populatedUser, setPopulatedUser] = useState([]);

  const getUserBlogs = async () => {
    const token = Cookies.get("JWT");

    try {
      const { data } = await axios.get(`${BASE_URL}/blog/user-blog/${token}`);
      if (data?.success) {
        setBlogs(data.userBlog);
        setPopulatedUser(data.populatedUser.blogs);
      }
    } catch (error) {
      toast.error(
        "Blog loading failed due to slow network or user have no blog."
      );
    }
  };
  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(populatedUser);
  return (
    <div
      className="w-full mt
    -10"
    >
      {populatedUser ? (
        populatedUser.map((blog) => {
          console.log("blog=>", blogs);
          return (
            <div key={blog._id}>
              <BlogCard
                description={blog?.title}
                image={blog?.image}
                username={blogs?.firstname}
                isUser={true}
                id={blogs?._id}
              />
            </div>
          );
        })
      ) : (
        <div>
          <Skeleton />
          <Skeleton />
        </div>
      )}
    </div>
  );
};

export default UserBlog;
