import React from "react";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const BlogCard = (blog) => {
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/Create-blog/${id}`);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/blog/delete-blog/${blog.id}`
      );
      if (data?.success) {
        toast.success("Blog Deleted!");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Card
      className="w-full mb-4"
      cover={
        blog?.image && (
          <img className="w-full h-2/6" alt="image" src={blog.image} />
        )
      }
      actions={[
        blog.isUser
          ? [
              <div className="flex justify-around  cursor-context-menu">
                <LikeOutlined
                  className="text-blue-500 hover:text-gray-700 cursor-pointer"
                  key="like"
                />
                ,
                <CommentOutlined
                  className="text-blue-500 hover:text-gray-700 cursor-pointer"
                  key="comment"
                />
                ,
                <DeleteOutlined
                  className="text-blue-500 hover:text-gray-700 cursor-pointer"
                  key="delete"
                  onClick={handleDelete}
                />
                ,
                <EditOutlined
                  className="text-blue-500 hover:text-gray-700 cursor-pointer"
                  key="edit"
                  onClick={() => handleEdit(blog.id)}
                />
                ,
              </div>,
            ]
          : [
              <div className="flex justify-around cursor-context-menu">
                <LikeOutlined
                  key="like"
                  className="text-blue-500 hover:text-gray-700 cursor-pointer"
                />
                ,{" "}
                <CommentOutlined
                  key="comment"
                  className="text-blue-500 hover:text-gray-700 cursor-pointer"
                />
              </div>,
            ],
      ]}
    >
      <Meta
        avatar={<Avatar>{blog.username}</Avatar>}
        title={blog.username}
        description={blog.description}
      />
    </Card>
  );
};
export default BlogCard;
