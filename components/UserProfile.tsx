import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, Calendar, Clock, Edit, Plus, Trash2 } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  description?: string;
}

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    avatar?: string;
    location?: string;
    rating: number;
    totalSwaps: number;
    joinedDate: string;
    bio?: string;
    availability: string;
    skillsOffered: Skill[];
    skillsWanted: Skill[];
  };
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
  onAddSkill?: (type: "offered" | "wanted") => void;
  onRemoveSkill?: (skillId: string, type: "offered" | "wanted") => void;
}

export function UserProfile({ 
  user, 
  isOwnProfile = false, 
  onEditProfile, 
  onAddSkill, 
  onRemoveSkill 
}: UserProfileProps) {
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

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-slate-800 border-slate-700 shadow-lg rounded-xl">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24 border-4 border-green-500/30 rounded-full">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-green-600/10 text-green-400 text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                {isOwnProfile && (
                  <Button onClick={onEditProfile} variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-200 rounded-lg">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-slate-400">
                {user.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{user.rating.toFixed(1)} ({user.totalSwaps} swaps)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {user.joinedDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{user.availability}</span>
                </div>
              </div>
              
              {user.bio && (
                <p className="text-white mt-4 max-w-2xl">{user.bio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Skills Offered */}
        <Card className="bg-slate-800 border-slate-700 shadow-lg rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Skills I Offer</h2>
              {isOwnProfile && (
                <Button
                  onClick={() => onAddSkill?.("offered")}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-200 rounded-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.skillsOffered.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">{skill.name}</span>
                      <Badge
                        className={`text-xs border ${getLevelColor(skill.level)}`}
                        variant="outline"
                      >
                        {skill.level}
                      </Badge>
                    </div>
                    {skill.description && (
                      <p className="text-sm text-slate-400">{skill.description}</p>
                    )}
                  </div>
                  {isOwnProfile && (
                    <Button
                      onClick={() => onRemoveSkill?.(skill.id, "offered")}
                      variant="ghost"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {user.skillsOffered.length === 0 && (
                <p className="text-slate-400 text-center py-8">
                  {isOwnProfile ? "Add your first skill to get started!" : "No skills offered yet."}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skills Wanted */}
        <Card className="bg-slate-800 border-slate-700 shadow-lg rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Skills I Want to Learn</h2>
              {isOwnProfile && (
                <Button
                  onClick={() => onAddSkill?.("wanted")}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-200 rounded-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.skillsWanted.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">{skill.name}</span>
                      <Badge className="text-xs bg-green-600 text-white">
                        Want to learn
                      </Badge>
                    </div>
                    {skill.description && (
                      <p className="text-sm text-slate-400">{skill.description}</p>
                    )}
                  </div>
                  {isOwnProfile && (
                    <Button
                      onClick={() => onRemoveSkill?.(skill.id, "wanted")}
                      variant="ghost"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {user.skillsWanted.length === 0 && (
                <p className="text-slate-400 text-center py-8">
                  {isOwnProfile ? "Add skills you'd like to learn!" : "Not looking to learn any skills yet."}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}