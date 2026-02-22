export interface DashboardStats {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  totalEarnings?: number;
  totalStudents?: number;
}

export interface BookingItem {
  id: string;
  subject: string;
  date: string;
  studentName?: string;
  tutorName?: string;
  status: "UPCOMING" | "COMPLETED" | "CANCELLED";
}

export interface DashboardResponse {
  stats: DashboardStats;
  upcomingBookings: BookingItem[];
  pastBookings: BookingItem[];
}
