import Footer from "@/components/(shared)/Footer";
import HeroSection from "@/components/home/HeroSection";
import Tutors from "./tutors/page";

const HomePage = async () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Tutors></Tutors>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
