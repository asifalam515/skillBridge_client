import Footer from "@/components/(shared)/Footer";
import HeroSection from "@/components/home/HeroSection";
import TutorsList from "@/components/tutor/TutorsList";
import { tutorService } from "@/services/tutor.service";

const HomePage = async () => {
  const { data } = await tutorService.getTutors({
    isFeatured: false,
    search: "",
  });
  console.log(data.tutors);
  return (
    <div>
      <HeroSection></HeroSection>
      <TutorsList tutors={data.tutors}></TutorsList>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
