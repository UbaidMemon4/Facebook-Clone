import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constent";
import BlogCard from "../BlogCard/BlogCard";
import Skeleton from "../Skeleton/Skeleton";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const AllBLogs = () => {
  const [blogs, setBlogs] = useState([]);
  const getAllBlog = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/blog/all-blog`);
      if (data?.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      toast.error(
        "Blog loading failed due to slow network. Please try again later."
      );
    }
  };
  useEffect(() => {
    getAllBlog();
  }, []);

  return (
    <div className="w-full">
      {blogs ? (
        blogs.map((blog) => {
          console.log(blog);
          return (
            <div key={blog._id}>
              <BlogCard
                description={blog?.title}
                image={blog?.image}
                username={blog?.user?.firstname}
                isUser={Cookies.get("JWT") === blog?.user?.token}
                id={blog?._id}
                likeLenght={blog?.likes.length}
                comments={blog?.comments}
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

export default AllBLogs;
