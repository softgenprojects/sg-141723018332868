import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function CreatePostDialog({ isOpen, onClose, onCreatePost, latitude, longitude }) {
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreatePost({ content, latitude, longitude })
    setContent('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
          <DialogDescription>Share your thoughts about this location.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex space-x-2 mt-4">
            <Input value={latitude} readOnly placeholder="Latitude" />
            <Input value={longitude} readOnly placeholder="Longitude" />
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Create Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}