"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  Home,
  LogOut,
  Menu,
  Search,
  Shield,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "student" | "tutor" | "admin";
  avatar?: string;
  notifications?: number;
}

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // // Mock user data - replace with actual authentication logic
  useEffect(() => {
    // Simulate user authentication
    const mockUser: UserData = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "student",
      avatar: "/avatars/john.jpg",
      notifications: 3,
    };
    setUser(mockUser);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // Implement logout logic here
    setUser(null);
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  // Public navigation items
  const publicNavItems = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    {
      href: "/tutors",
      label: "Browse Tutors",
      icon: <Search className="h-4 w-4" />,
    },
  ];

  // Student navigation items
  const studentNavItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      href: "/dashboard/bookings",
      label: "My Bookings",
      icon: <Calendar className="h-4 w-4" />,
    },
  ];

  // Tutor navigation items
  const tutorNavItems = [
    {
      href: "/tutor/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      href: "/tutor/availability",
      label: "Availability",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      href: "/tutor/profile",
      label: "Profile",
      icon: <User className="h-4 w-4" />,
    },
  ];

  // Admin navigation items
  const adminNavItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "/admin/bookings",
      label: "Bookings",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      href: "/admin/categories",
      label: "Categories",
      icon: <Shield className="h-4 w-4" />,
    },
  ];

  // Get role-specific navigation items
  const getRoleNavItems = () => {
    if (!user) return [];
    switch (user.role) {
      case "student":
        return studentNavItems;
      case "tutor":
        return tutorNavItems;
      case "admin":
        return adminNavItems;
      default:
        return [];
    }
  };

  const roleNavItems = getRoleNavItems();

  // Check if a link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full border-b bg-background transition-all duration-200 ${
          scrolled
            ? "backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm"
            : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-foreground">
                  <BookOpen className="h-5 w-5 " />
                </div>
                <span className="text-xl font-bold text-foreground">
                  SkillBridge
                </span>
              </Link>

              {/* Role Badge for logged-in users */}
              {user && (
                <Badge variant="outline" className="ml-3 hidden md:flex">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {/* Public Navigation */}
              {publicNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className="flex items-center gap-2"
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </Link>
              ))}

              {/* Role-specific Navigation */}
              {roleNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className="flex items-center gap-2"
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </Link>
              ))}

              <Separator orientation="vertical" className="mx-2 h-6" />

              {/* Authentication Section */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {user.notifications && user.notifications > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
                          {user.notifications}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                        <Badge variant="secondary" className="mt-1 w-fit">
                          {user.role}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* Profile Link */}
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          user.role === "student"
                            ? "/dashboard/profile"
                            : user.role === "tutor"
                              ? "/tutor/profile"
                              : "/admin"
                        }
                        className="cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    {/* Role-specific Links */}
                    {user.role === "tutor" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/tutor/dashboard"
                            className="cursor-pointer"
                          >
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Tutor Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/tutor/availability"
                            className="cursor-pointer"
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            Availability
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}

                    {user.role === "student" && (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/bookings"
                          className="cursor-pointer"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          My Bookings
                        </Link>
                      </DropdownMenuItem>
                    )}

                    {user.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" onClick={handleLogin}>
                    Login
                  </Button>
                  <Button onClick={handleRegister}>Get Started</Button>
                </div>
              )}
              <Separator orientation="vertical" className="mx-2 h-6" />
              <ModeToggle></ModeToggle>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container mx-auto px-4 py-4">
              {/* Public Navigation */}
              <div className="space-y-1">
                {publicNavItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive(item.href) ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>

              {/* Role-specific Navigation */}
              {user && (
                <>
                  <Separator className="my-3" />
                  <div className="space-y-1">
                    {roleNavItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant={isActive(item.href) ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.icon}
                          {item.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {/* Authentication Section */}
              <Separator className="my-3" />
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                      <Badge variant="secondary" className="mt-1">
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        router.push(
                          user.role === "student"
                            ? "/dashboard/profile"
                            : user.role === "tutor"
                              ? "/tutor/profile"
                              : "/admin",
                        );
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    onClick={() => {
                      handleLogin();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      handleRegister();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
