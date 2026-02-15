import BecomeTutorForm from "@/components/tutor/BecomeTutorForm";
import { categoriesService } from "@/services/modules/category/category.service";
import { userService } from "@/services/user.service";

const page = async () => {
  const { data: session, error } = await userService.getSession();
  const { data: categories } = await categoriesService.getCategories();
  console.log(session.user);
  return (
    <div>
      <h1>Become a Tutor</h1>
      <BecomeTutorForm
        user={session.user}
        categories={categories.data}
      ></BecomeTutorForm>
    </div>
  );
};

export default page;
