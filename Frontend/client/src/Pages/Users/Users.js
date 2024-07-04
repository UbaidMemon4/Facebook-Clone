import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutHeader from "../../component/LogoutHeader/logoutHeader";
import Cookies from "js-cookie";

const Users = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Find User || Facebook`;
    const token = Cookies.get("JWT");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      <div className="w-full -10 fixed">
        <LogoutHeader />
      </div>
      <div className="pt-10"></div>
    </div>
  );
};

export default Users;
