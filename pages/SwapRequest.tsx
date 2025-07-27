"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Skill {
  id: number;
  name: string;
  level: string | null;
}

export default function SwapRequest() {
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const username = searchParams ? searchParams.get("username") : null;
  const location = searchParams ? searchParams.get("location") : null;
  const rating = searchParams ? searchParams.get("rating") : null;
  const bio = searchParams ? searchParams.get("bio") : null;

  const skillsOffered = searchParams
    ? JSON.parse(searchParams.get("skillsOffered") || "[]") as Skill[]
    : [] as Skill[];
  const skillsWanted = searchParams
    ? JSON.parse(searchParams.get("skillsWanted") || "[]") as Skill[]
    : [] as Skill[];
  console.log(bio);

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w mx-auto p-6">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-green-400 hover:text-green-300 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-slate-700 rounded-lg">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div>
                    <CardTitle className="text-2xl text-white">
                      {username}
                    </CardTitle>
                    <p className="text-slate-400">{location}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-white ml-2">{rating}</span>
                      <span className="text-slate-400 ml-1">reviewCount</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-6">{bio}</p>

                {/* Skills Offered */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Skills Offered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsOffered.map((skill: Skill) => (
                      <Badge
                        key={skill.id}
                        className="bg-green-600 text-white hover:bg-green-700 transition-colors"
                      >
                        {skill.name}
                        <span className="ml-1 text-xs opacity-70">
                          ({skill.level})
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Skills Wanted */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Skills Wanted
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsWanted.map((skill: Skill) => (
                      <Badge
                        key={skill.id}
                        className="bg-green-600 text-white hover:bg-green-700 transition-colors"
                      >
                        {skill.name}
                        <span className="ml-1 text-xs opacity-70">
                          ({skill.level})
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Request Form */}
          <div>
            <Card className="bg-slate-800 border-slate-700 rounded-lg sticky top-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-green-400" />
                  Send Swap Request
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    Message (Optional)
                  </label>
                  <Textarea
                    placeholder="Tell them what you'd like to learn and what you can offer in return..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:ring-green-500 focus:border-green-500 rounded-lg min-h-[120px]"
                  />
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors rounded-lg">
                    Send Request
                  </Button>
                </div>

                <div className="text-xs text-slate-400 pt-2 border-t border-slate-700">
                  Your request will be sent to NAME. They can accept, decline,
                  or message you back.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-slate-600 text-white text-lg">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar> */
}

{
  /* <div className="flex items-center bg-black">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(user.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-slate-600"
                            }`}
                          />
                        ))}
                      </div> */
}
