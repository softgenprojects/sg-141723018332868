import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import MapBox from '@/components/MapBox';
import Header from '@/components/Header';
import { usePosts } from '@/hooks/usePosts';

export default function Home() {
  const [content, setContent] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const { toast } = useToast();
  const { posts, mutate } = usePosts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, latitude: parseFloat(latitude), longitude: parseFloat(longitude), userId: 1 }),
      });
      if (!response.ok) throw new Error('Failed to create post');
      toast({ title: "Success", description: "Post created successfully!" });
      setContent('');
      setLatitude('');
      setLongitude('');
      mutate();
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-2/3">
          <MapBox posts={posts} setLatitude={setLatitude} setLongitude={setLongitude} />
        </div>
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full"
              />
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  step="any"
                />
                <Input
                  type="number"
                  placeholder="Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  step="any"
                />
              </div>
              <Button type="submit" className="w-full">
                Create Post
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}