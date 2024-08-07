import "@/styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
      <Toaster />
    </ErrorBoundary>
  );
}