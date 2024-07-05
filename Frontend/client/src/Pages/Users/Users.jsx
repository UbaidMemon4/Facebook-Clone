import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutHeader from "../../component/LogoutHeader/logoutHeader";
import Cookies from "js-cookie";
import UserCard from "../../component/UserCard/UserCard";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../constent";
import Skeleton from "../../component/Skeleton/Skeleton";

const Users = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const getAllUser = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/all-users`);
      if (data?.success) {
        setUser(data?.users);
      }
    } catch (error) {
      toast.error(
        "Blog loading failed due to slow network. Please try again later."
      );
    }
  };
  useEffect(() => {
    document.title = `Find User || Facebook`;
    const token = Cookies.get("JWT");
    if (!token) {
      navigate("/login");
    }
    getAllUser();
  }, [navigate]);
  return (
    <div className="bg-login-bg h-full">
      <div className="pt-5">
        {user ? (
          user.map((users) => {
            return (
              <div key={users._id}>
                <UserCard userName={users?.firstname} />
              </div>
            );
          })
        ) : (
          <div>
            <Skeleton />
            <Skeleton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
