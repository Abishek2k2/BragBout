"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BookOpen, Download, Eye, Heart, Share2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Note {
  id: string
  title: string
  subject: string
  author: {
    name: string
    avatar: string
  }
  date: string
  likes: number
  views: number
  preview: string
}

const notes: Note[] = [
  {
    id: "1",
    title: "Data Structures and Algorithms - Complete Guide",
    subject: "Computer Science",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder-user.jpg",
    },
    date: "2 days ago",
    likes: 45,
    views: 245,
    preview: "A comprehensive guide covering all major data structures and algorithms...",
  },
  {
    id: "2",
    title: "Organic Chemistry Lab Notes - Experiment 5",
    subject: "Chemistry",
    author: {
      name: "Emily Rodriguez",
      avatar: "/placeholder-user.jpg",
    },
    date: "1 week ago",
    likes: 32,
    views: 189,
    preview: "Detailed notes from the titration experiment including observations and results...",
  },
  {
    id: "3",
    title: "Calculus II - Integration Techniques",
    subject: "Mathematics",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
    },
    date: "2 weeks ago",
    likes: 28,
    views: 156,
    preview: "Complete guide to integration techniques including substitution, parts, and partial fractions...",
  },
]

export function NotesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = subjectFilter === "all" || note.subject === subjectFilter

    return matchesSearch && matchesSubject
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:max-w-xs"
        />
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="md:max-w-xs">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Chemistry">Chemistry</SelectItem>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="Physics">Physics</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredNotes.length > 0 ? (
        <div className="grid gap-4">
          {filteredNotes.map((note) => (
            <Card key={note.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{note.title}</h3>
                    <p className="text-sm text-muted-foreground">{note.subject}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    {note.views}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={note.author.avatar || "/placeholder.svg"} alt={note.author.name} />
                    <AvatarFallback>{note.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{note.author.name}</p>
                    <p className="text-xs text-muted-foreground">{note.date}</p>
                  </div>
                </div>
                <p className="text-sm">{note.preview}</p>
                <div className="mt-4 p-4 border rounded-md bg-slate-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Notes Preview</span>
                    <Button variant="outline" size="sm">
                      View Full Notes
                    </Button>
                  </div>
                  <div className="h-32 bg-white border rounded-md flex items-center justify-center text-muted-foreground">
                    Notes preview content
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm">
                    <Heart className="mr-1 h-4 w-4" />
                    {note.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="mr-1 h-4 w-4" />
                    Share
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No notes found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
