import { useState, useCallback, Suspense, lazy, useTransition } from 'react';
import Head from 'next/head';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { CreatePostDialog } from '@/components/CreatePostDialog';
import { usePosts } from '@/hooks/usePosts';
import { logError } from '@/utils/errorLogging';
import ErrorBoundary from '@/components/ErrorBoundary';
import NetworkErrorBoundary from '@/components/NetworkErrorBoundary';
import { generateRandomSFCoordinates } from '@/utils/coordinates';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Spinner } from "@/components/ui/spinner";

const LazyMapBox = lazy(() => import('@/components/MapBox'));

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(generateRandomSFCoordinates());
  const { toast } = useToast();
  const { posts, createPost, error, isLoading, nextPage, prevPage, page, totalPages } = usePosts();
  const [isPending, startTransition] = useTransition();

  const handleMapClick = useCallback((lat, lng) => {
    console.log('Map clicked', lat, lng);
    startTransition(() => {
      setSelectedLocation({ latitude: lat.toFixed(6), longitude: lng.toFixed(6) });
      setIsDialogOpen(true);
    });
  }, []);

  const handleCreatePost = async (postData) => {
    try {
      await createPost({ ...postData, userId: 1 });
      toast({ title: "Success", description: "Post created successfully!" });
      startTransition(() => {
        setIsDialogOpen(false);
      });
    } catch (error) {
      logError('Error creating post:', error);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleNextPage = () => {
    startTransition(() => {
      nextPage();
    });
  };

  const handlePrevPage = () => {
    startTransition(() => {
      prevPage();
    });
  };

  if (error) {
    logError('Error fetching posts:', error);
    return <div>Failed to load posts. Please try again later.</div>;
  }

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
          <NetworkErrorBoundary>
            <ErrorBoundary fallback={<div>Error loading map. Please refresh the page.</div>}>
              <Suspense fallback={<div className="flex items-center justify-center h-full"><Spinner /></div>}>
                <LazyMapBox posts={posts} onMapClick={handleMapClick} />
              </Suspense>
            </ErrorBoundary>
          </NetworkErrorBoundary>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <FloatingActionButton onClick={() => startTransition(() => setIsDialogOpen(true))} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <CreatePostDialog
            isOpen={isDialogOpen}
            onClose={() => startTransition(() => setIsDialogOpen(false))}
            onCreatePost={handleCreatePost}
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
          />
          <nav className="absolute bottom-4 left-4 bg-white p-2 rounded shadow" aria-label="Pagination">
            <button 
              onClick={handlePrevPage}
              disabled={page === 1 || isLoading || isPending}
              aria-label="Previous page"
              className="btn btn-secondary mr-2"
            >
              Previous
            </button>
            <span className="mx-2" aria-current="page">
              {isLoading || isPending ? <Spinner size="sm" /> : `Page ${page} of ${totalPages}`}
            </span>
            <button 
              onClick={handleNextPage}
              disabled={page === totalPages || isLoading || isPending}
              aria-label="Next page"
              className="btn btn-secondary ml-2"
            >
              Next
            </button>
          </nav>
        </main>
      </div>
    </ErrorBoundary>
  );
}