export function applyPlanStyles(planId: string | null): string {
  switch (planId) {
    case 'PLAN_BRONCE':
      return 'border-2 border-plan-bronce bg-gradient-to-br from-card to-muted';
    case 'PLAN_PLATA':
      return 'border-2 border-plan-plata bg-gradient-to-br from-card to-muted shadow-lg';
    case 'PLAN_ORO':
      return 'border-2 border-plan-oro glow-orange bg-gradient-to-br from-card via-muted to-card';
    case 'PLAN_DIAMANTE':
      return 'border-2 border-plan-diamante glow-diamante bg-gradient-to-br from-card via-muted to-card animate-ember-glow';
    default:
      return 'border border-border bg-card';
  }
}

export function getPlanBadge(planId: string | null): string | null {
  switch (planId) {
    case 'PLAN_BRONCE': return '🔥 Bronce';
    case 'PLAN_PLATA': return '⚔️ Plata';
    case 'PLAN_ORO': return '👑 Oro';
    case 'PLAN_DIAMANTE': return '💎 Voz de Oro';
    default: return null;
  }
}

export function getPlanBadgeClass(planId: string | null): string {
  switch (planId) {
    case 'PLAN_BRONCE': return 'bg-plan-bronce/20 text-plan-bronce';
    case 'PLAN_PLATA': return 'bg-plan-plata/20 text-plan-plata';
    case 'PLAN_ORO': return 'bg-plan-oro/20 text-plan-oro';
    case 'PLAN_DIAMANTE': return 'bg-plan-diamante/20 text-plan-diamante';
    default: return '';
  }
}
