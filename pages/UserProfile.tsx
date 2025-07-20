"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  MapPin,
  Star,
  Calendar,
  Clock,
  Edit,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";

import { useSession } from "next-auth/react";

export function UserProfile() {
  const session = useSession();
  const user = session.data?.user;
  console.log("User Profile Data:", user);

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700 shadow-lg rounded-xl">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
                <Link href="/f/user/profile/editprofile">
                  <Button
                    variant="outline"
                    size="sm"
                    className=" border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-200 rounded-lg"
                  >
                    <Edit className="h-4 w-4 mr-2 " />
                    Edit Profile
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-slate-400">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user?.location || "location"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>rating</span>
                </div>

                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{user?.availability || "availability"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>
                    {user?.profileStatus === true ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <p className="text-white mt-4 max-w-2xl">
                {user?.bio ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 bg-black">
        {/* Skills Offered */}
        <Card className="bg-slate-800 border-slate-700 shadow-lg rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Skill Offered
              </h2>
              <Button
                size="sm"
                className="border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-200 rounded-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div
                // key={skill.id}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">skill.name</span>
                    <Badge
                      // className={`text-xs border ${getLevelColor(
                      //   skill.level
                      // )}`}
                      variant="outline"
                    >
                      skill.level
                    </Badge>
                  </div>

                  <p className="text-sm text-slate-400">skill.description</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Wanted */}
        <Card className="bg-slate-800 border-slate-700 shadow-lg rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Skill Offered
              </h2>
              <Button
                size="sm"
                className="border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-200 rounded-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div
                // key={skill.id}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">skill.name</span>
                    <Badge
                      // className={`text-xs border ${getLevelColor(
                      //   skill.level
                      // )}`}
                      variant="outline"
                    >
                      skill.level
                    </Badge>
                  </div>

                  <p className="text-sm text-slate-400">skill.description</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
