import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              SkillSwap
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search skills..."
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Button
              variant={currentPage === "browse" ? "default" : "ghost"}
              onClick={() => onPageChange("browse")}
              className="text-sm"
            >
              Browse Skills
            </Button>
            <Button
              variant={currentPage === "swaps" ? "default" : "ghost"}
              onClick={() => onPageChange("swaps")}
              className="text-sm relative"
            >
              My Swaps
              <Badge className="ml-2 bg-yellow-500 text-black text-xs">3</Badge>
            </Button>
            <Button
              variant={currentPage === "profile" ? "default" : "ghost"}
              onClick={() => onPageChange("profile")}
              className="text-sm"
            >
              Profile
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-300" />
              <Badge className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                2
              </Badge>
            </Button>

            {/* Auth Buttons */}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
              asChild
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
