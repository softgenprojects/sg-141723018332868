import "@/styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Toaster } from "@/components/ui/toaster";
import GlobalErrorBoundary from "@/components/GlobalErrorBoundary";

export default function App({ Component, pageProps }) {
  return (
    <GlobalErrorBoundary>
      <Component {...pageProps} />
      <Toaster />
    </GlobalErrorBoundary>
  );
}