import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Trash2,
  Star,
} from "lucide-react";
import { RatingDialog } from "./RatingDialog";
export function AcceptButton() {
  return (
    <Button
      className="flex-1 bg-green-600 hover:bg-green-700 text-white transition-colors duration-200 rounded-lg"
      size="sm"
    >
      <CheckCircle className="h-4 w-4 mr-2" />
      Accept
    </Button>
  );
}

export function DeclineButton() {
  <Button
    variant="outline"
    size="sm"
    className="flex-1 border-slate-600 hover:bg-red-600/20 hover:border-red-500 text-red-400 hover:text-red-300 transition-all duration-200 rounded-lg"
  >
    <XCircle className="h-4 w-4 mr-2" />
    Decline
  </Button>;
}

export function DeleteButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex-1 border-slate-600 hover:bg-red-600/20 hover:border-red-500 text-red-400 hover:text-red-300 transition-all duration-200 rounded-lg"
    >
      <Trash2 className="h-4 w-4 mr-2" />
      Delete Request
    </Button>
  );
}

export function MessageButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex-1 border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-200 rounded-lg"
    >
      <MessageSquare className="h-4 w-4 mr-2" />
      Message
    </Button>
  );
}

export function Rating() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-200 rounded-lg"
    >
      <Star className="h-4 w-4 mr-2" />
      Rate
    </Button>
  );
}

{
  /* <RatingDialog
//   swapPartner={otherUser}
//   skillLearned={
//     request.type === "sent" ? request.skillRequested : request.skillOffered
//   }
//   onSubmitRating={(rating, feedback) =>
//     onRate(request.id, rating, feedback)
//   }
></RatingDialog>; */
}
