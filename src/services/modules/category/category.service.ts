export const categoriesService = {
  getCategories: async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`);
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  },
};
