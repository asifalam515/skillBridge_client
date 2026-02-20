"use client";
import { MyBookings } from "@/components/booking/MyBookings";
import { authClient } from "@/lib/auth";

const BookingsPage = () => {
  const { data } = authClient.useSession();

  return (
    <div>
      <MyBookings
        userRole={data?.user?.role || "STUDENT"}
        userId={data?.user.id || ""}
      />
    </div>
  );
};

export default BookingsPage;
