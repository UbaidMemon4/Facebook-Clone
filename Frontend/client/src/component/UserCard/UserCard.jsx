import React from "react";

import { Avatar, Card } from "antd";
const { Meta } = Card;
const UserCArd = (user) => (
  <Card className="mx-10 mb-5">
    <Meta avatar={<Avatar>{user.userName}</Avatar>} title={user.userName} />
  </Card>
);
export default UserCArd;
