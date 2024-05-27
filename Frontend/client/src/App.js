import React from "react";
import Login from "./Pages/Login/login";
import "./mediaqueries.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Register/register";
import "./output.css";
import Home from "./Pages/Home/home";
import ForgettenPassword from "./Pages/Forget Password/forgettenPassword";
import NewPassword from "./Pages/Forget Password/newPassword";
import Error from "./component/Error/error";
import Cookies from "js-cookie";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="page-not-found" element={<Error />} />
        <Route
          path="/"
          element={Cookies.get("JWT", "data?.token") ? <Home /> : <Login />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/forgetpassword" element={<ForgettenPassword />} />
      </Routes>
    </>
  );
};
export default App;
