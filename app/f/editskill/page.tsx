"use client";
import { SkillManagementDialog } from "@/components/SkillManagementDialog";
export default function () {
  return (
    <div>
      <SkillManagementDialog {...testSkillManagementDialogProps} />
    </div>
  );
}

import React from "react";

const testSkillManagementDialogProps: SkillManagementDialogProps = {
  type: "offered",
  skills: [
    {
      id: "s1",
      name: "JavaScript",
      level: "Advanced",
      description: "Frontend scripting and backend with Node.js",
    },
    {
      id: "s2",
      name: "UI/UX Design",
      level: "Intermediate",
    },
  ],
  onSave: (updatedSkills) => {
    console.log("Saved skills:", updatedSkills);
  },
  children: <p>Edit your offered skills here.</p>,
};
interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  description?: string;
}

interface SkillManagementDialogProps {
  type: "offered" | "wanted";
  skills: Skill[];
  onSave: (skills: Skill[]) => void;
  children: React.ReactNode;
}
