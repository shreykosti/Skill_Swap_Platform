import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { PrismaClient } from "@/lib/generated/prisma/client";

// Define proper types
interface Skill {
  id: string;
  name: string;
  type: "OFFERED" | "WANTED";
}

interface SwapRequestCardProps {
  swapId: string;
  requesterId: string;
  responderId: string;
  skills: Skill[];
  status: string;
  message: string;
  timestamp: Date;
  incoming: boolean;
}

export async function SwapRequestCard({
  swapId,
  requesterId,
  responderId,
  skills,
  status,
  message,
  timestamp,
  incoming,
}: SwapRequestCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-black";
      case "accepted":
        return "bg-green-600 text-white";
      case "rejected":
        return "bg-red-600 text-white";
      case "completed":
        return "bg-blue-600 text-white";
      default:
        return "bg-slate-600 text-slate-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const prisma = new PrismaClient();

  const req = await prisma.user.findUnique({
    where: {
      id: requesterId,
    },
  });

  const res = await prisma.user.findUnique({
    where: {
      id: responderId,
    },
  });

  console.log(skills);

  return (
    <Card className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl hover:bg-slate-750 transition-all duration-300 rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {/* <Avatar className="h-10 w-10 border-2 border-green-500/30 rounded-full">
              <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
              <AvatarFallback className="bg-green-600/10 text-green-400">
                {otherUser.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar> */}
            <div>
              <h3 className="font-semibold text-white">
                {incoming ? req?.username : res?.username}
              </h3>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={`text-xs ${getStatusColor("pending")}`}>
              {getStatusIcon("pending")}
              <span className="ml-1 capitalize">{status}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Swap Details */}
        <div className="bg-slate-700/30 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="text-xs text-slate-400 mb-1">They want</p>
              {skills
                .filter((skill: Skill) => skill.type === "OFFERED")
                .map((skill: Skill) => (
                  <Badge key={skill.id} className="bg-green-600 text-white">
                    {skill.name}
                  </Badge>
                ))}
            </div>

            <div className="px-4">
              <div className="w-8 h-8 rounded-full border-2 border-green-400 flex items-center justify-center">
                <span className="text-green-400 text-lg">⇄</span>
              </div>
            </div>

            <div className="text-center flex-1">
              <p className="text-xs text-slate-400 mb-1">They offer</p>
              {skills
                .filter((skill: Skill) => skill.type === "WANTED")
                .map((skill: Skill) => (
                  <Badge key={skill.id} className="bg-green-600 text-white">
                    {skill.name}
                  </Badge>
                ))}
            </div>
          </div>
        </div>

        {/* Message */}

        <div className="bg-slate-600/20 rounded-lg p-3">
          <p className="text-sm text-white">&quot;{message}&quot;</p>
        </div>

        {/* Timestamp */}
        <p className="text-xs text-slate-400">timestamp</p>

        {/* Actions */}
        <div className="flex space-x-2 pt-2"></div>
      </CardContent>
    </Card>
  );
}
