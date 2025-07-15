import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RatingDialogProps {
  swapPartner: {
    id: string;
    name: string;
    avatar?: string;
  };
  skillLearned: string;
  onSubmitRating: (rating: number, feedback: string) => void;
  children: React.ReactNode;
}

export function RatingDialog({
  swapPartner,
  skillLearned,
  onSubmitRating,
  children,
}: RatingDialogProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    onSubmitRating(rating, feedback);
    setOpen(false);
    setRating(0);
    setFeedback("");
    toast({
      title: "Rating Submitted!",
      description:
        "Thank you for your feedback. It helps improve our community.",
    });
  };

  const StarButton = ({ index }: { index: number }) => {
    const filled = index <= (hoveredStar || rating);
    return (
      <button
        title="button"
        type="button"
        className={`transition-colors ${
          filled ? "text-yellow-400" : "text-gray-300"
        }`}
        onMouseEnter={() => setHoveredStar(index)}
        onMouseLeave={() => setHoveredStar(0)}
        onClick={() => setRating(index)}
      >
        <Star className={`h-8 w-8 ${filled ? "fill-current" : ""}`} />
      </button>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Rate Your Experience
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Swap Partner Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src={swapPartner.avatar} alt={swapPartner.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {swapPartner.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">
                {swapPartner.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Taught you:{" "}
                <span className="font-medium text-skill-tag">
                  {skillLearned}
                </span>
              </p>
            </div>
          </div>

          {/* Rating Stars */}
          <div>
            <Label className="text-sm font-medium">
              How was your experience?
            </Label>
            <div className="flex space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((index) => (
                <StarButton key={index} index={index} />
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            )}
          </div>

          {/* Feedback */}
          <div>
            <Label htmlFor="feedback">Feedback (Optional)</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share details about your learning experience..."
              rows={4}
              className="mt-1"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button onClick={handleSubmit} className="flex-1">
              Submit Rating
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
