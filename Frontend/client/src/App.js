import React from "react";
import Login from "./Pages/Login/login";
import "./mediaqueries.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Register/register";
import "./output.css";
import Home from "./Pages/Home/home";
import ForgettenPassword from "./Pages/Forget Password/forgettenPassword";
import NewPassword from "./Pages/Forget Password/newPassword";
import Cookies from "js-cookie";
import Profile from "./Pages/Profile/Profile";
import Users from "./Pages/Users/Users";
import HeaderAppjs from "./component/HeaderAppjs/HeaderAppjs";
import CreateBlog from "./component/CreateBlog/CreateBlog";

const App = () => {
  return (
    <>
      <HeaderAppjs />
      <Toaster />
      <Routes>
        <Route path="/" element={Cookies.get("JWT") ? <Home /> : <Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/forgetpassword" element={<ForgettenPassword />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/Create-blog" element={<CreateBlog />} />
        <Route path="/Create-blog/:id" element={<CreateBlog />} />
      </Routes>
    </>
  );
};
export default App;
