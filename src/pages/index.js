import { useState, useCallback, Suspense, lazy } from 'react';
import Head from 'next/head';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { CreatePostDialog } from '@/components/CreatePostDialog';
import { usePosts } from '@/hooks/usePosts';
import { logError } from '@/utils/errorLogging';
import ErrorBoundary from '@/components/ErrorBoundary';
import { generateRandomSFCoordinates } from '@/utils/coordinates';

const LazyMapBox = lazy(() => import('@/components/MapBox'));

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(generateRandomSFCoordinates());
  const { toast } = useToast();
  const { posts, createPost, error, isLoading } = usePosts();

  const handleMapClick = useCallback((lat, lng) => {
    console.log('Map clicked', lat, lng);
    setSelectedLocation({ latitude: lat.toFixed(6), longitude: lng.toFixed(6) });
    setIsDialogOpen(true);
  }, []);

  const handleCreatePost = async (postData) => {
    try {
      await createPost({ ...postData, userId: 1 });
      toast({ title: "Success", description: "Post created successfully!" });
      setIsDialogOpen(false);
    } catch (error) {
      logError('Error creating post:', error);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (error) return <div>Failed to load posts</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log('Rendering Home component', posts);

  return (
    <ErrorBoundary>
      <Head>
        <title>3D Mapbox World - San Francisco</title>
        <meta name="description" content="Explore San Francisco with our 3D Mapbox World application. Create and view location-based posts." />
        <meta name="keywords" content="San Francisco, Mapbox, 3D Map, Location Posts" />
      </Head>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-grow relative">
          <Suspense fallback={<div>Loading map...</div>}>
            <LazyMapBox posts={posts} onMapClick={handleMapClick} />
          </Suspense>
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
    </ErrorBoundary>
  );
}