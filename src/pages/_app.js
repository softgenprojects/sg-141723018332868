import "@/styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}