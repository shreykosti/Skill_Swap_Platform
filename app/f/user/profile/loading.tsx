// app/f/user/profile/loading.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card";

// A helper component for a single pulsing line
const SkeletonLine = ({ className }: { className: string }) => (
  <div className={`bg-slate-700 rounded-md animate-pulse ${className}`} />
);

export default function Loading() {
  return (
    <div className="space-y-6 p-4 md:p-6 ">
      {/* Profile Card Skeleton */}
      <Card className="bg-slate-800 border-slate-700 shadow-lg rounded-xl">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <SkeletonLine className="h-8 w-48" />
              <SkeletonLine className="h-9 w-32" />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <SkeletonLine className="h-5 w-24" />
              <SkeletonLine className="h-5 w-20" />
              <SkeletonLine className="h-5 w-28" />
            </div>
            <div className="space-y-2 pt-2">
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-5/6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Skills Card Skeleton */}
        <Card className="bg-slate-800 border-slate-700 shadow-lg rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <SkeletonLine className="h-6 w-36" />
              <SkeletonLine className="h-9 w-28" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <SkeletonLine className="h-16 w-full" />
            <SkeletonLine className="h-16 w-full" />
          </CardContent>
        </Card>

        {/* Skills Card Skeleton */}
        <Card className="bg-slate-800 border-slate-700 shadow-lg rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <SkeletonLine className="h-6 w-36" />
              <SkeletonLine className="h-9 w-28" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <SkeletonLine className="h-16 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
