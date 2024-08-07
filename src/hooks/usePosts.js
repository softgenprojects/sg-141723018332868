import useSWR from 'swr';
import { useState, useCallback, useRef } from 'react';
import { logError } from '@/utils/errorLogging';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export function usePosts(pageSize = 10) {
  const [page, setPage] = useState(1);
  const cache = useRef({});
  const { data, error, mutate } = useSWR(`/api/posts?page=${page}&pageSize=${pageSize}`, fetcher);

  const createPost = useCallback(async (postData) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (!response.ok) throw new Error('Failed to create post');
      const newPost = await response.json();
      mutate();
      return newPost;
    } catch (error) {
      logError('Error creating post:', error);
      throw error;
    }
  }, [mutate]);

  const nextPage = useCallback(() => {
    if (data && data.posts.length === pageSize) {
      setPage(p => p + 1);
    }
  }, [data, pageSize]);

  const prevPage = useCallback(() => {
    setPage(p => Math.max(1, p - 1));
  }, []);

  // Simple caching mechanism
  if (data && !cache.current[page]) {
    cache.current[page] = data;
  }

  return {
    posts: data?.posts || cache.current[page]?.posts || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
    createPost,
    nextPage,
    prevPage,
    page,
    totalPages: data?.totalPages || cache.current[page]?.totalPages || 0
  };
}