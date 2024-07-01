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
              <div className="flex justify-around  text-blue-500">
                <LikeOutlined key="like" className="" />,
                <CommentOutlined key="comment" />,
                <DeleteOutlined key="delete" onClick={handleDelete} />,
                <EditOutlined key="edit" onClick={handleEdit} />,
              </div>,
            ]
          : [
              <div className="flex justify-around text-blue-500">
                <LikeOutlined key="like" />, <CommentOutlined key="comment" />
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
