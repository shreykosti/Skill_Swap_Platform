"use client";
import { RatingDialog } from "@/components/RatingDialog";
import React from "react";
export default function () {
  return (
    <div>
      <RatingDialog {...testRatingDialogProps} />
    </div>
  );
}

const testRatingDialogProps: RatingDialogProps = {
  swapPartner: {
    id: "u001",
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
  },
  skillLearned: "Web Development",
  onSubmitRating: (rating, feedback) => {
    console.log("Rating submitted:", rating);
    console.log("Feedback submitted:", feedback);
  },
  children: <button>Thank you for participating in the skill swap!</button>,
};
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
