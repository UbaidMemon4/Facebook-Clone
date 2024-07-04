import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constent";
import BlogCard from "../../component/BlogCard/BlogCard";
import Skeleton from "../../component/Skeleton/Skeleton";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const getUserBlogs = async () => {
    const token = Cookies.get("JWT");
    try {
      const { data } = await axios.get(`${BASE_URL}/blog/user-blog/${token}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      toast.error(
        "Blog loading failed due to slow network. Please try again later."
      );
    }
  };
  useEffect(() => {
    getUserBlogs();
  }, []);
  return (
    <div className="w-full mt-10">
      {blogs.lenght > 0 ? (
        blogs.map((blog) => {
          return (
            <div key={blog._id}>
              <BlogCard
                description={blog?.title}
                image={blog?.image}
                username={blog?.user?.firstname}
                isUser={true}
                id={blog?._id}
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
