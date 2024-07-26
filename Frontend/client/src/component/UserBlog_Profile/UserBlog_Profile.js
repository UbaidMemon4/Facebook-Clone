import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constent";
import BlogCard from "../BlogCard/BlogCard";
import Skeleton from "../Skeleton/Skeleton";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Button, Avatar, Card, Form, Input, Spin } from "antd";

const UserBlog_Profile = () => {
  const [spin, setSpin] = useState(false);

  const [form] = Form.useForm();
  const { Meta } = Card;
  const [populatedUser, setPopulatedUser] = useState([]);
  const onFinish = async (values) => {
    setSpin(true);
    try {
      const { data } = await axios.put(
        `${BASE_URL}/user/update-user/${populatedUser._id}`,
        {
          firstname: values.firstname,
          Surname: values.Surname,
          dateofbirth: values.dateofbirth,
          gender: values.gender,
        }
      );
      if (data.success) {
        setSpin(false);
        toast.success("User Updated ");
        setPopulatedUser({
          ...populatedUser,
          firstname: values.firstname,
          Surname: values.Surname,
          dateofbirth: values.dateofbirth,
          gender: values.gender,
        });
        form.setFieldsValue({
          firstname: values.firstname,
          Surname: values.Surname,
          dateofbirth: values.dateofbirth,
          gender: values.gender,
        });
      }
    } catch (error) {
      setSpin(false);
      toast.error(error.response.data.message);
    }
  };

  const getUserBlogs = async () => {
    const token = Cookies.get("JWT");
    try {
      const { data } = await axios.get(`${BASE_URL}/blog/user-blog/${token}`);
      if (data?.success) {
        // setBlogs(data.userBlog);
        console.log("Success:", data.populatedUser);
        setPopulatedUser(data.populatedUser);
        form.setFieldsValue({
          firstname: populatedUser.firstname,
          Surname: populatedUser.Surname,
          dateofbirth: populatedUser.dateofbirth,
          gender: populatedUser.gender,
        });
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
              <Avatar className="bg-blue-500 text-white mb-4">
                {populatedUser.firstname}
              </Avatar>
            }
            title={populatedUser.firstname + " " + populatedUser.Surname}
          />
          <h1>
            <b>Email:</b> {populatedUser.email}
          </h1>
          <h1>
            <b>Join Facebook:</b> {populatedUser.createdAt}
          </h1>

          <div className="mt-4">
            <Form
              form={form}
              name="basic"
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
            >
              <Form.Item
                label="Firstname"
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Surname"
                name="Surname"
                rules={[
                  {
                    required: true,
                    message: "Please input your Surname!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* {spin === true ? (
                <div className="z-99 flex justify-center">
                  <Spin className=" fixed" />
                </div>
              ) : (
                ""
              )} */}
              <Form.Item
                label="Date-Of-Birth"
                name="dateofbirth"
                rules={[
                  {
                    required: true,
                    message: "Please input your date-of-birth!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please input your gender!",
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
                {spin === false ? (
                  <Button
                    className="bg-blue-500"
                    type="primary"
                    htmlType="submit"
                  >
                    Update Profile Detail
                  </Button>
                ) : (
                  <Button
                    className="bg-createSignUp"
                    type="primary"
                    htmlType="submit"
                    disabled
                  >
                    <Spin />
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
      <div
        className="w-full mt
    -10"
      >
        {populatedUser.blogs ? (
          populatedUser.blogs.map((blog) => {
            return (
              <div key={blog._id}>
                <BlogCard
                  description={blog?.title}
                  image={blog?.image}
                  username={populatedUser?.firstname}
                  isUser={true}
                  id={populatedUser?._id}
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
