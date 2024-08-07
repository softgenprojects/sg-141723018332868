// Mock API responses for testing

export const mockPosts = [
  { id: 1, content: "Hello from San Francisco!", latitude: 37.7749, longitude: -122.4194, userId: 1 },
  { id: 2, content: "Golden Gate Bridge is amazing!", latitude: 37.8199, longitude: -122.4783, userId: 1 },
  { id: 3, content: "Enjoying the view from Twin Peaks!", latitude: 37.7544, longitude: -122.4477, userId: 1 },
  { id: 4, content: "Delicious food at Ferry Building!", latitude: 37.7955, longitude: -122.3937, userId: 1 },
  { id: 5, content: "Riding a cable car!", latitude: 37.7949, longitude: -122.4072, userId: 1 },
];

export async function mockFetchPosts(page = 1, pageSize = 10) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedPosts = mockPosts.slice(startIndex, endIndex);
      resolve({
        posts: paginatedPosts,
        page,
        pageSize,
        total: mockPosts.length,
        totalPages: Math.ceil(mockPosts.length / pageSize),
      });
    }, 500);
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

export async function mockDeletePost(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockPosts.findIndex(post => post.id === id);
      if (index !== -1) {
        mockPosts.splice(index, 1);
        resolve({ success: true });
      } else {
        reject(new Error('Post not found'));
      }
    }, 500);
  });
}