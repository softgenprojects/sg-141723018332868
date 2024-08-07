import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">3D Mapbox World - San Francisco</h1>
        <nav>
          <Button variant="secondary">About</Button>
        </nav>
      </div>
    </header>
  );
}