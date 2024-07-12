import React, { useEffect, useState } from "react";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const BlogCard = (blog) => {
  const [like, setLike] = useState(false);
  const [likeLenght, setLikeLenght] = useState(0);
  const { Meta } = Card;
  const navigate = useNavigate();
  const token = Cookies.get("JWT");
  useEffect(() => {
    setLikeLenght(blog.likeLenght);
  }, []);
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
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleLike = async () => {
    // like === true ? setLike(false) : setLike(true);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/blog/like-blog/${blog.id}`,
        { token: token }
      );
      if (data?.success) {
        setLikeLenght(data.totalLikes);
        setLike(data.like);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Card
      key={blog.id}
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
                <div className="flex justify-around ">
                  <LikeOutlined disabled className="text-blue-500" key="like" />
                  {likeLenght}
                </div>
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
                {like === true ? (
                  <div className="flex justify-around ">
                    <LikeFilled
                      className="text-blue-500 hover:text-gray-700 cursor-pointer"
                      key="like"
                      onClick={handleLike}
                    />
                    {likeLenght}
                  </div>
                ) : (
                  <div className="flex justify-around ">
                    <LikeOutlined
                      className="text-blue-500 hover:text-gray-700 cursor-pointer"
                      key="like"
                      onClick={handleLike}
                    />
                    {likeLenght}
                  </div>
                )}
                ,
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
