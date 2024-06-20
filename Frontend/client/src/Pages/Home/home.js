import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SkeletonImage from "../../component/Skeleton/skeleton";
import LogoutHeader from "../../component/LogoutHeader/logoutHeader";

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
    <>
      <div>
        <div className="h-10">
          <LogoutHeader />
        </div>
      </div>
      <SkeletonImage />
    </>
  );
};

export default Home;
