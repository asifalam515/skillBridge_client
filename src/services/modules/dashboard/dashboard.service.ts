import { DashboardResponse } from "@/types/dashboardTypes/dashboard";
import { useEffect, useState } from "react";

export const useDashboard = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/bookings/dashboard`,
          {
            credentials: "include", // important for auth cookies
          },
        );

        if (!res.ok) throw new Error("Failed to fetch dashboard");

        const json = await res.json();
        setData(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { data, loading, error };
};
