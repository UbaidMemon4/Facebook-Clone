import React, { useEffect, useState } from "react";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import { Button, Form, Card, Modal, Input, Avatar, List } from "antd";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const BlogCard = (blog) => {
  const { Meta } = Card;
  const [like, setLike] = useState(false);
  const [open, setOpen] = useState(false);
  const [likeLenght, setLikeLenght] = useState(0);
  const [totalComment, setTotalComment] = useState({});
  const navigate = useNavigate();

  const token = Cookies.get("JWT");
  useEffect(() => {
    setLikeLenght(blog.likeLenght);
    setTotalComment(blog.comments);
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

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/blog/${blog.id}/comments`,
        {
          token: token,
          content: values.content,
        }
      );
      if (data?.success) {
        setTotalComment(data.comment);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  console.log("totalComment=>", totalComment);
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

                <CommentOutlined
                  className="text-blue-500 hover:text-gray-700 cursor-pointer"
                  key="comment"
                />

                <DeleteOutlined
                  className="text-blue-500 hover:text-gray-700 cursor-pointer"
                  key="delete"
                  onClick={handleDelete}
                />

                <EditOutlined
                  className="text-blue-500 hover:text-gray-700 cursor-pointer"
                  key="edit"
                  onClick={() => handleEdit(blog.id)}
                />
              </div>,
            ]
          : [
              <div className="flex justify-around cursor-context-menu">
                {like === true ? (
                  <div className="flex justify-around ">
                    <LikeFilled
                      className="text-gray-500 hover:text-blue-500 cursor-pointer"
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

                <CommentOutlined
                  className="text-blue-500  cursor-pointer"
                  onClick={() => setOpen(true)}
                />

                <Modal
                  title={`${blog.username} Post Comment`}
                  open={open}
                  onCancel={() => setOpen(false)}
                  footer={false}
                >
                  <Form
                    name="add-comment"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    style={{
                      maxWidth: 600,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Add new comment"
                      name="content"
                      rules={[
                        {
                          required: true,
                          message: "Please add your comment!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-blue-500"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                  {totalComment && totalComment.length > 0 ? (
                    totalComment.map((comment) => {
                      console.log(comment);
                      return (
                        <List itemLayout="horizontal">
                          <List.Item>
                            <List.Item.Meta
                              avatar={
                                <Avatar>{comment.user?.firstname}</Avatar>
                              }
                              title={comment.user?.firstname}
                              description={comment.content}
                            />
                          </List.Item>
                        </List>
                      );
                    })
                  ) : (
                    <p>Comments are not available.</p>
                  )}
                </Modal>
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
