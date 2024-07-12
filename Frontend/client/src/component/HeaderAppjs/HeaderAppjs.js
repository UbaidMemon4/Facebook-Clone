import React from "react";
import Cookies from "js-cookie";
import LogoutHeader from "../LogoutHeader/logoutHeader";

const HeaderAppjs = () => {
  // let isLogin = useSelector((state) => state.isLogin);
  // console.log("isLogin", isLogin);
  return (
    <div className="w-full h-10 fixed z-99">
      {Cookies.get("JWT") ? <LogoutHeader /> : null}
      {/* {isLogin === true ? <LogoutHeader /> : null} */}
    </div>
  );
};

export default HeaderAppjs;
