import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Seperator from "../components/Sepeartor";

const Home = () => {
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
