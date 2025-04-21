'use client'

import { useAuth as useClerkAuth } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

export function useAuth() {
  const { isSignedIn, isLoaded: isClerkLoaded, userId } = useClerkAuth();
  const { isAuthenticated: isConvexAuthenticated, isLoading: isConvexLoading } = useConvexAuth();

  return {
    isAuthenticated: isSignedIn && isConvexAuthenticated,
    isLoading: !isClerkLoaded || isConvexLoading,
    userId,
  };
} 