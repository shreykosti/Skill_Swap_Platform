"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Users, Zap, Globe } from "lucide-react";
import { SkillCard } from "@/components/SkillCard";
import { Navigation } from "@/components/Navigation";
import { useSession } from "next-auth/react";

const mockUsers = [
  {
    id: "1",
    userName: "Alice Johnson",
    userAvatar: undefined,
    location: "San Francisco, CA",
    rating: 4.8,
    skillsOffered: [
      { id: "1", name: "React", level: "Expert" as const },
      { id: "2", name: "TypeScript", level: "Advanced" as const },
      { id: "3", name: "Node.js", level: "Intermediate" as const },
    ],
    skillsWanted: [
      { id: "4", name: "Python", level: "Beginner" as const },
      { id: "5", name: "Machine Learning", level: "Beginner" as const },
    ],
    availability: "Weekends",
    isOnline: true,
  },
  {
    id: "2",
    userName: "Bob Smith",
    userAvatar: undefined,
    location: "New York, NY",
    rating: 4.6,
    skillsOffered: [
      { id: "6", name: "Python", level: "Expert" as const },
      { id: "7", name: "Data Science", level: "Advanced" as const },
    ],
    skillsWanted: [
      { id: "8", name: "React", level: "Intermediate" as const },
      { id: "9", name: "UI/UX Design", level: "Beginner" as const },
    ],
    availability: "Evenings",
    isOnline: false,
  },
  {
    id: "3",
    userName: "Carol Davis",
    userAvatar: undefined,
    location: "Austin, TX",
    rating: 4.9,
    skillsOffered: [
      { id: "10", name: "UI/UX Design", level: "Expert" as const },
      { id: "11", name: "Figma", level: "Advanced" as const },
    ],
    skillsWanted: [
      {
        id: "12",
        name: "Frontend Development",
        level: "Intermediate" as const,
      },
    ],
    availability: "Flexible",
    isOnline: true,
  },
];

export default function BrowsePage() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    skillLevel: [] as string[],
    availability: [] as string[],
    location: "",
    minRating: 0,
    onlineOnly: false,
  });

  const filteredUsers = mockUsers.filter((user) => {
    // Search term filter
    if (
      filters.searchTerm &&
      !user.userName.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !user.skillsOffered.some((skill) =>
        skill.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      ) &&
      !user.skillsWanted.some((skill) =>
        skill.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      ) &&
      !(
        user.location &&
        user.location.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
    ) {
      return false;
    }

    // Location filter
    if (
      filters.location &&
      (!user.location ||
        !user.location.toLowerCase().includes(filters.location.toLowerCase()))
    ) {
      return false;
    }

    // Rating filter
    if (filters.minRating > 0 && user.rating < filters.minRating) {
      return false;
    }

    // Online status filter
    if (filters.onlineOnly && !user.isOnline) {
      return false;
    }

    // Skill level filter
    if (
      filters.skillLevel.length > 0 &&
      !user.skillsOffered.some((skill) =>
        filters.skillLevel.includes(skill.level)
      )
    ) {
      return false;
    }

    // Availability filter
    if (
      filters.availability.length > 0 &&
      !filters.availability.includes(user.availability)
    ) {
      return false;
    }

    return true;
  });
  const { status } = useSession();
  const [auths, setAuths] = useState("unauthenticated");

  useEffect(() => {
    setAuths(status);
  }, [status]);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Hero Section */}
          <div className={auths === "authenticated" ? "hidden" : ""}>
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome to SkillSwap
              </h1>
              <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
                Connect with learners and experts. Share your skills, discover
                new ones, and grow together in our vibrant community.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>2.5K+ Active Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>500+ Skills</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>50+ Countries</span>
                </div>
              </div>
            </div>
          </div>
          {/* Featured Skills */}
          <div className="flex justify-between content-center items-center">
            <div className="">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Popular Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "Python",
                  "UI/UX Design",
                  "Data Science",
                  "Node.js",
                  "Machine Learning",
                  "TypeScript",
                  "Figma",
                ].map((skill) => (
                  <Badge
                    key={skill}
                    className="bg-green-600 hover:bg-green-700 text-white shadow-md cursor-pointer hover:scale-105 transition-all duration-200 rounded-lg"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <button className="text-white border h-min p-4 w-[10%] rounded-[10px]">
              Filter
            </button>
          </div>

          {/* User Cards Grid */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Available Skill Swappers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <SkillCard key={user.id} {...user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// const renderBrowsePage = () => (
//   <div className="space-y-6">
//     {/* Hero Section */}
//     <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-center">
//       <h1 className="text-4xl font-bold text-white mb-4">
//         Welcome to SkillSwap
//       </h1>
//       <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
//         Connect with learners and experts. Share your skills, discover new ones,
//         and grow together in our vibrant community.
//       </p>
//       <div className="flex flex-wrap justify-center gap-6 text-white/90">
//         <div className="flex items-center space-x-2">
//           <Users className="h-5 w-5" />
//           <span>2.5K+ Active Users</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Zap className="h-5 w-5" />
//           <span>500+ Skills</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Globe className="h-5 w-5" />
//           <span>50+ Countries</span>
//         </div>
//       </div>
//     </div>

//     {/* Search and Filters */}
//     <SearchAndFilters
//       filters={filters}
//       onFiltersChange={setFilters}
//       onClearFilters={clearFilters}
//     />

//     {/* Featured Skills */}
//     <div>
//       <h2 className="text-2xl font-semibold text-white mb-4">Popular Skills</h2>
//       <div className="flex flex-wrap gap-3">
//         {[
//           "React",
//           "Python",
//           "UI/UX Design",
//           "Data Science",
//           "Node.js",
//           "Machine Learning",
//           "TypeScript",
//           "Figma",
//         ].map((skill) => (
//           <Badge
//             key={skill}
//             className="bg-green-600 hover:bg-green-700 text-white shadow-md cursor-pointer hover:scale-105 transition-all duration-200 rounded-lg"
//           >
//             {skill}
//           </Badge>
//         ))}
//       </div>
//     </div>

//     {/* User Cards Grid */}
//     <div>
//       <h2 className="text-2xl font-semibold text-white mb-6">
//         Available Skill Swappers
//       </h2>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredUsers.map((user) => (
//           <SkillCard
//             key={user.id}
//             {...user}
//             onRequestSwap={handleRequestSwap}
//             onViewProfile={handleViewProfile}
//           />
//         ))}
//       </div>
//     </div>
//   </div>
// );
