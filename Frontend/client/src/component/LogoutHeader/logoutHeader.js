import React from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  MessageOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Popover } from "antd";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const LogoutHeader = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const logout = () => {
    Cookies.remove("JWT");
    toast("Logout Succesfully");
    navigate("/login");
  };

  return (
    <div className="flex justify-between flex-nowrap px-8 ">
      <div className="w-12 py-1">
        <Popover content="Home">
          <img
            onClick={() => navigate("/home")}
            className="h-12 cursor-pointer rounded-3xl "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDsX6Z0K_b_1rnCcnIf2XTSxklQ7FIMOE9TwE-di2zkjIzLrmNbj0xYcb0Xe97mnnOoCE&usqp=CAU"
            alt="Facebook"
          />
        </Popover>
      </div>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Popover content="Home">
            <Tab label={<HomeOutlined />} className="c-blue " />
          </Popover>

          <Popover content="Home">
            <Tab label={<UsergroupAddOutlined />} className="c-blue " />
          </Popover>

          <Popover content="Message">
            <Tab label={<MessageOutlined />} className="c-blue " />
          </Popover>

          <Popover content="Profile">
            <Tab label={<UserOutlined />} className="c-blue" />
          </Popover>
        </Tabs>
      </Box>
      <div className="w-12 py-3 c-blue>">
        <Popover
          className=" text-3xl cursor-pointer"
          content="Logout"
          onClick={logout}
        >
          {<LogoutOutlined />}
        </Popover>
      </div>
    </div>
  );
};

export default LogoutHeader;
