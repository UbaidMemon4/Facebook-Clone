import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { BASE_URL } from "../../constent/index";
import { authAction } from "../../Redux/store";
import toast from "react-hot-toast";

const LoginHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/login`, {
        email: values.email,
        password: values.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        Cookies.set("JWT", "data?.token");
        dispatch(authAction.Login);
        navigate("/home");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    alert(errorInfo.response.data.message);
  };

  return (
    <div className="flex align-middle justify-between shadow-gray-800 w-100% pr-12">
      <div>
        <img
          onClick={() => navigate("/login")}
          className="mt-1 h-12 cursor-pointer"
          src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
          alt="Facebook"
        />
      </div>
      <div>
        <Form
          className="flex justify-between"
          name="login-form"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              className="h-8 w-36 mr-3 mt-4 "
              placeholder="Email address or phone number"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              className="h-8 w-36 mt-4  "
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              className=" bg-forgotenPassword mt-4 h-8  w-24"
              type="primary"
              htmlType="submit"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginHeader;
