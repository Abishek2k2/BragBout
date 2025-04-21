"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

interface SuggestedUser {
  id: string
  name: string
  avatar: string
  college: string
  major: string
  type: "classmate" | "senior"
}

const suggestedUsers: SuggestedUser[] = [
  {
    id: "1",
    name: "Alex Thompson",
    avatar: "/placeholder-user.jpg",
    college: "University of Example",
    major: "Computer Science",
    type: "classmate",
  },
  {
    id: "2",
    name: "Priya Sharma",
    avatar: "/placeholder-user.jpg",
    college: "University of Example",
    major: "Data Science",
    type: "senior",
  },
  {
    id: "3",
    name: "David Wilson",
    avatar: "/placeholder-user.jpg",
    college: "University of Example",
    major: "Computer Engineering",
    type: "classmate",
  },
]

export function SuggestedConnections() {
  const [users, setUsers] = useState<SuggestedUser[]>(suggestedUsers)

  const handleConnect = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggested Connections</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.major} • {user.type === "senior" ? "Senior" : "Classmate"}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
                onClick={() => handleConnect(user.id)}
              >
                Connect
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">No more suggestions right now</div>
        )}
        {users.length > 0 && (
          <Button variant="link" className="w-full text-emerald-600">
            View More
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
