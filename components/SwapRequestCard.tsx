import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, CheckCircle, XCircle, MessageSquare, Trash2, Star } from "lucide-react";
import { RatingDialog } from "./RatingDialog";

interface SwapRequest {
  id: string;
  fromUser: {
    id: string;
    name: string;
    avatar?: string;
  };
  toUser: {
    id: string;
    name: string;
    avatar?: string;
  };
  skillOffered: string;
  skillRequested: string;
  message: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  createdAt: string;
  type: "sent" | "received";
}

interface SwapRequestCardProps {
  request: SwapRequest;
  onAccept?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
  onMessage?: (requestId: string) => void;
  onDelete?: (requestId: string) => void;
  onRate?: (requestId: string, rating: number, feedback: string) => void;
}

export function SwapRequestCard({ request, onAccept, onReject, onMessage, onDelete, onRate }: SwapRequestCardProps) {
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

  const otherUser = request.type === "sent" ? request.toUser : request.fromUser;
  
  return (
    <Card className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl hover:bg-slate-750 transition-all duration-300 rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-green-500/30 rounded-full">
              <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
              <AvatarFallback className="bg-green-600/10 text-green-400">
                {otherUser.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-white">{otherUser.name}</h3>
              <p className="text-sm text-slate-400">
                {request.type === "sent" ? "Swap request sent" : "Swap request received"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={`text-xs ${getStatusColor(request.status)}`}>
              {getStatusIcon(request.status)}
              <span className="ml-1 capitalize">{request.status}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Swap Details */}
        <div className="bg-slate-700/30 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="text-xs text-slate-400 mb-1">
                {request.type === "sent" ? "You offer" : "They offer"}
              </p>
              <Badge className="bg-green-600 text-white">
                {request.type === "sent" ? request.skillOffered : request.skillRequested}
              </Badge>
            </div>
            
            <div className="px-4">
              <div className="w-8 h-8 rounded-full border-2 border-green-400 flex items-center justify-center">
                <span className="text-green-400 text-lg">⇄</span>
              </div>
            </div>
            
            <div className="text-center flex-1">
              <p className="text-xs text-slate-400 mb-1">
                {request.type === "sent" ? "You want" : "They want"}
              </p>
              <Badge className="bg-green-600 text-white">
                {request.type === "sent" ? request.skillRequested : request.skillOffered}
              </Badge>
            </div>
          </div>
        </div>

        {/* Message */}
        {request.message && (
          <div className="bg-slate-600/20 rounded-lg p-3">
            <p className="text-sm text-white">&quot;{request.message}&quot;</p>
          </div>
        )}

        {/* Timestamp */}
        <p className="text-xs text-slate-400">{request.createdAt}</p>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          {request.type === "received" && request.status === "pending" && (
            <>
              <Button
                onClick={() => onAccept?.(request.id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white transition-colors duration-200 rounded-lg"
                size="sm"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Accept
              </Button>
              <Button
                onClick={() => onReject?.(request.id)}
                variant="outline"
                size="sm"
                className="flex-1 border-slate-600 hover:bg-red-600/20 hover:border-red-500 text-red-400 hover:text-red-300 transition-all duration-200 rounded-lg"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Decline
              </Button>
            </>
          )}
          
          {request.type === "sent" && request.status === "pending" && onDelete && (
            <Button
              onClick={() => onDelete(request.id)}
              variant="outline"
              size="sm"
              className="flex-1 border-slate-600 hover:bg-red-600/20 hover:border-red-500 text-red-400 hover:text-red-300 transition-all duration-200 rounded-lg"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Request
            </Button>
          )}
          
          {(request.status === "accepted" || request.status === "completed") && (
            <Button
              onClick={() => onMessage?.(request.id)}
              variant="outline"
              size="sm"
              className="flex-1 border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-200 rounded-lg"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          )}

          {request.status === "completed" && onRate && (
            <RatingDialog
              swapPartner={otherUser}
              skillLearned={request.type === "sent" ? request.skillRequested : request.skillOffered}
              onSubmitRating={(rating, feedback) => onRate(request.id, rating, feedback)}
            >
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-200 rounded-lg"
              >
                <Star className="h-4 w-4 mr-2" />
                Rate
              </Button>
            </RatingDialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
}