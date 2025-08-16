"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

interface Skill {
  userskillid: string;
  name: string;
  description: string;
  level: string | null;
}
interface SelectedSkill {
  id: string;
  type: "OFFERED" | "WANTED";
}
export default function SwapRequest() {
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const username = searchParams ? searchParams.get("username") : null;
  const location = searchParams ? searchParams.get("location") : null;
  const rating = searchParams ? searchParams.get("rating") : null;
  const bio = searchParams ? searchParams.get("bio") : null;
  const availability = searchParams ? searchParams.get("availability") : null;
  const id = searchParams ? searchParams.get("id") : null;

  const skillsOffered = searchParams
    ? (JSON.parse(searchParams.get("skillsOffered") || "[]") as Skill[])
    : ([] as Skill[]);
  const skillsWanted = searchParams
    ? (JSON.parse(searchParams.get("skillsWanted") || "[]") as Skill[])
    : ([] as Skill[]);
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>([]);

  // Inside your SwapRequest component

  const handleCheckboxChange = (
    userskillid: string,
    type: "OFFERED" | "WANTED"
  ) => {
    setSelectedSkills((prev) => {
      // Check if a skill with this ID already exists
      const skillExists = prev.some((skill) => skill.id === userskillid);

      if (skillExists) {
        // If it exists, remove it (unchecking)
        return prev.filter((skill) => skill.id !== userskillid);
      } else {
        // If it doesn't exist, add it (checking)
        return [...prev, { id: userskillid, type: type }];
      }
    });
  };
  console.log(skillsOffered);

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
                <div className="flex flex-col justify-around rounded-2xl bg-slate-800 shadow-lg">
                  <CardTitle className="text-2xl font-semibold text-white mb-1">
                    {username}
                  </CardTitle>
                  <p className="text-sm text-slate-400 mb-3">📍 {location}</p>

                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-white bg-slate-700 px-3 py-1 rounded-full text-sm">
                      ⭐ Rating: {rating}
                    </span>
                    <span className="text-white bg-slate-700 px-3 py-1 rounded-full text-sm">
                      🕒 {availability}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-6">Bio: {bio}</p>

                {/* Skills Offered */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Skills Offered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsOffered.map((skill: Skill) => (
                      <Badge
                        key={skill.userskillid}
                        className="bg-green-600 text-white hover:bg-green-700 transition-colors"
                      >
                        {skill.name}
                        <span className="ml-1 text-xs opacity-70">
                          ({skill.description})
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
                        key={skill.userskillid}
                        className="bg-green-600 text-white hover:bg-green-700 transition-colors"
                      >
                        {skill.name}

                        <span className="ml-1 text-xs opacity-70">
                          ({skill.description})
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
            <Card className="bg-slate-800 border-slate-700 rounded-lg sticky top-6 flex flex-col ">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-green-400" />
                  Send Swap Request
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Skill Selection Section */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                      Skill you want to offer
                    </h3>
                    <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                      {skillsWanted.map((skill) => (
                        <label
                          key={skill.userskillid}
                          htmlFor={skill.name}
                          className="flex items-center space-x-3 p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 hover:border-green-500 transition-all duration-200 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            id={`offer-${skill.userskillid}`}
                            checked={selectedSkills.some(
                              (s: SelectedSkill) => s.id === skill.userskillid
                            )}
                            onChange={() =>
                              handleCheckboxChange(skill.userskillid, "OFFERED")
                            }
                            className="w-4 h-4 rounded border-slate-500 bg-slate-600 text-green-600 focus:ring-green-500 focus:ring-2 focus:ring-offset-0"
                          />
                          <span className="text-slate-300 group-hover:text-white transition-colors font-medium">
                            {skill.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                      Skill you want to learn
                    </h3>
                    <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                      {skillsOffered.map((skill) => (
                        <label
                          key={skill.userskillid}
                          htmlFor={skill.name}
                          className="flex items-center space-x-3 p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 hover:border-green-500 transition-all duration-200 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            id={`offer-${skill.userskillid}`}
                            checked={selectedSkills.some(
                              (s: SelectedSkill) => s.id === skill.userskillid
                            )}
                            onChange={() =>
                              handleCheckboxChange(skill.userskillid, "WANTED")
                            }
                            className="w-4 h-4 rounded border-slate-500 bg-slate-600 text-green-600 focus:ring-green-500 focus:ring-2 focus:ring-offset-0"
                          />
                          <span className="text-slate-300 group-hover:text-white transition-colors font-medium">
                            {skill.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

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
                  <Button
                    onClick={async () => {
                      const res = await axios.post("/api/swap/create", {
                        responderId: id,
                        message,
                        skills: selectedSkills,
                      });

                      console.log("Response:", res);
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors rounded-lg"
                  >
                    Send Request
                  </Button>
                </div>

                <div className="text-xs text-slate-400 pt-2 border-t border-slate-700">
                  Your request will be sent to {username}. They can accept,
                  decline.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
