import React from "react";
import Cookies from "js-cookie";
import LogoutHeader from "../LogoutHeader/logoutHeader";

const HeaderAppjs = () => {
  return (
    <div className="w-full h-10 fixed">
      {Cookies.get("JWT") ? <LogoutHeader /> : null}
    </div>
  );
};

export default HeaderAppjs;
