import React, { useState } from "react";
import { Avatar, Card, Button } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../constent";
import toast from "react-hot-toast";

const { Meta } = Card;
const ReqSendCard = (user) => {
  const token = Cookies.get("JWT");

  const acceptReq = async (e) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/user/accept-friend-request`,
        {
          friendId: user.id,
          token,
        }
      );
      if (data.success) {
        toast.success("Friend request accept");
      }
    } catch (error) {
      toast.error("Friend request not accept ");
    }
  };
  const cancleReq = async (e) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/user/delete-friend-request`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            friendId: user.id,
          },
        }
      );
      if (data.success) {
        toast.success("Friend request deleted");
      }
    } catch (error) {
      toast.error("friend request not deleted");
    }
  };
  return (
    <div className="bg-white h-16 mx-10 mb-5 flex justify-between px-10 py-4">
      <Meta
        className="flex justify-between gap-2 "
        avatar={<Avatar>{user.userName}</Avatar>}
        title={user.userName}
      />
      <Button onClick={() => acceptReq()} className="bg-blue-500 text-white">
        Accept Friend Request
      </Button>
      <Button onClick={() => cancleReq()} className="bg-blue-500 text-white">
        Delete Friend Request
      </Button>
    </div>
  );
};
export default ReqSendCard;
