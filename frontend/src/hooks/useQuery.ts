import { useState, useEffect, useCallback } from 'react';

export interface UseQueryOptions {
  enabled?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export interface UseQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for data fetching with caching and loading states
 * Similar to React Query's useQuery but simplified
 * @param _queryKey - Query key for future caching implementation
 * @param queryFn - Function that returns a promise with data
 * @param options - Optional configuration
 */
export function useQuery<T>(
  _queryKey: string[],
  queryFn: () => Promise<T>,
  options: UseQueryOptions = {}
): UseQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { enabled = true, refetchInterval, onSuccess, onError } = options;

  const fetchData = useCallback(async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const result = await queryFn();
      setData(result);
      
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [queryFn, enabled, onSuccess, onError]);

  useEffect(() => {
    fetchData();

    // Setup interval refetch if specified
    if (refetchInterval && refetchInterval > 0) {
      const intervalId = setInterval(fetchData, refetchInterval);
      return () => clearInterval(intervalId);
    }
  }, [fetchData, refetchInterval]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}

/**
 * Custom hook for mutations (POST, PUT, DELETE operations)
 */
export interface UseMutationResult<T, V> {
  mutate: (variables: V) => Promise<void>;
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
}

export function useMutation<T, V>(
  mutationFn: (variables: V) => Promise<T>,
  options?: {
    onSuccess?: (data: T, variables: V) => void;
    onError?: (error: Error, variables: V) => void;
  }
): UseMutationResult<T, V> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: V) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await mutationFn(variables);
      setData(result);
      
      if (options?.onSuccess) {
        options.onSuccess(result, variables);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Mutation failed');
      setError(error);
      
      if (options?.onError) {
        options.onError(error, variables);
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    mutate,
    data,
    isLoading,
    error,
    reset,
  };
}
