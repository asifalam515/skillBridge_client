import TutorsList from "@/components/tutor/TutorsList";
import { tutorService } from "@/services/tutor.service";

const Tutors = async () => {
  const { data } = await tutorService.getTutors({
    isFeatured: false,
    search: "",
  });

  return (
    <div>
      <TutorsList tutors={data.tutors}></TutorsList>
    </div>
  );
};

export default Tutors;
