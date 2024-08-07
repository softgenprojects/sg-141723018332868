import { useState, useEffect } from 'react'
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
import { generateRandomSFCoordinates } from '@/utils/coordinates'

export function CreatePostDialog({ isOpen, onClose, onCreatePost, latitude, longitude }) {
  const [content, setContent] = useState('')
  const [coords, setCoords] = useState({ latitude, longitude })

  useEffect(() => {
    if (!latitude || !longitude) {
      setCoords(generateRandomSFCoordinates())
    } else {
      setCoords({ latitude, longitude })
    }
  }, [latitude, longitude])

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreatePost({ content, ...coords })
    setContent('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
          <DialogDescription>Share your thoughts about this location in San Francisco.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
            aria-label="Post content"
          />
          <div className="flex space-x-2 mt-4">
            <Input value={coords.latitude} readOnly placeholder="Latitude" aria-label="Latitude" />
            <Input value={coords.longitude} readOnly placeholder="Longitude" aria-label="Longitude" />
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Create Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}