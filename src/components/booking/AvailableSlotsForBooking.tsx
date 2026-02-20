"use client";

import { format } from "date-fns";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth";

interface AvailabilitySlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

interface AvailableSlotsForBookingProps {
  tutorId: string;
  onBookingSuccess?: () => void;
}

const AvailableSlotsForBooking = ({
  tutorId,
  onBookingSuccess,
}: AvailableSlotsForBookingProps) => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState<string | null>(
    null,
  );
  const abortControllerRef = useRef<AbortController | null>(null);

  const { data: session } = authClient.useSession();

  const fetchAvailableSlots = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/availability-slots/tutor/${tutorId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch slots");
      }

      const data = await response.json();
      setSlots(data);
    } catch (error) {
      console.error("Fetch slots error:", error);
      toast.error("Could not load available slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tutorId) {
      fetchAvailableSlots();
    }
  }, [tutorId]);

  const handleBookSlot = async (slotId: string) => {
    if (!session?.user) {
      toast.error("Please log in to book a session");
      return;
    }

    // Prevent double-click
    if (bookingInProgress === slotId) return;

    setBookingInProgress(slotId);

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            studentId: session.user.id,
            slotId,
          }),
          signal,
        },
      );

      // If request was aborted, don't process
      if (signal.aborted) return;

      if (!response.ok) {
        // Try to get error message from server
        let errorMsg = "Booking failed";
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorData.error || errorMsg;
        } catch {
          // ignore
        }
        throw new Error(errorMsg);
      }

      // Success
      toast.success("Booking confirmed! 🎉");
      setSlots((prev) => prev.filter((slot) => slot.id !== slotId));
      onBookingSuccess?.();
    } catch (error: any) {
      if (error.name === "AbortError") return; // ignore abort
      console.error("Booking error:", error);
      toast.error(error.message || "Could not book slot");
    } finally {
      setBookingInProgress(null);
      abortControllerRef.current = null;
    }
  };

  const formatSlotTime = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${format(startDate, "EEE, MMM d")} • ${format(
      startDate,
      "h:mm a",
    )} - ${format(endDate, "h:mm a")}`;
  };

  return (
    <Card className="shadow-md border-muted/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Available Sessions
        </CardTitle>
        <CardDescription>Select a time that works for you.</CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        ) : slots.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Clock className="h-14 w-14 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">No available slots</p>
            <p className="text-sm">
              This tutor hasn't set any availability yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border hover:shadow-sm transition"
              >
                <div className="space-y-1">
                  <p className="font-medium text-sm md:text-base">
                    {formatSlotTime(slot.startTime, slot.endTime)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    60 minutes • Online
                  </p>
                </div>

                <Button
                  size="sm"
                  onClick={() => handleBookSlot(slot.id)}
                  disabled={bookingInProgress === slot.id}
                  className="gap-2"
                >
                  {bookingInProgress === slot.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Calendar className="h-4 w-4" />
                  )}
                  {bookingInProgress === slot.id ? "Booking..." : "Book"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailableSlotsForBooking;
