"use client";
import Link from "next/link";
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
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SkillManagement } from "@/components/SkillManagement";
import { Plus, ArrowLeft } from "lucide-react";
import axios from "axios";

function EditProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const username = searchParams ? searchParams.get("username") : null;
  const email = searchParams ? searchParams.get("email") : null;
  const password = searchParams ? searchParams.get("password") : null;
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [avaTime, setAvaTime] = useState("");
  const [ispublic, setisPublic] = useState<boolean>(true);
  const [LinkedIn_Url, setLinkedIn_Url] = useState("");
  const [Github_Url, setGithub_Url] = useState("");
  const [X_Url, setX_Url] = useState("");
  const [Website_Url, setWebsite_Url] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br flex justify-center items-center from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-8 py-8 max-w-2xl">
        <Link
          href="/f/auth/signup"
          className="inline-flex items-center text-sm text-slate-400 hover:text-green-400 mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2 flex-col">
                <div className="flex flex-col border p-2 m-3">
                  <span>username : {username}</span>
                  <span>email : {email}</span>
                </div>
                <Label
                  htmlFor="location"
                  className="text-foreground font-medium"
                >
                  Location
                </Label>
                <div className="flex items-center justify-between gap-2">
                  <Input
                    id="location"
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
              </div>
              <div className="space-y-2 flex-col">
                <Label
                  htmlFor="Github_Url"
                  className="text-foreground font-medium"
                >
                  Github Url
                </Label>
                <div className="flex items-center justify-between gap-2">
                  <Input
                    id="Github_Url"
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    onChange={(e) => setGithub_Url(e.target.value)}
                    value={Github_Url}
                  />
                </div>
              </div>
              <div className="space-y-2 flex-col">
                <Label
                  htmlFor="LinkedIn_Url"
                  className="text-foreground font-medium"
                >
                  LinkedIn Url
                </Label>
                <div className="flex items-center justify-between gap-2">
                  <Input
                    id="LinkedIn_Url"
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    onChange={(e) => setLinkedIn_Url(e.target.value)}
                    value={LinkedIn_Url}
                  />
                </div>
              </div>
              <div className="space-y-2 flex-col">
                <Label htmlFor="X_Url" className="text-foreground font-medium">
                  X Url
                </Label>
                <div className="flex items-center justify-between gap-2">
                  <Input
                    id="X_Url"
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    onChange={(e) => setX_Url(e.target.value)}
                    value={X_Url}
                  />
                </div>
              </div>
              <div className="space-y-2 flex-col">
                <Label
                  htmlFor="Website_Url"
                  className="text-foreground font-medium"
                >
                  Website Url
                </Label>
                <div className="flex items-center justify-between gap-2">
                  <Input
                    id="Website_Url"
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    onChange={(e) => setWebsite_Url(e.target.value)}
                    value={Website_Url}
                  />
                </div>
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
                    linkedIn: LinkedIn_Url,
                    github: Github_Url,
                    x: X_Url,
                    website: Website_Url,
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

export default function EditProfile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProfile />
    </Suspense>
  );
}
