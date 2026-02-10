import { env } from "../../env";

const BACKEND_URL = env.BACKEND_URL;
interface GetBlogParam {
  isFeatured: boolean;
  search: string;
}
export const tutorService = {
  getTutors: async function (params?: GetBlogParam) {
    try {
      const url = new URL(`${BACKEND_URL}/tutor-profiles`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const res = await fetch(url.toString());

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: "something went wrong" };
    }
  },
};
