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
import { Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EditProfile() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  console.log(session);
  const user: any = session?.user;

  const [error, setError] = useState("update101");
  const [username, setUsername] = useState(
    user?.username || "update your username here"
  );
  const [location, setLocation] = useState(
    user?.location || "update your location here"
  );
  const [bio, setBio] = useState(user?.bio || "update your bio here");
  const [avaTime, setAvaTime] = useState(
    user?.avaTime || "update your avaTime here"
  );
  const [ispublic, setisPublic] = useState(user?.public || true);

  useEffect(() => {
    if (session) {
      const user: any = session.user;
      setUsername(user?.username || "");
      setLocation(user?.location || "");
      setBio(user?.bio || "");
      setAvaTime(user?.avaTime || "");
      setisPublic(user?.public || true);
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {error}
      <div className="container mx-auto px-8 py-8 max-w-2xl ">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="flex-col py-2">
                <Label
                  htmlFor="name"
                  className="text-foreground font-medium py-2"
                >
                  Name : {username}
                </Label>
                <div className="flex items-center justify-between gap-2">
                  <Input
                    id="name"
                    placeholder={"update your name here"}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground w-full"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Button
                    onClick={async () => {
                      const res = await axios.post(
                        "/api/user/editprofile/name",
                        {
                          username,
                        }
                      );

                      if (res.status === 200) {
                        await update({ username });
                      }

                      setError(res.data.message);
                    }}
                    className="flex hover:bg-primary/90 text-primary-foreground border p-2"
                  >
                    <Save className="h-4 w-4 mr-2 " />
                    Save
                  </Button>
                </div>
              </div>

              <div className="space-y-2 flex-col">
                <Label
                  htmlFor="location"
                  className="text-foreground font-medium"
                >
                  Location : {location}
                </Label>
                <div className="flex items-center justify-between gap-2">
                  <Input
                    id="location"
                    placeholder={"update your location here"}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <Button
                    onClick={async () => {
                      const res = await axios.post(
                        "/api/user/editprofile/location",
                        {
                          location,
                        }
                      );

                      if (res.status === 200) {
                        await update({ location });
                      }

                      setError(res.data.message);
                    }}
                    className="flex hover:bg-primary/90 text-primary-foreground border p-2"
                  >
                    <Save className="h-4 w-4 mr-2 " />
                    Save
                  </Button>
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
                  />
                  <Button
                    onClick={async () => {
                      const res = await axios.post(
                        "/api/user/editprofile/bio",
                        {
                          bio,
                        }
                      );
                      console.log(res);

                      if (res.status === 200) {
                        await update({ bio });
                      }

                      setError(res.data.message);
                    }}
                    className="flex hover:bg-primary/90 text-primary-foreground border p-2"
                  >
                    <Save className=" " />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-white">
                <Label
                  htmlFor="availability"
                  className="text-foreground font-medium"
                >
                  Availability : {avaTime}
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
                  <Button
                    onClick={async () => {
                      const res = await axios.post(
                        "/api/user/editprofile/availability",
                        {
                          avaTime,
                        }
                      );
                      console.log(res);

                      if (res.status === 200) {
                        await update({ avaTime });
                      }

                      setError(res.data.message);
                    }}
                    className="flex hover:bg-primary/90 text-primary-foreground border p-2"
                  >
                    <Save className="h-4 w-4 mr-2 " />
                    Save
                  </Button>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="space-y-2 text-white">
                <Label
                  htmlFor="availability"
                  className="text-foreground font-medium"
                >
                  profile visibility : {ispublic ? "Public" : "Private"}
                </Label>
                <div className="flex items-center justify-between gap-2">
                  <Select
                    value={ispublic ? "true" : "false"}
                    onValueChange={(value) => setisPublic(value === "true")}
                  >
                    <SelectTrigger className="border-border text-foreground ">
                      <SelectValue placeholder={"Select profile visibility"} />
                    </SelectTrigger>
                    <SelectContent className="text-white bg-black border-border">
                      <SelectItem value="true">Public</SelectItem>
                      <SelectItem value="false">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={async () => {
                      const res = await axios.post(
                        "/api/user/editprofile/profileStatus",
                        {
                          ispublic,
                        }
                      );
                      console.log(res);

                      if (res.status === 200) {
                        await update({ ispublic });
                      }

                      setError(res.data.message);
                    }}
                    className="flex hover:bg-primary/90 text-primary-foreground border p-2"
                  >
                    <Save className="h-4 w-4 mr-2 " />
                    Save
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 border-border text-muted-foreground hover:text-foreground"
                onClick={() => {
                  router.push("/f/user/profile");
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
