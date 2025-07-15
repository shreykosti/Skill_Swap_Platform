"use client";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { SkillCard } from "@/components/SkillCard";
import { SwapRequestCard } from "@/components/SwapRequestCard";
import { UserProfile } from "@/components/UserProfile";
import { EditProfileDialog } from "@/components/EditProfileDialog";
import { SkillManagementDialog } from "@/components/SkillManagementDialog";
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Zap, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
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

const mockSwapRequests = [
  {
    id: "1",
    fromUser: { id: "2", name: "Bob Smith", avatar: undefined },
    toUser: { id: "current", name: "You", avatar: undefined },
    skillOffered: "Python",
    skillRequested: "React",
    message:
      "Hi! I'd love to help you learn Python in exchange for React lessons. I have 5 years of experience with Python and Django.",
    status: "pending" as const,
    createdAt: "2 hours ago",
    type: "received" as const,
  },
  {
    id: "2",
    fromUser: { id: "current", name: "You", avatar: undefined },
    toUser: { id: "3", name: "Carol Davis", avatar: undefined },
    skillOffered: "React",
    skillRequested: "UI/UX Design",
    message:
      "Hey Carol! I saw your design portfolio and would love to learn from you. I can teach you React in return.",
    status: "accepted" as const,
    createdAt: "1 day ago",
    type: "sent" as const,
  },
  {
    id: "3",
    fromUser: { id: "current", name: "You", avatar: undefined },
    toUser: { id: "1", name: "Alice Johnson", avatar: undefined },
    skillOffered: "TypeScript",
    skillRequested: "Advanced React Patterns",
    message: "Would love to learn more about advanced React patterns from you!",
    status: "completed" as const,
    createdAt: "1 week ago",
    type: "sent" as const,
  },
];

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

const Index = () => {
  const [currentPage, setCurrentPage] = useState("browse");
  const [currentUser, setCurrentUser] = useState(mockCurrentUser);
  const [filters, setFilters] = useState({
    searchTerm: "",
    skillLevel: [] as string[],
    availability: [] as string[],
    location: "",
    minRating: 0,
    onlineOnly: false,
  });
  const { toast } = useToast();

  const handleRequestSwap = (userId: string) => {
    toast({
      title: "Swap Request Sent!",
      description: "Your skill swap request has been sent successfully.",
    });
  };

  const handleViewProfile = (userId: string) => {
    toast({
      title: "Profile View",
      description: `Viewing profile for user ${userId}`,
    });
  };

  const handleAcceptRequest = (requestId: string) => {
    toast({
      title: "Request Accepted!",
      description: "You've accepted the skill swap request.",
    });
  };

  const handleRejectRequest = (requestId: string) => {
    toast({
      title: "Request Declined",
      description: "You've declined the skill swap request.",
    });
  };

  const handleDeleteRequest = (requestId: string) => {
    toast({
      title: "Request Deleted",
      description: "Your swap request has been deleted.",
    });
  };

  const handleRateSwap = (
    requestId: string,
    rating: number,
    feedback: string
  ) => {
    toast({
      title: "Rating Submitted!",
      description: "Thank you for your feedback.",
    });
  };

  const handleEditProfile = (userData: any) => {
    setCurrentUser({ ...currentUser, ...userData });
  };

  const handleSkillsUpdate = (skills: any[], type: "offered" | "wanted") => {
    if (type === "offered") {
      setCurrentUser({ ...currentUser, skillsOffered: skills });
    } else {
      setCurrentUser({ ...currentUser, skillsWanted: skills });
    }
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      skillLevel: [],
      availability: [],
      location: "",
      minRating: 0,
      onlineOnly: false,
    });
  };

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

  const renderBrowsePage = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to SkillSwap
        </h1>
        <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
          Connect with learners and experts. Share your skills, discover new
          ones, and grow together in our vibrant community.
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

      {/* Search and Filters */}
      <SearchAndFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
      />

      {/* Featured Skills */}
      <div>
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

      {/* User Cards Grid */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Available Skill Swappers
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <SkillCard
              key={user.id}
              {...user}
              onRequestSwap={handleRequestSwap}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderSwapsPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">My Skill Swaps</h1>
        <div className="flex space-x-2">
          <Badge className="bg-yellow-500 text-black">3 Pending</Badge>
          <Badge className="bg-green-600 text-white">2 Active</Badge>
          <Badge className="bg-blue-600 text-white">1 Completed</Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700 text-center p-4 hover:bg-slate-750 hover:shadow-lg transition-all duration-300 rounded-xl">
          <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">12</p>
          <p className="text-sm text-slate-400">Total Swaps</p>
        </Card>
        <Card className="bg-slate-800 border-slate-700 text-center p-4 hover:bg-slate-750 hover:shadow-lg transition-all duration-300 rounded-xl">
          <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">8</p>
          <p className="text-sm text-slate-400">Connections</p>
        </Card>
        <Card className="bg-slate-800 border-slate-700 text-center p-4 hover:bg-slate-750 hover:shadow-lg transition-all duration-300 rounded-xl">
          <Zap className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">4.7</p>
          <p className="text-sm text-slate-400">Rating</p>
        </Card>
      </div>

      {/* Swap Requests */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Recent Requests</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {mockSwapRequests.map((request) => (
            <SwapRequestCard
              key={request.id}
              request={request}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
              onMessage={() =>
                toast({ title: "Message", description: "Opening chat..." })
              }
              onDelete={handleDeleteRequest}
              onRate={handleRateSwap}
            />
          ))}
        </div>
      </div>
    </div>
  );

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
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === "browse" && renderBrowsePage()}
        {currentPage === "swaps" && renderSwapsPage()}
        {currentPage === "profile" && renderProfilePage()}
      </main>
    </div>
  );
};

export default Index;
