import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LogoutHeader from "../../component/LogoutHeader/logoutHeader";
import CreateBlog from "../CreateBlog/CreateBlog";
import AllBLogs from "../AllBLogs/AllBLogs";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Home Page || Facebook`;
    const token = Cookies.get("JWT");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="bg-login-bg h-full">
      <div className="w-full h-10 fixed">
        <LogoutHeader />
      </div>
      <div className="pt-10">
        <CreateBlog />
      </div>
      <div className=" mx-4">
        <div className="py-10 ">
          <AllBLogs />
        </div>
      </div>
    </div>
  );
};

export default Home;
