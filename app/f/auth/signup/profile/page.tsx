"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SkillManagement } from "@/components/SkillManagement";
import { Plus } from "lucide-react";
import axios from "axios";

export default function EditProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const username = searchParams ? searchParams.get("username") : null;
  const email = searchParams ? searchParams.get("email") : null;
  const password = searchParams ? searchParams.get("password") : null;
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [avaTime, setAvaTime] = useState("");
  const [ispublic, setisPublic] = useState<boolean>(true);

  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-8 py-8 max-w-2xl ">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2 flex-col">
                <Label
                  htmlFor="location"
                  className="text-foreground font-medium"
                >
                  Location
                </Label>
                <div className="flex items-center justify-between gap-2">
                  <Input
                    id="location"
                    placeholder={"update your location here"}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-foreground font-medium ">
                  Bio
                </Label>
                <div className="flex items-center justify-between gap-2">
                  <Textarea
                    id="bio"
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground resize-none"
                    placeholder={"update your bio here"}
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                  />
                </div>
              </div>

              <div className="space-y-2 text-white">
                <Label
                  htmlFor="availability"
                  className="text-foreground font-medium"
                >
                  Availability
                </Label>
                <div className="flex items-center justify-between gap-2">
                  <Select value={avaTime} onValueChange={setAvaTime}>
                    <SelectTrigger className="border-border text-foreground ">
                      <SelectValue placeholder={"Select availability"} />
                    </SelectTrigger>
                    <SelectContent className="text-white bg-black border-border">
                      <SelectItem value="Weekends">Weekends</SelectItem>
                      <SelectItem value="Evenings">Evenings</SelectItem>
                      <SelectItem value="Weekdays">Weekdays</SelectItem>
                      <SelectItem value="Flexible">Flexible</SelectItem>
                      <SelectItem value="By Appointment">
                        By Appointment
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="space-y-2 text-white">
                <Label
                  htmlFor="availability"
                  className="text-foreground font-medium"
                >
                  profile visibility :
                </Label>
                <div className="flex items-center justify-between gap-2">
                  <Select
                    value={ispublic ? "true" : "false"}
                    onValueChange={(value) =>
                      setisPublic(value === "true" ? true : false)
                    }
                  >
                    <SelectTrigger className="border-border text-foreground ">
                      <SelectValue placeholder={"Select profile visibility"} />
                    </SelectTrigger>
                    <SelectContent className="text-white bg-black border-border">
                      <SelectItem value="true">Public</SelectItem>
                      <SelectItem value="false">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* <div>
                  <p>Add skills to your profile:</p>
                  <SkillManagement skillType="OFFERED">
                    <Button
                      size="sm"
                      className="border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-200 rounded-lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </SkillManagement>
                </div> */}
                {/* <div>
                  <p>Skills you Want to Learn:</p>
                  <SkillManagement skillType="WANTED">
                    <Button
                      size="sm"
                      className="border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-200 rounded-lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </SkillManagement>
                </div> */}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={async () => {
                  const res = await axios.post("/api/auth/signup", {
                    email,
                    password,
                    username,
                    location,
                    bio,
                    ispublic,
                    avaTime,
                  });

                  if (res.status === 200) {
                    router.push("/f/user/profile");
                  }
                }}
                variant="outline"
                className="flex-1 border-border text-muted-foreground hover:text-foreground"
              >
                Sign Up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
