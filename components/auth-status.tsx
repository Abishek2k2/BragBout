'use client'

import { useAuth } from "@/lib/auth";

export function AuthStatus() {
  const { isAuthenticated, isLoading, userId } = useAuth();

  if (isLoading) {
    return <div>Loading authentication status...</div>;
  }

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-semibold">Authentication Status</h2>
      <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
      {userId && <p>User ID: {userId}</p>}
    </div>
  );
} 