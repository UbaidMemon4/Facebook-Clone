import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LogoutHeader from "../../component/LogoutHeader/logoutHeader";
import CreateBlog from "../../component/CreateBlog/CreateBlog";
import AllBLogs from "../../component/AllBLogs/AllBLogs";

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
      <div className="pt-10">
        <CreateBlog />
      </div>
      <div className="py-10 mx-28 content-center">
        <AllBLogs />
      </div>
    </div>
  );
};

export default Home;
