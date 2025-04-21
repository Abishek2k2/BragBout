'use client'

import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export function Nav() {
  const { isSignedIn, isLoaded } = useAuth();
  
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <GraduationCap className="h-6 w-6 text-emerald-600" />
          <span className="hidden sm:inline-block">BragBout</span>
        </Link>
        
        <div className="ml-auto flex items-center space-x-4">
          {!isLoaded ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          ) : isSignedIn ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                }}
              />
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">
                  Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 