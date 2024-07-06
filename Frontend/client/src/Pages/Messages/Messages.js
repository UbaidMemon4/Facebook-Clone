import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="pt-10 bg-login-bg h-full">
      <div className="py-10">Live messages Feature is Available soon.</div>
    </div>
  );
};

export default Messages;
