import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutHeader from "../../component/LogoutHeader/logoutHeader";
import Cookies from "js-cookie";

const Messages = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Messages || Facebook`;
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
      <div className="pt-16">This Feature is Availake soon</div>
    </div>
  );
};

export default Messages;
