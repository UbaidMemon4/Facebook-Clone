import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutHeader from "../../component/LogoutHeader/logoutHeader";
import Cookies from "js-cookie";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `User Profile || Facebook`;
    const token = Cookies.get("JWT", "data?.token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      <div className="h-10 ">
        <LogoutHeader />
      </div>
    </div>
  );
};

export default Profile;
