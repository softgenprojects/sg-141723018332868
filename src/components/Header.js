import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MapPin size={24} />
          <h1 className="text-2xl font-bold">3D Mapbox World - SF</h1>
        </div>
        <nav>
          <Button variant="outline" className="text-white border-white hover:bg-blue-700 transition-colors">
            About
          </Button>
        </nav>
      </div>
    </header>
  );
}