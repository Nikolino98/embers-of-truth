export interface Post {
  id: string;
  anon_num: number;
  content: string;
  created_at: string;
  stats: {
    likes: number;
    dislikes: number;
    reports: number;
  };
  featured_data: {
    is_featured: boolean;
    plan_id: string | null;
    expires_at: string | null;
  };
}

export type PlanId = 'PLAN_BRONCE' | 'PLAN_PLATA' | 'PLAN_ORO' | 'PLAN_DIAMANTE';

export interface Plan {
  id: PlanId;
  name: string;
  duration: string;
  description: string;
  price: string;
  priority: number;
}

export const PLANS: Plan[] = [
  { id: 'PLAN_BRONCE', name: 'Bronce', duration: '24 horas', description: 'Destaque básico', price: '$500', priority: 1 },
  { id: 'PLAN_PLATA', name: 'Plata', duration: '3 días', description: 'Borde diferenciado', price: '$1.200', priority: 2 },
  { id: 'PLAN_ORO', name: 'Oro', duration: '7 días', description: 'Efecto Glow + prioridad', price: '$2.500', priority: 3 },
  { id: 'PLAN_DIAMANTE', name: 'Diamante', duration: '30 días', description: 'Voz de Oro + máxima prioridad', price: '$5.000', priority: 4 },
];

export const PLAN_PRIORITY: Record<string, number> = {
  PLAN_DIAMANTE: 4,
  PLAN_ORO: 3,
  PLAN_PLATA: 2,
  PLAN_BRONCE: 1,
};

export const MAX_CONTENT_LENGTH = 1000;
