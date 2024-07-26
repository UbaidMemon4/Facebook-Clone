import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserCard from "../../component/UserCard/UserCard";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../constent";
import Skeleton from "../../component/Skeleton/Skeleton";
import ReqSendCard from "../../component/ReqSendCard/ReqSendCard";

const Users = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
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
  const getAllFriendRequest = async () => {
    try {
      const token = Cookies.get("JWT");

      const { data } = await axios.get(
        `${BASE_URL}/user/all-friend-requests/${token}`
      );

      if (data.success) {
        setFriendRequests(data.friendRequests);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    document.title = `Find User || Facebook`;
    const token = Cookies.get("JWT");
    if (!token) {
      navigate("/login");
    }
    getAllUser();
    getAllFriendRequest();
  }, [navigate]);
  return (
    <div className="pt-16 bg-login-bg h-full">
      <div>
        <h1
          className="text-blue-500 text-center font-bold 
      text-3xl"
        >
          Friend Request
        </h1>
        <div className="pt-5">
          {friendRequests
            ? friendRequests.map((req) => {
                return (
                  <div key={req._id}>
                    <ReqSendCard userName={req?.firstname} id={req?._id} />
                  </div>
                );
              })
            : ""}
        </div>
      </div>
      <div>
        <h1
          className="text-blue-500 text-center font-bold 
      text-3xl"
        >
          Facebook Clone User List
        </h1>
        <div className="pt-5">
          {user ? (
            user.map((users) => {
              console.log(users);
              return (
                <div key={users._id}>
                  <UserCard userName={users?.firstname} id={users?._id} />
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
    </div>
  );
};

export default Users;
