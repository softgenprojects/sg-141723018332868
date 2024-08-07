import useSWR from 'swr';
import { mockFetchPosts } from '@/mocks/api';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export function usePosts() {
  const { data, error, mutate } = useSWR('/api/posts', () => mockFetchPosts());

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}