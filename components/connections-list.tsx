"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, UserPlus, X } from "lucide-react"

interface Connection {
  id: string
  name: string
  avatar: string
  college: string
  major: string
  type: "classmate" | "senior"
  status: "connected" | "pending"
}

const connections: Connection[] = [
  {
    id: "1",
    name: "Alex Thompson",
    avatar: "/placeholder-user.jpg",
    college: "University of Example",
    major: "Computer Science",
    type: "classmate",
    status: "connected",
  },
  {
    id: "2",
    name: "Priya Sharma",
    avatar: "/placeholder-user.jpg",
    college: "University of Example",
    major: "Data Science",
    type: "senior",
    status: "connected",
  },
  {
    id: "3",
    name: "David Wilson",
    avatar: "/placeholder-user.jpg",
    college: "University of Example",
    major: "Computer Engineering",
    type: "classmate",
    status: "connected",
  },
  {
    id: "4",
    name: "Sophia Lee",
    avatar: "/placeholder-user.jpg",
    college: "University of Example",
    major: "Artificial Intelligence",
    type: "senior",
    status: "pending",
  },
]

export function ConnectionsList({ type = "all" }: { type?: "all" | "classmates" | "seniors" | "pending" }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredConnections = connections.filter((connection) => {
    const matchesSearch =
      connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.major.toLowerCase().includes(searchTerm.toLowerCase())

    if (type === "all") {
      return matchesSearch
    } else if (type === "classmates") {
      return matchesSearch && connection.type === "classmate" && connection.status === "connected"
    } else if (type === "seniors") {
      return matchesSearch && connection.type === "senior" && connection.status === "connected"
    } else if (type === "pending") {
      return matchesSearch && connection.status === "pending"
    }

    return matchesSearch
  })

  return (
    <div className="space-y-6">
      <Input
        placeholder="Search connections..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-xs"
      />

      {filteredConnections.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredConnections.map((connection) => (
            <Card key={connection.id}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                    <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{connection.name}</h3>
                    <p className="text-sm text-muted-foreground">{connection.major}</p>
                    <p className="text-xs text-muted-foreground">{connection.college}</p>
                    <div className="mt-2">
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                        {connection.type === "senior" ? "Senior" : "Classmate"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {connection.status === "connected" ? (
                      <>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                          <X className="mr-1 h-4 w-4" />
                          Remove
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2 w-full">
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          <UserPlus className="mr-1 h-4 w-4" />
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                          <X className="mr-1 h-4 w-4" />
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <UserPlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No connections found</h3>
          <p className="text-muted-foreground">Try adjusting your search or connect with more people</p>
        </div>
      )}
    </div>
  )
}
