import TutorDetailsPage from "@/components/tutor/TutorDetails";
import { tutorService } from "@/services/tutor.service";
// [{id:asfsf},{id:sfsf},{id:erew}]
export async function generateStaticParams() {
  const { data } = await tutorService.getTutors();
  const arrayOfIds = data?.tutors
    .map((tutor: any) => ({
      id: tutor.id,
    }))
    .splice(0, 3);
  return arrayOfIds;
}
const TutorDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: tutorData, error } = await tutorService.getTutorDetails(
    id as string,
  );
  return (
    <div>
      <TutorDetailsPage tutor={tutorData}></TutorDetailsPage>
    </div>
  );
};

export default TutorDetails;
