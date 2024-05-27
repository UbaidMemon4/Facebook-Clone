import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../../component/LoginHeader/loginHeader";
import axios from "axios";
import { BASE_URL } from "../../constent/index";
import { Button, Form, Input } from "antd";
import { authAction } from "../../Redux/store";
import { useDispatch } from "react-redux";

const ForgettenPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = `Forget Password || Facebook`;
    const token = Cookies.get("JWT", "data?.token");

    if (token) {
      navigate("/page-not-found");
    }
  });
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/forget/send-otp`, {
        email: values.email,
      });
      if (data.success) {
        alert("Facebook Clone OTP is Send Successfully");
        dispatch(authAction.ForgetEmail(data.email));
        navigate("/newpassword");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <LoginHeader />
      <hr />
      <div className="py-16 bg-gray-200 flex justify-center">
        <div className="bg-white h-72 w-500 rounded-lg shadow-loginForm">
          <h1 className="font-bold py-3 ml-4 text-xl">Forget Password</h1>
          <hr />
          <p className=" py-3 ml-4 text-xl">
            Please enter your email address or mobile number to search for your
            account.
          </p>
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
            <Form.Item
              className="mt-4 mb-7"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                className="w-467 h-11 mx-4 border-black placeholder:text-black"
                placeholder="Email address or mobile number "
              />
            </Form.Item>
            <hr />
            <div className="flex justify-between gap-2 w-64 mt-4 ml-218">
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  className="bg-gray-300 w-28 font-bold h-10"
                  onClick={() => navigate("/login")}
                >
                  Cancel
                </Button>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  className="w-28 h-10 ml-nagative82 bg-forgotenPassword font-bold"
                  type="primary"
                  htmlType="submit"
                >
                  Send OTP
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgettenPassword;
