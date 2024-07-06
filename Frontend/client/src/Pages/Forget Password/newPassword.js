import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constent";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const NewPassword = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const em = useSelector((state) => state?.forgetEmail);
  useEffect(
    () => {
      document.title = `New Password || Facebook`;
      const token = Cookies.get("JWT");
      if (token) {
        navigate("/home");
      }
      if (em) {
        setEmail(em);
      }
    },
    [navigate],
    [em]
  );

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/new-password`, {
        email: email,
        otp: values.otp,
        password: values.password,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    alert(errorInfo.response.data.message);
  };

  return (
    <>
      {/* <LoginHeader /> */}
      <hr />
      <div className="bg-gray-200 py-16 flex justify-center">
        <div>
          <div className="flex justify-center ">
            <img
              onClick={() => navigate("/login")}
              className=" h-16 cursor-pointer"
              src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
              alt="Facebook"
            />
          </div>
          <div className="bg-white h-80 w-500 rounded-lg shadow-loginForm">
            <Form
              name="basic"
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
              <h1 className="font-medium text-4xl ml-4 my-2">
                Set New Password
              </h1>
              <p className="ml-4">
                Your Forget Password Email Is : <b>{email}</b>
              </p>
              <hr />
              <br />
              <Form.Item
                name="otp"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  placeholder="Please input your Otp!"
                  className="h-11 w-467 mx-4 border-black placeholder:text-black"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Set New password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  className="h-11 w-467 mx-4 border-black placeholder:text-black"
                />
              </Form.Item>
              <br />
              <hr />

              <Button
                className="mt-3 mr-2 ml-48 bg-gray-300 font-bold h-10 w-36"
                onClick={() => navigate("/login")}
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                className=" bg-gray-300 font-bold h-10 w-36 "
              >
                Change Password
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
