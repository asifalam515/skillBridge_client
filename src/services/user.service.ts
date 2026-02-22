import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = cookies();

      const res = await fetch(`${process.env.AUTH_URL}/get-session`);

      const session = await res.json();
      if (!session) return { data: null, error: true };

      return { data: session, error: null };
    } catch {
      return { data: null, error: true };
    }
  },
};

export const getUser = async () => {
  const token = await userService.getSession();
  if (token.error) return null;
  return token.data;
};
