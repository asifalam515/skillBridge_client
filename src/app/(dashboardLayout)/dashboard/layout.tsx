<<<<<<< HEAD
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  admin?: React.ReactNode;
  student?: React.ReactNode;
  tutor?: React.ReactNode;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "student" | "tutor" | "admin";
  avatar?: string;
}

export default function RoleBasedLayout({
  children,
  admin,
  student,
  tutor,
}: LayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual userService call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock data - replace with actual userService.getSession()
      const mockUser: UserData = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "student", // Change this to "tutor" or "admin" to test different roles
      };

      setUser(mockUser);
    } catch (err) {
      setError("Failed to load user data");
      console.error("Error loading user data:", err);
      router.push("/login"); // Redirect to login if error
    } finally {
      setLoading(false);
    }
  };

  // Student Dashboard Sidebar Items
  const studentSidebarItems = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/dashboard/bookings",
      label: "My Bookings",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      href: "/dashboard/sessions",
      label: "Learning Sessions",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      href: "/dashboard/reviews",
      label: "My Reviews",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      href: "/dashboard/resources",
      label: "Resources",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  // Tutor Dashboard Sidebar Items
  const tutorSidebarItems = [
    {
      href: "/tutor/dashboard",
      label: "Overview",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      href: "/tutor/sessions",
      label: "Sessions",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      href: "/tutor/availability",
      label: "Availability",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      href: "/tutor/students",
      label: "My Students",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/tutor/earnings",
      label: "Earnings",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      href: "/tutor/reviews",
      label: "Reviews",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      href: "/tutor/profile",
      label: "Profile",
      icon: <User className="h-5 w-5" />,
    },
  ];

  // Admin Dashboard Sidebar Items
  const adminSidebarItems = [
    {
      href: "/admin",
      label: "Overview",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/admin/tutors",
      label: "Tutors",
      icon: <Award className="h-5 w-5" />,
    },
    {
      href: "/admin/bookings",
      label: "Bookings",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      href: "/admin/reports",
      label: "Reports",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      href: "/admin/system",
      label: "System",
      icon: <Shield className="h-5 w-5" />,
    },
  ];

  const getSidebarItems = () => {
    if (!user) return [];
    switch (user.role) {
      case "student":
        return studentSidebarItems;
      case "tutor":
        return tutorSidebarItems;
      case "admin":
        return adminSidebarItems;
      default:
        return [];
    }
  };

  const getRoleDisplay = () => {
    if (!user) return "";
    switch (user.role) {
      case "student":
        return "Student Dashboard";
      case "tutor":
        return "Tutor Dashboard";
      case "admin":
        return "Admin Dashboard";
      default:
        return "Dashboard";
    }
  };

  const getRoleIcon = () => {
    if (!user) return <Home className="h-5 w-5" />;
    switch (user.role) {
      case "student":
        return <GraduationCap className="h-5 w-5" />;
      case "tutor":
        return <Award className="h-5 w-5" />;
      case "admin":
        return <Shield className="h-5 w-5" />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };

  const getWelcomeMessage = () => {
    if (!user) return "";
    switch (user.role) {
      case "student":
        return "Continue your learning journey";
      case "tutor":
        return "Manage your tutoring sessions";
      case "admin":
        return "Manage the platform";
      default:
        return "Welcome to your dashboard";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <div className="md:w-64 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Content Skeleton */}
          <div className="flex-1 space-y-4">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-destructive">
                Authentication Error
              </h2>
              <p className="text-muted-foreground">
                {error || "You need to be logged in to access this page"}
              </p>
              <Button onClick={() => router.push("/login")}>Go to Login</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sidebarItems = getSidebarItems();
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="bg-background min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                  {getRoleIcon()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{getRoleDisplay()}</h1>
                  <p className="text-muted-foreground">
                    Welcome back, {user.name}! {getWelcomeMessage()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="capitalize">{user.role}</Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const isActive =
                      currentPath === item.href ||
                      currentPath.startsWith(item.href + "/");
                    return (
                      <Button
                        key={item.href}
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full justify-start gap-3"
                        onClick={() => router.push(item.href)}
                      >
                        {item.icon}
                        {item.label}
                        {isActive && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </Button>
                    );
                  })}
                </nav>

                <Separator className="my-4" />

                {/* Quick Stats */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Quick Stats
                  </h4>
                  {user.role === "student" && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span>Bookings</span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Hours Learned</span>
                        <span className="font-semibold">48h</span>
                      </div>
                    </>
                  )}
                  {user.role === "tutor" && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span>Upcoming</span>
                        <span className="font-semibold">8</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Earnings</span>
                        <span className="font-semibold">$1,240</span>
                      </div>
                    </>
                  )}
                  {user.role === "admin" && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span>Users</span>
                        <span className="font-semibold">1,240</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Active</span>
                        <span className="font-semibold">856</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Role-based Content */}
            {user.role === "admin" && admin}
            {user.role === "student" && student}
            {user.role === "tutor" && tutor}

            {/* Default children content */}
            {children}
          </div>
        </div>
      </div>
=======
export default function Layout({
  children,
  admin,
  user,
  tutor,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
  tutor: React.ReactNode;
}) {
  const role = "USERZ";
  return (
    <div className="container mx-auto px-4">
      {children}
      {admin}
      {user}
      {tutor}
>>>>>>> 001a91c (layout created)
    </div>
  );
}
