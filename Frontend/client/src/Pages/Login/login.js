import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { BASE_URL } from "../../constent/index";
import { authAction } from "../../Redux/store";

const Login = () => {
  useEffect(() => {
    document.title = `Login Your Acccount || Facebook`;
    const token = Cookies.get("JWT", "data?.token");

    if (token) {
      navigate("/page-not-found");
    }
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/login`, {
        email: values.email,
        password: values.password,
      });

      if (data.success) {
        console.log("data : ", data);
        Cookies.set("JWT", "data?.token");
        dispatch(authAction.Login);
        navigate("/home");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="bg-login-bg flex flex-wrap justify-around pt-28 pb-4 h-auto">
        <div className="w-96 ml-10 mt-20">
          <div className="_8ice">
            <img
              className="fb_logo _8ilh img pb-5 h-36 m-forLoginMargin"
              src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
              alt="Facebook"
            />
            <h2 className="_8eso text-xl w-loginWidth">
              Facebook helps you connect and share with the people in your life.
            </h2>
          </div>
        </div>
        <div className="mt-10 mr-10 mb-10 -loginWidth2 h-loginheight">
          <div>
            <div className="bg-white pt-6 pb-3 rounded-lg shadow-loginForm">
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
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    className="w-270 ml-7"
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
                    className="w-270 ml-7"
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button
                    className="w-270 ml-nagative82 bg-forgotenPassword"
                    type="primary"
                    htmlType="submit"
                  >
                    Log in
                  </Button>
                </Form.Item>
                <h1
                  className="text-forgotenPassword text-sm text-center font-medium cursor-pointer"
                  onClick={() => navigate("/forgetpassword")}
                >
                  Forgotten Password
                </h1>
                <div className="_8icz mx-4 my-5 border border-dadde1"></div>
                <div v="_6ltg">
                  <Button
                    onClick={() => navigate("/signup")}
                    className="bg-formCreateColor text-center text-white mb-1 ml-margin88 h-11"
                  >
                    Create new account
                  </Button>
                </div>
              </Form>
            </div>
            <div className="my-2.5 mx-0.5">
              <a
                href="/login"
                className="decoration-ignore-none text-black text-base "
              >
                <b> Create a Page </b>
              </a>
              <span className="text-sm">
                for a celebrity, brand or business.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
