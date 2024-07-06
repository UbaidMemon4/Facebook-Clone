import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constent";
import BlogCard from "../BlogCard/BlogCard";
import Skeleton from "../Skeleton/Skeleton";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Avatar, Card } from "antd";
const { Meta } = Card;

const UserBlog_Profile = () => {
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
  return (
    <div>
      <div className="flex justify-center w-full mb-5">
        <Card className="min-w-36 max-w-3xl">
          <h1 className="text-center mb-2 font-bold text-3xl text-blue-500">
            User Info
          </h1>
          <Meta
            avatar={
              <Avatar className="bg-blue-500 text-white">
                {blogs.firstname}
              </Avatar>
            }
            title={blogs.firstname + " " + blogs.Surname}
          />
          <div className=" flex justify gap-2 mt-4">
            <div>
              <h1>
                <b className="text-blue-500">Firstname :</b> {blogs.firstname}
              </h1>
              <br />
              <h1>
                <b className="text-blue-500">Surname :</b> {blogs.Surname}
              </h1>
              <br />
              <h1>
                <b className="text-blue-500">Gender :</b> {blogs.gender}
              </h1>
            </div>
            <div>
              <h1>
                <b className="text-blue-500">Date of birth :</b>{" "}
                {blogs.dateofbirth}
              </h1>
              <br />
              <h1>
                <b className="text-blue-500">Email :</b> {blogs.email}
              </h1>
              <br />
              <h1>
                <b className="text-blue-500">Join Facebook Clone :</b>{" "}
                {blogs.createdAt}
              </h1>
            </div>
          </div>
        </Card>
      </div>
      <div
        className="w-full mt
    -10"
      >
        {populatedUser ? (
          populatedUser.map((blog) => {
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
    </div>
  );
};

export default UserBlog_Profile;
