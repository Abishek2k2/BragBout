import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import Link from "next/link"

interface TrendingNote {
  id: string
  title: string
  subject: string
  views: number
}

const trendingNotes: TrendingNote[] = [
  {
    id: "1",
    title: "Data Structures Final Review",
    subject: "Computer Science",
    views: 245,
  },
  {
    id: "2",
    title: "Organic Chemistry Lab Notes",
    subject: "Chemistry",
    views: 189,
  },
  {
    id: "3",
    title: "Calculus II Formulas",
    subject: "Mathematics",
    views: 156,
  },
]

export function TrendingNotes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {trendingNotes.map((note) => (
          <Link key={note.id} href={`/dashboard/notes/${note.id}`}>
            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors">
              <div className="h-10 w-10 rounded-md bg-emerald-100 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{note.title}</p>
                <p className="text-xs text-muted-foreground">
                  {note.subject} • {note.views} views
                </p>
              </div>
            </div>
          </Link>
        ))}
        <Link href="/dashboard/notes" className="block text-center text-sm text-emerald-600 hover:underline">
          Browse all notes
        </Link>
      </CardContent>
    </Card>
  )
}
