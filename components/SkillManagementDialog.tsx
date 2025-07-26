"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import axios from "axios";
import { set } from "date-fns";

export function SkillManagementDialog({
  children,
  skillType,
}: {
  children: React.ReactNode;
  skillType: string;
}) {
  const [open, setOpen] = useState(false);
  const [name, setname] = useState("");
  const [level, setlevel] = useState("");
  const [description, setdescription] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl bg-card border-border max-h-[80vh] overflow-y-auto border-white">
        <div className="space-y-6 text-white p-8">
          <h3 className="text-sm font-medium text-foreground">Add New Skill</h3>
          <div className="space-y-4 border-t pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="skill-name">Skill Name *</Label>
                <Input
                  id="skill-name"
                  placeholder="e.g., React, Python, Design"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="skill-level">Proficiency Level</Label>
                <Select value={level} onValueChange={setlevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent className="text-white">
                    <SelectItem value="BEGINNER">Beginner</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                    <SelectItem value="ADVANCED">Advanced</SelectItem>
                    <SelectItem value="EXPERT">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="skill-description">Description</Label>
              <Textarea
                id="skill-description"
                placeholder="Describe the skill..."
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-around items-center space-x-2 pt-4 border-t ">
            <Button
              onClick={async () => {
                const res = await axios.post("/api/skill/create", {
                  name,
                  type: skillType,
                  level,
                  description,
                });

                if (res.status === 200) {
                  setOpen(false);
                  setname("");
                  setlevel("");
                  setdescription("");
                  alert("Skill added successfully!");
                }
              }}
              className="border rounded-md"
            >
              Save Changes
            </Button>
            <Button
              onClick={() => setOpen(false)}
              className="border rounded-md"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
