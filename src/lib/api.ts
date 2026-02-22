export const API_URL = "http://localhost:5000/api/v1";

export async function getDashboardStats(token?: string) {
  const res = await fetch(`${API_URL}/bookings/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include", // if cookie auth
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch dashboard");

  return res.json();
}
