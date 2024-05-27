import React from "react";
import { Button, Result } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button
        type="primary"
        onClick={() =>
          navigate(Cookies.get("JWT", "data?.token") ? "/home" : "/login")
        }
      >
        Back Home
      </Button>
    }
  />;
};
export default Error;
