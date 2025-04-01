import { useEffect } from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Seperator from "../components/Sepeartor";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      if (decode.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        navigate("/articles");
      }
    }
  }, [navigate]);
  return (
    <div className="overflow-hidden">
      <Navbar />
      <HeroSection />
      <Seperator />
      <Footer />
    </div>
  );
};

export default Home;
