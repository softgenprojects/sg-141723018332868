import { useState, useCallback } from 'react';
import Head from 'next/head';
import { useToast } from "@/components/ui/use-toast";
import MapBox from '@/components/MapBox';
import Header from '@/components/Header';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { CreatePostDialog } from '@/components/CreatePostDialog';
import { usePosts } from '@/hooks/usePosts';
import { logError } from '@/utils/errorLogging';

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ latitude: '', longitude: '' });
  const { toast } = useToast();
  const { posts, mutate, error, isLoading } = usePosts();

  const handleMapClick = useCallback((lat, lng) => {
    setSelectedLocation({ latitude: lat.toFixed(6), longitude: lng.toFixed(6) });
    setIsDialogOpen(true);
  }, []);

  const handleCreatePost = async (postData) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...postData, userId: 1 }),
      });
      if (!response.ok) throw new Error('Failed to create post');
      toast({ title: "Success", description: "Post created successfully!" });
      mutate();
    } catch (error) {
      logError('Error creating post:', error);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (error) return <div>Failed to load posts</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>3D Mapbox World - San Francisco</title>
        <meta name="description" content="Explore San Francisco with our 3D Mapbox World application. Create and view location-based posts." />
        <meta name="keywords" content="San Francisco, Mapbox, 3D Map, Location Posts" />
      </Head>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-grow relative">
          <MapBox posts={posts} onMapClick={handleMapClick} />
          <FloatingActionButton onClick={() => setIsDialogOpen(true)} />
          <CreatePostDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onCreatePost={handleCreatePost}
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
          />
        </main>
      </div>
    </>
  );
}