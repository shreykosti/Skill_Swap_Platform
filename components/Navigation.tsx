"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Navigation() {
  const router = useRouter();
  const { status } = useSession();
  const [authStatus, setAuthStatus] = useState(status);
  useEffect(() => {
    setAuthStatus(status);
  }, [status]);
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
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Button
              onClick={() => {
                router.push("/");
              }}
              className="text-white hover:text-green-400 hover:bg-slate-700 transition-colors rounded-[5px] size-sm"
            >
              Browse Skills
            </Button>
            <Button
              onClick={() => {
                router.push("/f/user/myswaps");
              }}
              size="sm"
              className="text-white hover:text-green-400 hover:bg-slate-700 transition-colors rounded-[5px]"
            >
              My Swaps
              <Badge className="ml-2 bg-yellow-500 text-black text-xs">3</Badge>
            </Button>
            <Button
              onClick={() => {
                router.push("/f/user/profile");
              }}
              size="sm"
              className="text-white hover:text-green-400 hover:bg-slate-700 transition-colors rounded-[5px]"
            >
              Profile
            </Button>

            {/* Auth Buttons */}
            <div
              className={
                authStatus == "authenticated" ? "hidden" : "flex space-x-2"
              }
            >
              <Button
                size="sm"
                className="text-white hover:text-green-400 hover:bg-slate-700 transition-colors rounded-[5px]"
                onClick={() => {
                  signIn();
                }}
              >
                signIn
                {/* <Link href="/f/auth/signin">Sign In</Link> */}
              </Button>
              <Button
                onClick={() => {
                  router.push("/f/auth/signup");
                }}
                size="sm"
                className="text-white hover:text-green-400 hover:bg-slate-700 transition-colors rounded-[5px] bg-green-600"
              >
                Sign Up
              </Button>
            </div>
            <div
              className={
                authStatus === "authenticated" ? "flex space-x-2" : "hidden"
              }
            >
              <Button
                size="sm"
                className="text-white hover:text-green-400 hover:bg-slate-700 transition-colors rounded-[5px] bg-green-600"
                onClick={() => {
                  signOut();
                  setAuthStatus("unauthenticated");
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
