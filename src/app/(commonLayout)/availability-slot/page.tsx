"use client";
import AvailabilityManager from "@/components/tutor/AvailabilityManager";
import { authClient } from "@/lib/auth";

const AvailabilitySlot = () => {
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user.id;

  return (
    <div>
      <AvailabilityManager tutorId={userId}></AvailabilityManager>
      <h1>Slot is here</h1>
    </div>
  );
};

export default AvailabilitySlot;
