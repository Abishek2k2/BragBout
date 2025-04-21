import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default async function DashboardPage() {
  const { userId } = auth();
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  // Fetch user profile from Convex
  let userProfile;
  try {
    userProfile = await convex.query(api.users.getUserProfile, { userId });
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <a 
              href="/dashboard/notes" 
              className="p-4 bg-background rounded-lg hover:bg-accent transition-colors"
            >
              <p className="text-sm text-muted-foreground">View Notes</p>
              <p className="text-lg font-semibold">Study Materials</p>
            </a>
            <a 
              href="/dashboard/connections" 
              className="p-4 bg-background rounded-lg hover:bg-accent transition-colors"
            >
              <p className="text-sm text-muted-foreground">Connections</p>
              <p className="text-lg font-semibold">Network</p>
            </a>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          {userProfile ? (
            <div className="space-y-2">
              <p><strong>Name:</strong> {userProfile.name}</p>
              <p><strong>Email:</strong> {userProfile.email}</p>
              <p><strong>Role:</strong> {userProfile.role}</p>
              <p><strong>Subjects:</strong> {userProfile.subjects?.join(", ") || "None"}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p>No user profile found.</p>
              <a 
                href="/dashboard/profile" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Complete Your Profile
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
