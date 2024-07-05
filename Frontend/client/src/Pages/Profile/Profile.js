import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutHeader from "../../component/LogoutHeader/logoutHeader";
import Cookies from "js-cookie";
import UserBlog from "../../component/UserBlog/UserBlog";

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
    <div className="bg-login-bg h-full">
      <div className="w-full h-10 fixed">
        <LogoutHeader />
      </div>
      <div className="pt-10">
        <UserBlog />
      </div>
    </div>
  );
};

export default Profile;
