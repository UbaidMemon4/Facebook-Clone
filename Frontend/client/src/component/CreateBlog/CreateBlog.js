import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constent/index";
import Cookies from "js-cookie";
import { Button, Form, Input, Spin, Upload } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [spin, setSpin] = useState(false);
  const token = Cookies.get("JWT");
  const paramsId = useParams().id;

  const getBlogDetailForEdit = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/blog/get-blog/${paramsId}`);
      if (data?.success) {
        setInput({
          title: data?.blog?.title,
          image: data?.blog?.image,
          id: data?.blog?._id,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const onFinish = async (values) => {
    setSpin(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/blog/create-blog`, {
        title: values.title,
        image: values.image,
        token: token,
      });

      if (data.success) {
        setSpin(false);
        toast.success("Blog Created");
      }
    } catch (error) {
      setSpin(false);
      toast.error(error.response.data.message);
    }
  };

  const onFinishEdit = async (values) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/blog/update-blog/${input.id}`,
        {
          title: values.title,
          image: values.image,
        }
      );
      if (data.success) {
        setSpin(false);
        toast.success("Blog Updated ");
        window.location.reload();
        navigate(`/home}`);
      }
    } catch (error) {
      setSpin(false);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (paramsId) {
      getBlogDetailForEdit();
    }
  }, [navigate]);

  let formFunction = input.id ? onFinishEdit : onFinish;
  return (
    <div className="text-center mx-28 bg-white  py-3 rounded-lg shadow-loginForm mt-10">
      <div>
        <h1 className="text-blue-500 text-3xl">Add New Blog</h1>
        <hr className="my-2" />
      </div>
      <div className="pt-3">
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
          onFinish={formFunction}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input
              value={input.title}
              className="w-auto"
              placeholder="Title "
            />
          </Form.Item>
          <Form.Item label="Image (Optional)" name="image">
            <Upload
              action="http://localhost:3000/upload"
              listType="picture-card"
              accept=".png"
              maxCount={1}
            >
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            {spin === false ? (
              <Button
                className="w-auto bg-forgotenPassword"
                type="primary"
                htmlType="submit"
              >
                {input.id ? "Update" : "Submit"}
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
    </div>
  );
};

export default CreateBlog;
