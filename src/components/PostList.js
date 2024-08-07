import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PostList({ posts }) {
  return (
    <div className="space-y-4 p-4 max-h-screen overflow-y-auto">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>Post at {post.latitude.toFixed(4)}, {post.longitude.toFixed(4)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}