import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MapBox from '@/components/MapBox';

export default function Home() {
  const [content, setContent] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement post creation
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">
          3D Mapbox World - San Francisco
        </h1>

        <div className="w-full max-w-4xl">
          <MapBox />
        </div>

        <Card className="w-full max-w-md mt-8">
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