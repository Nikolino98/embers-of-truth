import { Post, PlanId, PLAN_PRIORITY } from './types';

let posts: Post[] = [];
let nextAnonNum = 1;
let listeners: (() => void)[] = [];

function notify() {
  listeners.forEach(fn => fn());
}

// Seed some sample posts
function seed() {
  const samples = [
    "Hoy me di cuenta de que no puedo seguir fingiendo que todo está bien. Necesitaba decirlo en algún lugar.",
    "Llevo 3 años en un trabajo que odio solo porque tengo miedo de empezar de cero. ¿Alguien más se siente así?",
    "Extraño a alguien que ya no existe como la persona que conocí. Y duele.",
    "Me siento invisible en mi propia familia. Nadie pregunta cómo estoy realmente.",
    "Hoy lloré en el baño del trabajo. No sé cuánto más puedo aguantar.",
    "Dejé ir a alguien que me amaba porque no me sentía suficiente. Ahora me arrepiento todos los días.",
    "Mi ansiedad me impide hacer cosas básicas. La gente cree que soy vago, pero es terror puro.",
    "Quiero gritar pero no tengo a nadie que me escuche.",
  ];

  samples.forEach((content, i) => {
    const id = crypto.randomUUID();
    const post: Post = {
      id,
      anon_num: nextAnonNum++,
      content,
      created_at: new Date(Date.now() - (samples.length - i) * 3600000).toISOString(),
      stats: { likes: Math.floor(Math.random() * 50), dislikes: Math.floor(Math.random() * 5), reports: 0 },
      featured_data: { is_featured: false, plan_id: null, expires_at: null },
    };
    posts.push(post);
  });

  // Make one featured
  posts[1].featured_data = { is_featured: true, plan_id: 'PLAN_ORO', expires_at: new Date(Date.now() + 7 * 86400000).toISOString() };
  posts[5].featured_data = { is_featured: true, plan_id: 'PLAN_DIAMANTE', expires_at: new Date(Date.now() + 30 * 86400000).toISOString() };
}

seed();

export function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => { listeners = listeners.filter(l => l !== listener); };
}

export function getPosts(): Post[] {
  return [...posts];
}

export function getSortedPosts(): Post[] {
  const now = new Date();
  const visible = posts.filter(p => p.stats.reports < 30);

  const featured = visible
    .filter(p => p.featured_data.is_featured && p.featured_data.expires_at && new Date(p.featured_data.expires_at) > now)
    .sort((a, b) => (PLAN_PRIORITY[b.featured_data.plan_id || ''] || 0) - (PLAN_PRIORITY[a.featured_data.plan_id || ''] || 0));

  const normal = visible
    .filter(p => !p.featured_data.is_featured || !p.featured_data.expires_at || new Date(p.featured_data.expires_at) <= now)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return [...featured, ...normal];
}

export function addPost(content: string): Post {
  const post: Post = {
    id: crypto.randomUUID(),
    anon_num: nextAnonNum++,
    content,
    created_at: new Date().toISOString(),
    stats: { likes: 0, dislikes: 0, reports: 0 },
    featured_data: { is_featured: false, plan_id: null, expires_at: null },
  };
  posts = [post, ...posts];
  notify();
  return post;
}

export function likePost(id: string) {
  posts = posts.map(p => p.id === id ? { ...p, stats: { ...p.stats, likes: p.stats.likes + 1 } } : p);
  notify();
}

export function dislikePost(id: string) {
  posts = posts.map(p => p.id === id ? { ...p, stats: { ...p.stats, dislikes: p.stats.dislikes + 1 } } : p);
  notify();
}

export function reportPost(id: string) {
  posts = posts.map(p => p.id === id ? { ...p, stats: { ...p.stats, reports: p.stats.reports + 1 } } : p);
  notify();
}

export function findPostByAnonNum(num: number): Post | undefined {
  return posts.find(p => p.anon_num === num);
}

export function featurePost(id: string, planId: PlanId) {
  const durations: Record<PlanId, number> = {
    PLAN_BRONCE: 24 * 3600000,
    PLAN_PLATA: 3 * 24 * 3600000,
    PLAN_ORO: 7 * 24 * 3600000,
    PLAN_DIAMANTE: 30 * 24 * 3600000,
  };
  posts = posts.map(p => p.id === id ? {
    ...p,
    featured_data: {
      is_featured: true,
      plan_id: planId,
      expires_at: new Date(Date.now() + durations[planId]).toISOString(),
    },
  } : p);
  notify();
}

export function getTotalPosts(): number {
  return posts.length;
}
