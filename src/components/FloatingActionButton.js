import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function FloatingActionButton({ onClick }) {
  return (
    <Button
      className="fixed right-4 bottom-4 rounded-full w-16 h-16 shadow-lg"
      onClick={onClick}
      aria-label="Create new post"
    >
      <Plus className="w-6 h-6" />
    </Button>
  )
}