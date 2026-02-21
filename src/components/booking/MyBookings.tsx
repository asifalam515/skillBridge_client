"use client";

import { format } from "date-fns";
import { Calendar, Check, Clock, Edit, Star, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import { Roles } from "@/constants/roles";
import { Booking, UserRole } from "@/types/booking/types";
import { ReviewModal } from "./ReviewModal";

interface MyBookingsProps {
  userRole: UserRole;
  userId: string;
}

const statusColors: Record<Booking["status"], string> = {
  PENDING:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  CONFIRMED:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  COMPLETED: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const statusLabels: Record<Booking["status"], string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const MyBookings = ({ userRole, userId }: MyBookingsProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const router = useRouter();

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bookings?role=${userRole}&userId=${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error(error);
      toast.error("Could not load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userRole, userId]);

  const updateBookingStatus = async (
    bookingId: string,
    newStatus: Booking["status"],
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bookings/status/${bookingId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (!response.ok) throw new Error("Failed to update status");

      // Update local state
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)),
      );

      toast.success(`Booking ${newStatus.toLowerCase()}`);
    } catch (error) {
      toast.error("Could not update booking");
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bookings/${bookingId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      if (!response.ok) throw new Error("Failed to delete");

      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      toast.success("Booking deleted");
    } catch (error) {
      toast.error("Could not delete booking");
    }
  };

  const openReviewModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setReviewModalOpen(true);
  };

  const handleReviewSubmitted = () => {
    fetchBookings(); // Refresh to show review
  };

  const formatDateTime = (dateStr: string) => {
    return format(new Date(dateStr), "PPP 'at' h:mm a");
  };

  // Helper to determine if a booking is in the past
  const isPastBooking = (booking: Booking) => {
    if (!booking.slot) return false;
    return new Date(booking.slot.endTime) < new Date();
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold">No bookings found</h3>
          <p className="text-muted-foreground">
            {userRole === Roles.student &&
              "You haven't booked any sessions yet."}
            {userRole === Roles.tutor && "You have no upcoming sessions."}
            {userRole === Roles.admin && "No bookings in the system."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">
                    {userRole === Roles.student && booking.tutor?.user.name}
                    {userRole === Roles.tutor && booking.student?.name}
                    {userRole === Roles.admin && (
                      <>
                        {booking.student?.name} ↔ {booking.tutor?.user.name}
                      </>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {booking.slot && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        {formatDateTime(booking.slot.startTime)} –{" "}
                        {format(new Date(booking.slot.endTime), "h:mm a")}
                      </div>
                    )}
                  </CardDescription>
                </div>
                <Badge className={statusColors[booking.status]}>
                  {statusLabels[booking.status]}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pb-2">
              {/* Additional info if needed */}
            </CardContent>

            <CardFooter className="flex flex-wrap gap-2 pt-2 border-t">
              {/* Role-specific actions */}
              {userRole === Roles.tutor && (
                <>
                  {booking.status === "PENDING" && (
                    <>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() =>
                          updateBookingStatus(booking.id, "CONFIRMED")
                        }
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          updateBookingStatus(booking.id, "CANCELLED")
                        }
                      >
                        <X className="h-4 w-4 mr-2" />
                        Decline
                      </Button>
                    </>
                  )}
                  {booking.status === "CONFIRMED" && isPastBooking(booking) && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() =>
                        updateBookingStatus(booking.id, "COMPLETED")
                      }
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Mark Completed
                    </Button>
                  )}
                </>
              )}

              {userRole === Roles.student && (
                <>
                  {(booking.status === "PENDING" ||
                    booking.status === "CONFIRMED") && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        updateBookingStatus(booking.id, "CANCELLED")
                      }
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel Booking
                    </Button>
                  )}
                  {booking.status === "CONFIRMED" && isPastBooking(booking) && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() =>
                        updateBookingStatus(booking.id, "COMPLETED")
                      }
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Mark Completed
                    </Button>
                  )}
                  {booking.status === "COMPLETED" && !booking.review && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openReviewModal(booking.id)}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Leave Review
                    </Button>
                  )}
                </>
              )}

              {userRole === Roles.admin && (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Change Status
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {(
                        [
                          "PENDING",
                          "CONFIRMED",
                          "COMPLETED",
                          "CANCELLED",
                        ] as const
                      ).map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() =>
                            updateBookingStatus(booking.id, status)
                          }
                          disabled={booking.status === status}
                        >
                          {statusLabels[status]}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteBooking(booking.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <ReviewModal
        open={reviewModalOpen}
        onOpenChange={setReviewModalOpen}
        bookingId={selectedBookingId}
        tutorId={bookings.find((b) => b.id === selectedBookingId)?.tutorId}
        onSuccess={handleReviewSubmitted}
      />
    </>
  );
};
