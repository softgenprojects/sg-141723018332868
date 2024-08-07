// Mock API responses for testing

export const mockPosts = [
  { id: 1, content: "Hello from San Francisco!", latitude: 37.7749, longitude: -122.4194, userId: 1 },
  { id: 2, content: "Golden Gate Bridge is amazing!", latitude: 37.8199, longitude: -122.4783, userId: 1 },
];

export async function mockFetchPosts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPosts), 500);
  });
}

export async function mockCreatePost(post) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPost = { ...post, id: mockPosts.length + 1 };
      mockPosts.push(newPost);
      resolve(newPost);
    }, 500);
  });
}