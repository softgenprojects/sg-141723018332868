// Mock API responses for testing

export const mockPosts = [
  { id: 1, content: "Hello from San Francisco!", latitude: 37.7749, longitude: -122.4194, userId: 1 },
  { id: 2, content: "Golden Gate Bridge is amazing!", latitude: 37.8199, longitude: -122.4783, userId: 1 },
];

export async function mockFetchPosts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('Failed to fetch posts'));
      } else {
        resolve(mockPosts);
      }
    }, 500);
  });
}

export async function mockCreatePost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('Failed to create post'));
      } else {
        const newPost = { ...post, id: mockPosts.length + 1 };
        mockPosts.push(newPost);
        resolve(newPost);
      }
    }, 500);
  });
}

export async function mockDeletePost(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('Failed to delete post'));
      } else {
        const index = mockPosts.findIndex(post => post.id === id);
        if (index !== -1) {
          mockPosts.splice(index, 1);
          resolve({ success: true });
        } else {
          reject(new Error('Post not found'));
        }
      }
    }, 500);
  });
}