"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Heart, MessageSquare, Share2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Feed() {
  const [postContent, setPostContent] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const handlePost = () => {
    if (!postContent.trim()) return

    setIsPosting(true)
    // This would be replaced with actual post creation logic
    setTimeout(() => {
      setIsPosting(false)
      setPostContent("")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="@user" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">What's on your mind?</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Share your thoughts or class notes..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            <BookOpen className="mr-2 h-4 w-4" />
            Add Notes
          </Button>
          <Button
            onClick={handlePost}
            disabled={!postContent.trim() || isPosting}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isPosting ? "Posting..." : "Post"}
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="notes">Class Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          <FeedPost
            name="Sarah Johnson"
            avatar="/placeholder-user.jpg"
            time="2 hours ago"
            content="Just finished my research paper on quantum computing! Anyone interested in reviewing it before I submit?"
            likes={12}
            comments={5}
            isNotes={false}
          />
          <FeedPost
            name="Michael Chen"
            avatar="/placeholder-user.jpg"
            time="Yesterday"
            content="Here are my notes from today's Advanced Algorithms lecture. Hope they help!"
            likes={24}
            comments={8}
            isNotes={true}
            notesTitle="Advanced Algorithms - Lecture 7"
          />
          <FeedPost
            name="Emily Rodriguez"
            avatar="/placeholder-user.jpg"
            time="2 days ago"
            content="Looking for study partners for the upcoming Calculus exam. Anyone interested?"
            likes={18}
            comments={15}
            isNotes={false}
          />
        </TabsContent>
        <TabsContent value="connections" className="space-y-4 mt-4">
          <FeedPost
            name="Sarah Johnson"
            avatar="/placeholder-user.jpg"
            time="2 hours ago"
            content="Just finished my research paper on quantum computing! Anyone interested in reviewing it before I submit?"
            likes={12}
            comments={5}
            isNotes={false}
          />
        </TabsContent>
        <TabsContent value="notes" className="space-y-4 mt-4">
          <FeedPost
            name="Michael Chen"
            avatar="/placeholder-user.jpg"
            time="Yesterday"
            content="Here are my notes from today's Advanced Algorithms lecture. Hope they help!"
            likes={24}
            comments={8}
            isNotes={true}
            notesTitle="Advanced Algorithms - Lecture 7"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface FeedPostProps {
  name: string
  avatar: string
  time: string
  content: string
  likes: number
  comments: number
  isNotes: boolean
  notesTitle?: string
}

function FeedPost({ name, avatar, time, content, likes, comments, isNotes, notesTitle }: FeedPostProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{time}</p>
            </div>
          </div>
          {isNotes && (
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">Class Notes</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isNotes && notesTitle && <h3 className="text-lg font-semibold mb-2">{notesTitle}</h3>}
        <p>{content}</p>
        {isNotes && (
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
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" onClick={handleLike} className={liked ? "text-red-500" : ""}>
            <Heart className={`mr-1 h-4 w-4 ${liked ? "fill-current" : ""}`} />
            {likeCount}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="mr-1 h-4 w-4" />
            {comments}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
