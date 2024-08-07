import useSWR from 'swr';
import { useState, useCallback, useRef } from 'react';
import { logError } from '@/utils/errorLogging';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3014';
const fetcher = async (...args) => {
  try {
    const response = await fetch(...args);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    logError('Error fetching data:', error);
    throw error;
  }
};

export function usePosts(pageSize = 10) {
  const [page, setPage] = useState(1);
  const cache = useRef({});
  const { data, error, mutate } = useSWR(`${API_URL}/api/posts?page=${page}&pageSize=${pageSize}`, fetcher, {
    onSuccess: (data) => {
      cache.current[page] = data;
    },
  });

  const createPost = useCallback(async (postData) => {
    try {
      const response = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (!response.ok) throw new Error('Failed to create post');
      const newPost = await response.json();
      await mutate();
      return newPost;
    } catch (error) {
      logError('Error creating post:', error);
      throw error;
    }
  }, [mutate]);

  const nextPage = useCallback(() => {
    if (data && data.posts.length === pageSize && page < data.totalPages) {
      setPage(p => p + 1);
    }
  }, [data, pageSize, page]);

  const prevPage = useCallback(() => {
    setPage(p => Math.max(1, p - 1));
  }, []);

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