import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Typography,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
} from "antd";
import Cookies from "js-cookie";
import { BASE_URL } from "../../constent/index";
const { Title } = Typography;
const Signup = () => {
  const [verificationOtp, setVerificationOtp] = useState("");
  const [user, setUser] = useState({
    firstname: "",
    Surname: "",
    email: "",
    password: "",
    dateofbirth: "",
    gender: "",
  });

  useEffect(() => {
    document.title = `Sign Up Or Create A New Account || Facebook`;
    const token = Cookies.get("JWT", "data?.token");

    if (token) {
      navigate("/page-not-found");
    }
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const currentDate = new Date().toDateString();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalClose = () => {
    setIsModalOpen(false);
  };
  const onChange = async (text) => {
    console.log("onChange:", user);
    try {
      const { data } = await axios.post(`${BASE_URL}/user/register-otp`, {
        email: user?.email,
        firstname: user?.firstname,
        Surname: user?.Surname,
        password: user?.password,
        dateofbirth: user?.dateofbirth,
        gender: user?.gender,
        otp: Number(text),
        VerificationOtp: verificationOtp,
      });
      if (data.success) {
        alert(data.message);
        setIsModalOpen(false);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const sharedProps = {
    onChange,
  };
  const onFinish = async (values) => {
    setUser({
      firstname: values.firstname,
      Surname: values.Surname,
      email: values.email,
      password: values.password,
      dateofbirth: values.dateofbirth.$d.getDate(),
      gender: values.radiogroup,
    });
    setIsModalOpen(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/user/register`, {
        email: values.email,
      });
      if (data.success) {
        alert(data.message);
        setVerificationOtp(data.VerificationOtp);
        setIsModalOpen(true);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="bg-login-bg ">
      <div className=" flex justify-center ">
        <img
          className="fb_logo _8ilh img mt-2 h-24 "
          src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
          alt="Facebook"
        />
      </div>
      <div className=" flex justify-center">
        <div className="mb-10 bg-white pt-3 pb-3 rounded-lg shadow-loginForm w-signupWidth text-center">
          <Form
            form={form}
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
            <h1 className="text-2xl">
              <b>Create a new account</b>
            </h1>
            <p>It's quick and easy.</p>
            <div className="_8icz my-5 border border-dadde1"></div>
            <div className="p-4">
              <div className="flex w-full gap-1.5">
                <Form.Item
                  name="firstname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your firstname!",
                    },
                  ]}
                >
                  <Input className="w-148" placeholder="First name" />
                </Form.Item>
                <Form.Item
                  name="Surname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your surname!",
                    },
                  ]}
                >
                  <Input className="w-148" placeholder="Surname" />
                </Form.Item>
              </div>

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
                  type="email"
                  className="w-366"
                  placeholder="email address"
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
                <Input.Password className="w-366" placeholder="New password" />
              </Form.Item>
              <Form.Item
                name="dateofbirth"
                rules={[
                  {
                    type: "object",
                    required: true,
                    message: "Please select time!",
                  },
                ]}
              >
                <DatePicker
                  className="w-366 mr-32.5[e"
                  placeholder={currentDate}
                />
              </Form.Item>
              <Form.Item
                name="radiogroup"
                rules={[
                  {
                    required: true,
                    message: "Please input your Gender!",
                  },
                ]}
              >
                <Radio.Group className="flex gap-1 ">
                  <Radio
                    className="border-2 border-dadde1 h-10 px-52 py-2"
                    value="Male"
                  >
                    Male
                  </Radio>
                  <Radio
                    className="border-2 border-dadde1 h-10 px-52 py-2"
                    value="Female"
                  >
                    Female
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <p className="text-xs text-start px-3">
              People who use our service may have uploaded your contact
              information to Facebook.
              <a
                className="text-blue-600 ml-1"
                href="https://www.facebook.com/help/637205020878504"
              >
                Learn more.
              </a>
            </p>
            <br />
            <p className="text-xs mb-2 text-start px-3">
              By clicking Sign Up, you agree to our
              <a
                className="text-blue-600 ml-1"
                href="https://www.facebook.com/legal/terms/update"
              >
                Terms
              </a>
              ,
              <a
                className="text-blue-600 mr-1"
                href="https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0"
              >
                Privacy Policy
              </a>
              and
              <a
                className="text-blue-600 ml-1"
                href="https://www.facebook.com/privacy/policies/cookies/?entry_point=cookie_policy_redirect&entry=0"
              >
                Cookies Policy
              </a>
              . You may receive SMS notifications from us and can opt out at any
              time.
            </p>

            <Button
              className="w-48 h-9 bg-createSignUp text-white font-boldss"
              type="primary"
              htmlType="submit"
            >
              Verify Email
            </Button>
            <Modal open={isModalOpen} onCancel={onModalClose} footer={null}>
              <Flex gap="middle" align="flex-start" vertical>
                <Title level={3}>Email OTP Verification </Title>
                <p>
                  The Verification email is : <b>{user.email}</b>
                </p>
                <Input.OTP
                  length={4}
                  formatter={(str) => str.toUpperCase()}
                  {...sharedProps}
                />
              </Flex>
            </Modal>
            <p
              onClick={() => navigate("/login")}
              className="text-blue-600 my-2 text-lg cursor-pointer"
            >
              Already have an account?
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
