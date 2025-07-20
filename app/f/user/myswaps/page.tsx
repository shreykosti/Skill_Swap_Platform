"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, Users, Zap, Globe } from "lucide-react";
import { SwapRequestCard } from "@/components/SwapRequestCard";
import { useToast } from "@/hooks/use-toast";

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

export default function MySwapsPage() {
  const { toast } = useToast();
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
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <h2 className="text-xl font-semibold text-white">
              Recent Requests
            </h2>
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
      </div>
    </div>
  );
}
