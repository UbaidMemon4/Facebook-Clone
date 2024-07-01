import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SkeletonImage from "../../component/Skeleton/skeleton";
import LogoutHeader from "../../component/LogoutHeader/logoutHeader";
import BlogCard from "../../component/BlogCard/BlogCard";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Home Page || Facebook`;
    const token = Cookies.get("JWT", "data?.token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="bg-login-bg h-full">
      <div className="h-10 ">
        <LogoutHeader />
      </div>
      <div className=" mx-4">
        <div className="py-10 ">
          <BlogCard />
        </div>
        <div>
          <SkeletonImage />
          <SkeletonImage />
        </div>
      </div>
    </div>
  );
};

export default Home;
