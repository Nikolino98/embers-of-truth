import { useSyncExternalStore } from 'react';
import { subscribe, getSortedPosts, getTotalPosts } from '@/lib/store';

// Cache snapshots to avoid infinite re-render loops with useSyncExternalStore
let cachedSorted: ReturnType<typeof getSortedPosts> = getSortedPosts();
let cachedTotal: number = getTotalPosts();

subscribe(() => {
  cachedSorted = getSortedPosts();
  cachedTotal = getTotalPosts();
});

function getSortedSnapshot() {
  return cachedSorted;
}

function getTotalSnapshot() {
  return cachedTotal;
}

export function usePosts() {
  return useSyncExternalStore(subscribe, getSortedSnapshot, getSortedSnapshot);
}

export function useTotalPosts() {
  return useSyncExternalStore(subscribe, getTotalSnapshot, getTotalSnapshot);
}
