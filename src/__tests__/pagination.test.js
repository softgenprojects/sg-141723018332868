import { renderHook, act } from '@testing-library/react-hooks';
import { usePosts } from '../hooks/usePosts';

// Mock the SWR hook
jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('usePosts Hook with Pagination', () => {
  it('should handle pagination correctly', async () => {
    const mockData = {
      posts: [{ id: 1, content: 'Test post' }],
      page: 1,
      totalPages: 2,
    };

    require('swr').default.mockImplementation(() => ({
      data: mockData,
      error: undefined,
    }));

    const { result } = renderHook(() => usePosts());

    expect(result.current.posts).toEqual(mockData.posts);
    expect(result.current.page).toBe(1);
    expect(result.current.totalPages).toBe(2);

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.page).toBe(2);

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.page).toBe(1);
  });

  it('should not go below page 1', () => {
    const mockData = {
      posts: [{ id: 1, content: 'Test post' }],
      page: 1,
      totalPages: 2,
    };

    require('swr').default.mockImplementation(() => ({
      data: mockData,
      error: undefined,
    }));

    const { result } = renderHook(() => usePosts());

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.page).toBe(1);
  });
});