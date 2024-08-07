import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const FloatingActionButton = React.forwardRef(({ onClick }, ref) => {
  return (
    <Button
      ref={ref}
      className="fixed right-4 bottom-4 rounded-full w-16 h-16 shadow-lg"
      onClick={onClick}
      aria-label="Create new post"
    >
      <Plus className="w-6 h-6" />
    </Button>
  );
});

FloatingActionButton.displayName = 'FloatingActionButton';

export { FloatingActionButton };