import { useSyncExternalStore } from 'react';
import { subscribe, getSortedPosts, getTotalPosts } from '@/lib/store';

export function usePosts() {
  return useSyncExternalStore(subscribe, getSortedPosts, getSortedPosts);
}

export function useTotalPosts() {
  return useSyncExternalStore(subscribe, getTotalPosts, getTotalPosts);
}
