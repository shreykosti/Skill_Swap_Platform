"use client";
import React, { useState, useEffect } from "react";
import { Users, Zap, Globe } from "lucide-react";
import { SkillCard } from "@/components/SkillCard";
import { Navigation } from "@/components/Navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function BrowsePage() {
  const { status } = useSession();
  const [auths, setAuths] = useState("unauthenticated");
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    const res = await axios.get("/api/skill");
    setAuths(status);
    setSkills(res.data);
  };

  useEffect(() => {
    setAuths(status);
    fetchSkills();
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
          {/* <div className="flex justify-between content-center items-center">
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
          </div> */}

          {/* User Cards Grid */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Available Skill Swappers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((user: any) => {
                const skillsOffered = user.skills
                  .filter((s: any) => s.type === "OFFERED")
                  .map((s: any) => ({
                    id: s.skill.id,
                    name: s.skill.name,
                    level: s.level,
                  }));

                const skillsWanted = user.skills
                  .filter((s: any) => s.type === "WANTED")
                  .map((s: any) => ({
                    id: s.skill.id,
                    name: s.skill.name,
                    level: s.level,
                  }));
                return (
                  <SkillCard
                    key={user.id}
                    id={user.id}
                    rating={user.averageRating}
                    userName={user.username}
                    location={user.location}
                    availability={user.avaTime}
                    isOnline={true}
                    skillsWanted={skillsWanted}
                    skillsOffered={skillsOffered}
                    bio={user.bio}
                  />
                );
              })}
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
