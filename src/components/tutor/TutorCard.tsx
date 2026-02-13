"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  Clock,
  GraduationCap,
  MapPin,
  MessageSquare,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

interface Tutor {
  id: string;
  name: string;
  subjects: string[];
  rating: number;
  totalReviews?: number;
  totalStudents?: number;
  experience: number;
  pricePerHr: number;
  bio?: string;
  image?: string;
  isOnline?: boolean;
  isVerified?: boolean;
  languages?: string[];
  education?: string;
  location?: string;
  availability?: string[];
}

interface SingleTutorCardProps {
  tutor: Tutor;
  showBookButton?: boolean;
  showSaveButton?: boolean;
  variant?: "default" | "compact" | "detailed";
  onBookClick?: (tutorId: string) => void;
  onSaveClick?: (tutorId: string, saved: boolean) => void;
  saved?: boolean;
}

const SingleTutorCard = ({
  tutor,
  showBookButton = true,
  showSaveButton = true,
  variant = "default",
  onBookClick,
  onSaveClick,
  saved = false,
}: SingleTutorCardProps) => {
  const {
    id,
    name,
    subjects,
    rating,
    totalReviews,
    totalStudents,
    experience,
    pricePerHr,
    bio,
    image,
    isOnline = false,
    isVerified = true,
    languages = [],
    education,
    location,
    availability = [],
  } = tutor;

  const handleBookClick = () => {
    if (onBookClick) {
      onBookClick(id);
    }
  };

  const handleSaveClick = () => {
    if (onSaveClick) {
      onSaveClick(id, !saved);
    }
  };

  const renderCompactCard = () => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="bg-primary/10">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{name}</h3>
                  {isVerified && (
                    <Badge variant="outline" className="h-5 px-1.5">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {subjects.slice(0, 2).join(", ")}
                </p>
              </div>

              {showSaveButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleSaveClick}
                >
                  {saved ? (
                    <BookmarkCheck className="h-4 w-4 text-primary" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>

            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{rating}</span>
                <span className="text-xs text-muted-foreground">
                  ({totalReviews})
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs">{totalStudents} students</span>
              </div>

              <div className="ml-auto">
                <div className="text-lg font-bold">
                  ${pricePerHr}
                  <span className="text-sm font-normal text-muted-foreground">
                    /hr
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderDefaultCard = () => (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback className="bg-primary/10 text-lg">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isOnline && (
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">{name}</h3>
                {isVerified && (
                  <Badge variant="outline" className="h-6">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              {education && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  <span>{education}</span>
                </div>
              )}

              {location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>

          {showSaveButton && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleSaveClick}
            >
              {saved ? (
                <BookmarkCheck className="h-4 w-4 text-primary" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {/* Rating and Stats */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-bold">{rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({totalReviews} reviews)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {totalStudents?.toLocaleString()} students
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{experience}+ years</span>
          </div>
        </div>

        {/* Subjects */}

        {/* Bio */}
        {bio && variant === "detailed" && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground line-clamp-3">{bio}</p>
          </div>
        )}

        {/* Languages
        {languages.length > 0 && variant === "detailed" && (
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Globe className="h-4 w-4" />
              <span>Languages:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map((language, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {language}
                </Badge>
              ))}
            </div>
          </div>
        )} */}

        {/* Availability */}
        {availability.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span>Available:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availability.slice(0, 3).map((slot, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-green-50 dark:bg-green-950/20"
                >
                  {slot}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-4" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">${pricePerHr}</div>
            <div className="text-sm text-muted-foreground">per hour</div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/tutors/${id}`}>
                <MessageSquare className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </Button>

            {showBookButton && (
              <Button size="sm" onClick={handleBookClick}>
                Book Session
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderDetailedCard = () => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {/* Full detailed view */}
        {renderDefaultCard()}
      </CardContent>
    </Card>
  );

  switch (variant) {
    case "compact":
      return renderCompactCard();
    case "detailed":
      return renderDetailedCard();
    default:
      return renderDefaultCard();
  }
};

export default SingleTutorCard;
export type { SingleTutorCardProps, Tutor };
