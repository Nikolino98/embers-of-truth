import { usePosts } from '@/hooks/useStore';
import PostCard from './PostCard';

export default function Feed() {
  const posts = usePosts();

  return (
    <div className="relative z-10 container mx-auto px-4 pb-8">
      <div className="grid gap-4 max-w-3xl mx-auto">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            Sé el primero en gritar. El fuego espera tu voz.
          </p>
        ) : (
          posts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)
        )}
      </div>
    </div>
  );
}
