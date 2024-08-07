import { renderHook, act } from '@testing-library/react-hooks';
import { usePosts } from '../hooks/usePosts';
import { mockFetchPosts, mockCreatePost } from '../mocks/api';

jest.mock('../mocks/api');

describe('usePosts Hook', () => {
  it('should fetch posts', async () => {
    mockFetchPosts.mockResolvedValueOnce([{ id: 1, content: 'Test post' }]);
    
    const { result, waitForNextUpdate } = renderHook(() => usePosts());
    
    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();
    
    expect(result.current.posts).toEqual([{ id: 1, content: 'Test post' }]);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle fetch error', async () => {
    mockFetchPosts.mockRejectedValueOnce(new Error('Fetch error'));
    
    const { result, waitForNextUpdate } = renderHook(() => usePosts());
    
    await waitForNextUpdate();
    
    expect(result.current.error).toEqual(new Error('Fetch error'));
  });

  it('should create a new post', async () => {
    const newPost = { content: 'New post', latitude: 0, longitude: 0, userId: 1 };
    mockCreatePost.mockResolvedValueOnce({ id: 2, ...newPost });
    
    const { result, waitForNextUpdate } = renderHook(() => usePosts());
    
    await waitForNextUpdate();
    
    act(() => {
      result.current.mutate(newPost);
    });
    
    await waitForNextUpdate();
    
    expect(result.current.posts).toContainEqual({ id: 2, ...newPost });
  });
});