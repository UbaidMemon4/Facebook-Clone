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

const { Meta } = Card;
const BlogCard = (blog) => {
  const handleEdit = () => {};
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
      style={{
        width: "100%",
      }}
      cover={blog?.image && <img alt="image" src={blog.image} />}
      actions={[
        blog.isUser === ""
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
                  onClick={handleEdit}
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
      {blog?.titel ? (
        <Meta
          avatar={<Avatar src={blog.userName} />}
          title={blog.userName}
          description={blog.title}
        />
      ) : (
        <Meta avatar={<Avatar src={blog.userName} />} title={blog.userName} />
      )}
    </Card>
  );
};
export default BlogCard;
