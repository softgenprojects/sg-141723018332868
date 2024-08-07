import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">3D Mapbox World - San Francisco</h1>
        <nav>
          <Button variant="outline" className="text-white border-white hover:bg-blue-700">About</Button>
        </nav>
      </div>
    </header>
  );
}