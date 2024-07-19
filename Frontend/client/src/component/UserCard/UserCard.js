import React, { useState } from "react";
import { Avatar, Card, Button, Spin } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../constent";

const { Meta } = Card;
const UserCArd = (user) => {
  const [spin, setSpin] = useState(false);
  const [friend, setFriend] = useState(false);

  const addFriend = async (e) => {
    console.log("e", e);
    setSpin(true);

    const token = Cookies.get("JWT");
    // try {
    //   const { data } = await axios.post(`${BASE_URL}/user/friend-req/`, {
    //     senderId: user.id,
    //     receiverToken: token,
    //   });
    //   if (data.success) {
    //     setSpin(false);
    //     setFriend(true);
    //   }
    // } catch (error) {
    //   setFriend(false);
    //   setSpin(false);
    //   console.log(error.response.data.message);
    // }
  };
  return (
    <div className="bg-white h-16 mx-10 mb-5 flex justify-between px-10 py-4">
      <Meta
        className="flex justify-between gap-2 "
        avatar={<Avatar>{user.userName}</Avatar>}
        title={user.userName}
      />
      {friend === true ? (
        <Button disabled>Freind Request Send Successflly</Button>
      ) : (
        <Button onClick={addFriend()} className="bg-blue-500 text-white">
          Add Friend
        </Button>
      )}
    </div>
  );
};
export default UserCArd;
