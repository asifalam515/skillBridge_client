"use client";

import { ModeToggle } from "@/components/(shared)/ModeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Roles } from "@/constants/roles";
import { UserRole } from "@/types/tutor/types";
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
import { usePathname, useRouter } from "next/navigation";
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
  role: UserRole;

  avatar?: string;
}

export default function RoleBasedLayout({
  children,
  admin,
  student,
  tutor,
}: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 500));

      const mockUser: UserData = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "STUDENT",
      };

      setUser(mockUser);
    } catch (err) {
      setError("Failed to load user data");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  // ===================== SIDEBAR DATA =====================
  const studentSidebarItems = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/bookings", label: "Bookings", icon: Calendar },
    { href: "/dashboard/sessions", label: "Sessions", icon: BookOpen },
    { href: "/dashboard/reviews", label: "Reviews", icon: MessageSquare },
    { href: "/dashboard/resources", label: "Resources", icon: FileText },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  const tutorSidebarItems = [
    { href: "/tutor/dashboard", label: "Overview", icon: BarChart3 },
    { href: "/tutor/sessions", label: "Sessions", icon: Calendar },
    { href: "/tutor/availability", label: "Availability", icon: Clock },
    { href: "/tutor/students", label: "Students", icon: Users },
    { href: "/tutor/earnings", label: "Earnings", icon: DollarSign },
    { href: "/tutor/reviews", label: "Reviews", icon: MessageSquare },
    { href: "/tutor/profile", label: "Profile", icon: User },
  ];

  const adminSidebarItems = [
    { href: "/admin", label: "Overview", icon: BarChart3 },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/tutors", label: "Tutors", icon: Award },
    { href: "/admin/bookings", label: "Bookings", icon: Calendar },
    { href: "/admin/reports", label: "Reports", icon: FileText },
    { href: "/admin/settings", label: "Settings", icon: Settings },
    { href: "/admin/system", label: "System", icon: Shield },
  ];

  const sidebarItems =
    user?.role === "STUDENT"
      ? studentSidebarItems
      : user?.role === "TUTOR"
        ? tutorSidebarItems
        : adminSidebarItems;

  // ===================== LOADING =====================
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-6">
          <div className="w-64 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-xl" />
            ))}
          </div>
          <div className="flex-1 space-y-4">
            <Skeleton className="h-12 w-1/3 rounded-xl" />
            <Skeleton className="h-72 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) return null;

  // ===================== ROLE META =====================
  const roleMeta = {
    STUDENT: {
      title: "Student Dashboard",
      icon: GraduationCap,
      subtitle: "Continue your learning journey",
    },
    TUTOR: {
      title: "Tutor Dashboard",
      icon: Award,
      subtitle: "Manage your tutoring sessions",
    },
    ADMIN: {
      title: "Admin Dashboard",
      icon: Shield,
      subtitle: "Manage the platform",
    },
  }[user.role];

  const RoleIcon = roleMeta.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* ================= HEADER ================= */}
      <div className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <RoleIcon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-semibold leading-tight">{roleMeta.title}</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {user.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="capitalize">
              {user.role}
            </Badge>

            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>

            <ModeToggle />
          </div>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* ================= SIDEBAR ================= */}
        <aside className="hidden lg:block w-64">
          <Card className="rounded-2xl border-muted shadow-sm">
            <CardContent className="p-3 space-y-1">
              {sidebarItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                const Icon = item.icon;

                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 rounded-xl"
                    onClick={() => router.push(item.href)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                    {isActive && (
                      <ChevronRight className="ml-auto h-4 w-4 opacity-70" />
                    )}
                  </Button>
                );
              })}

              <Separator className="my-3" />

              {/* Quick Stats */}
              <div className="space-y-2 text-sm">
                <p className="text-xs font-medium text-muted-foreground">
                  Quick Stats
                </p>

                {user.role === Roles.admin && (
                  <>
                    <Stat label="Users" value="1,240" />
                    <Stat label="Active" value="856" />
                  </>
                )}

                {user.role === Roles.tutor && (
                  <>
                    <Stat label="Upcoming" value="8" />
                    <Stat label="Earnings" value="$1,240" />
                  </>
                )}

                {user.role === Roles.student && (
                  <>
                    <Stat label="Bookings" value="12" />
                    <Stat label="Hours" value="48h" />
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* ================= CONTENT ================= */}
        <main className="flex-1 space-y-4">
          {user.role === Roles.admin && admin}
          {user.role === Roles.student && student}
          {user.role === Roles.tutor && tutor}
          {children}
        </main>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg px-2 py-1.5 bg-muted/40 dark:bg-muted/30">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
