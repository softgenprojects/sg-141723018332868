import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export function usePosts() {
  const { data, error, mutate } = useSWR('/api/posts', fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}