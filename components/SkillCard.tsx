"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Clock, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

interface SkillCardProps {
  id: string;
  userName: string;
  userAvatar?: string;
  location?: string;
  rating: number;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  availability: string;
  isOnline: boolean;
  bio?: string;
}

export function SkillCard({
  id: _id,
  userName,
  userAvatar,
  location,
  rating,
  skillsOffered,
  skillsWanted,
  availability,
  isOnline,
  bio,
}: SkillCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Advanced":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "Expert":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };
  const router = useRouter();
  return (
    <Suspense fallback={<div>loading</div>}>
      <Card className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl hover:bg-slate-750 transition-all duration-300 hover:scale-[1.02] rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-green-500/30 rounded-full">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-green-600/10 text-green-400">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white">{userName}</h3>
                <div className="flex items-center space-x-2 text-sm text-slate-400">
                  {location && (
                    <>
                      <MapPin className="h-3 w-3" />
                      <span>{location}</span>
                    </>
                  )}
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-slate-400">
              <Clock className="h-4 w-4" />
              <span className="text-xs">{availability}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Skills Offered */}
          <div>
            <h4 className="text-sm font-medium text-white mb-2">
              Skills Offered
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillsOffered.slice(0, 3).map((skill) => (
                <Badge
                  key={skill.id}
                  className={`text-xs border ${getLevelColor(skill.level)}`}
                  variant="outline"
                >
                  {skill.name}
                  <span className="ml-1 text-xs opacity-70">
                    ({skill.level})
                  </span>
                </Badge>
              ))}
              {skillsOffered.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs border-slate-600 text-slate-300"
                >
                  +{skillsOffered.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Skills Wanted */}
          <div>
            <h4 className="text-sm font-medium text-white mb-2">Looking For</h4>
            <div className="flex flex-wrap gap-2">
              {skillsWanted.slice(0, 3).map((skill) => (
                <Badge
                  key={skill.id}
                  className="text-xs bg-green-600 text-white shadow-md"
                >
                  {skill.name}
                </Badge>
              ))}
              {skillsWanted.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs border-slate-600 text-slate-300"
                >
                  +{skillsWanted.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button
              onClick={() => {
                router.push(
                  `/f/user/myswaps/swaprequest?username=${userName}&location=${location}&rating=${rating}&availability=${availability}&bio=${bio}&skillsOffered=${JSON.stringify(
                    skillsOffered
                  )}&skillsWanted=${JSON.stringify(skillsWanted)}`
                );
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white transition-colors duration-200 rounded-lg"
              size="sm"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Request Swap
            </Button>

            {/* <Button
            variant="outline"
            size="sm"
            className="border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-200 rounded-lg"
          >
            View Profile
          </Button> */}
          </div>
        </CardContent>
      </Card>
    </Suspense>
  );
}
