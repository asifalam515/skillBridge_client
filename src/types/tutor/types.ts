export interface TutorDetails {
  id: string;
  name: string;
  headline: string;
  bio: string;
  avatar: string;
  image?: string;
  rating: number;
  totalReviews: number;
  totalStudents: number;
  totalSessions: number;
  experience: number;
  hourlyRate: number;
  categories: [
    {
      tutorId: string;
      categoryId: string;
      category: {
        id: string;
        name: string;
      };
    },
  ];
  subjects: {
    id: string;
    name: string;
    expertise: number;
    rate?: number;
  }[];
  languages: string[];

  availability: {
    day: string;
    slots: string[];
  }[];
  reviews: {
    id: string;
    student: {
      name: string;
      avatar: string;
    };
    rating: number;
    comment: string;
    date: string;
    subject: string;
  }[];
  isOnline: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  responseTime: string;
  responseRate: number;
  location?: string;
  timezone: string;
}

export interface TutorDetailsPageProps {
  tutor: TutorDetails;
  isLoading?: boolean;
  isSaved?: boolean;
  onBookClick?: (tutorId: string, subject?: string, slot?: string) => void;
  onMessageClick?: (tutorId: string) => void;
  onSaveClick?: (tutorId: string, saved: boolean) => void;
  onShareClick?: (tutorId: string) => void;
  onReportClick?: (tutorId: string) => void;
  onReviewClick?: (tutorId: string) => void;
}
export type UserRole = "STUDENT" | "ADMIN" | "TUTOR";
