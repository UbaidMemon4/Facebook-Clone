import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserBlog_Profile from "../../component/UserBlog_Profile/UserBlog_Profile";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `User Profile || Facebook`;
    const token = Cookies.get("JWT");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="bg-login-bg h-full pt-20 ">
      <div className=" mx-3">
        <UserBlog_Profile />
      </div>
    </div>
  );
};

export default Profile;
