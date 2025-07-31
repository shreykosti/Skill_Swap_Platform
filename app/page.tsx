import { Users, Zap, Globe, Divide } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import UserGrid from "@/components/UserGrid";
import { GridSkeleton } from "@/components/UserGrid";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export default async function BrowsePage() {
  const session = await getServerSession(NEXT_AUTH);
  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Hero Section */}
          {session ? (
            <></>
          ) : (
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
          )}

          {/* Search Bar */}
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
          <div className="">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Available Skill Swappers
            </h2>
            <Suspense fallback={<GridSkeleton />}>
              <UserGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
