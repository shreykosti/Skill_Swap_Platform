"use client";
import { UserProfile } from "@/pages/UserProfile";
import { useState } from "react";

export default function () {
  const [currentUser, setCurrentUser] = useState(mockCurrentUser);
  const renderProfilePage = () => (
    <UserProfile
      user={currentUser}
      isOwnProfile={true}
      onEditProfile={() => {}}
      onAddSkill={() => {}}
      onRemoveSkill={() => {}}
    />
  );
  return (
    <div className="min-h-screen bg-slate-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderProfilePage()}
      </main>
    </div>
  );
}

const mockCurrentUser = {
  id: "current",
  name: "John Doe",
  avatar: undefined,
  location: "Los Angeles, CA",
  rating: 4.7,
  totalSwaps: 12,
  joinedDate: "March 2024",
  bio: "Full-stack developer passionate about learning new technologies and sharing knowledge. Always excited to connect with fellow developers and exchange skills!",
  availability: "Weekends & Evenings",
  skillsOffered: [
    {
      id: "1",
      name: "React",
      level: "Advanced" as const,
      description: "5+ years experience building SPAs",
    },
    {
      id: "2",
      name: "TypeScript",
      level: "Intermediate" as const,
      description: "Strong typing for better code quality",
    },
    {
      id: "3",
      name: "Node.js",
      level: "Intermediate" as const,
      description: "Backend development with Express",
    },
  ],
  skillsWanted: [
    {
      id: "4",
      name: "Python",
      level: "Beginner" as const,
      description: "Want to learn for data science projects",
    },
    {
      id: "5",
      name: "DevOps",
      level: "Beginner" as const,
      description: "Docker, Kubernetes, CI/CD",
    },
    {
      id: "6",
      name: "UI/UX Design",
      level: "Beginner" as const,
      description: "Improve my design skills",
    },
  ],
};

