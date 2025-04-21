import { NotesList } from "@/components/notes-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function NotesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Class Notes</h1>
        <Link href="/dashboard/notes/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Notes
          </Button>
        </Link>
      </div>
      <NotesList />
    </div>
  )
}
