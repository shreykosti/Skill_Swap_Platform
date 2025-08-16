"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Zap } from "lucide-react";
import { SwapRequestCard } from "@/components/SwapRequestCard";

export default function MySwapsPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">My Skill Swaps</h1>
            <div className="flex space-x-2">
              <Badge className="bg-yellow-500 text-black">Pending</Badge>
              <Badge className="bg-green-600 text-white">Active</Badge>
              <Badge className="bg-blue-600 text-white">Completed</Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-slate-800 border-slate-700 text-center p-4 hover:bg-slate-750 hover:shadow-lg transition-all duration-300 rounded-xl">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">num</p>
              <p className="text-sm text-slate-400">Total Swaps</p>
            </Card>
            <Card className="hidden bg-slate-800 border-slate-700 text-center p-4 hover:bg-slate-750 hover:shadow-lg transition-all duration-300 rounded-xl">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">num</p>
              <p className="text-sm text-slate-400">Connections</p>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-center p-4 hover:bg-slate-750 hover:shadow-lg transition-all duration-300 rounded-xl">
              <Zap className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">num</p>
              <p className="text-sm text-slate-400">Rating</p>
            </Card>
          </div>

          {/* Swap Requests */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">All Requests</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <SwapRequestCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
