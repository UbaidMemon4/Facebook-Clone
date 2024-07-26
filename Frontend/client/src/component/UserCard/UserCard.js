import React, { useState } from "react";
import { Avatar, Card, Button, Spin } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../constent";
import toast from "react-hot-toast";

const { Meta } = Card;
const UserCArd = (user) => {
  const [friend, setFriend] = useState(false);

  const cancelReq = async (e) => {
    setFriend(false);
  };
  const addFriend = async (e) => {
    console.log("e", e);

    const token = Cookies.get("JWT");
    try {
      const { data } = await axios.post(
        `${BASE_URL}/user/send-friend-request`,
        {
          senderToken: token,
          receiverId: user.id,
        }
      );
      if (data.success) {
        setFriend(true);
        toast.success("Friend request sent");
      }
    } catch (error) {
      setFriend(false);
      toast.error("Failed to send friend request");
    }
  };
  return (
    <div className="bg-white h-16 mx-10 mb-5 flex justify-between px-10 py-4">
      <Meta
        className="flex justify-between gap-2 "
        avatar={<Avatar>{user.userName}</Avatar>}
        title={user.userName}
      />
      {friend === true ? (
        <Button onClick={() => cancelReq()} className="bg-blue-500 text-white">
          Unsend Friend Request
        </Button>
      ) : (
        <Button onClick={() => addFriend()} className="bg-blue-500 text-white">
          Add Friend
        </Button>
      )}
    </div>
  );
};
export default UserCArd;
