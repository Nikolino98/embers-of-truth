import { useState } from 'react';
import { Search, Zap, Crown, Diamond, Shield, Flame } from 'lucide-react';
import { findPostByAnonNum, featurePost } from '@/lib/store';
import { PLANS, PlanId, Post } from '@/lib/types';
import { applyPlanStyles } from '@/lib/planStyles';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const planIcons: Record<PlanId, typeof Flame> = {
  PLAN_BRONCE: Flame,
  PLAN_PLATA: Shield,
  PLAN_ORO: Crown,
  PLAN_DIAMANTE: Diamond,
};

const planColorClass: Record<PlanId, string> = {
  PLAN_BRONCE: 'text-plan-bronce border-plan-bronce hover:bg-plan-bronce/10',
  PLAN_PLATA: 'text-plan-plata border-plan-plata hover:bg-plan-plata/10',
  PLAN_ORO: 'text-plan-oro border-plan-oro hover:bg-plan-oro/10',
  PLAN_DIAMANTE: 'text-plan-diamante border-plan-diamante hover:bg-plan-diamante/10',
};

export default function PromotionSection() {
  const [anonNum, setAnonNum] = useState('');
  const [foundPost, setFoundPost] = useState<Post | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const num = parseInt(anonNum);
    if (isNaN(num)) return;
    const post = findPostByAnonNum(num);
    if (post) {
      setFoundPost(post);
      setNotFound(false);
    } else {
      setFoundPost(null);
      setNotFound(true);
    }
  };

  const handleFeature = () => {
    if (!foundPost || !selectedPlan) return;
    // Here you'd integrate with MercadoPago/PayPal/PersonalPay SDK
    // For now, simulate success
    featurePost(foundPost.id, selectedPlan);
    toast.success(`¡Tu voz fue potenciada con el plan ${PLANS.find(p => p.id === selectedPlan)?.name}!`, { icon: '🚀' });
    setFoundPost(null);
    setSelectedPlan(null);
    setAnonNum('');
  };

  return (
    <section className="relative z-10 border-t border-border/50 bg-card/50 backdrop-blur">
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl font-bold text-gradient-fire mb-2">
            🔥 Potenciá tu Voz
          </h2>
          <p className="text-muted-foreground text-sm">
            Hacé que tu grito se escuche más fuerte. Elegí un plan y destacá tu mensaje.
          </p>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-6">
          <div className="flex-1 relative">
            <input
              type="number"
              value={anonNum}
              onChange={(e) => { setAnonNum(e.target.value); setNotFound(false); setFoundPost(null); }}
              placeholder="Ingresá tu número de Anónimo #"
              className="w-full bg-input/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="bg-primary text-primary-foreground px-5 py-3 rounded-lg font-semibold flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Buscar
          </motion.button>
        </div>

        {notFound && (
          <p className="text-destructive text-sm text-center mb-4">No se encontró ningún post con ese número.</p>
        )}

        <AnimatePresence>
          {foundPost && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              {/* Preview */}
              <div className="rounded-lg bg-muted/30 border border-border p-4 mb-6">
                <p className="text-xs text-muted-foreground mb-1">Preview — Anónimo #{foundPost.anon_num}</p>
                <p className="text-foreground/80 text-sm line-clamp-3">{foundPost.content}</p>
              </div>

              {/* Plan selector */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {PLANS.map(plan => {
                  const Icon = planIcons[plan.id];
                  const isSelected = selectedPlan === plan.id;
                  return (
                    <motion.button
                      key={plan.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`rounded-lg border-2 p-4 text-left transition-all ${planColorClass[plan.id]} ${isSelected ? 'ring-2 ring-offset-2 ring-offset-background ring-current' : 'opacity-70'}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="h-4 w-4" />
                        <span className="font-display font-bold text-sm">{plan.name}</span>
                      </div>
                      <p className="text-xs opacity-80">{plan.duration} — {plan.description}</p>
                      <p className="font-bold mt-1">{plan.price}</p>
                    </motion.button>
                  );
                })}
              </div>

              {selectedPlan && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFeature}
                  className="w-full bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground py-3 rounded-lg font-display font-bold text-lg glow-red transition-all"
                >
                  <Zap className="inline h-5 w-5 mr-2" />
                  Potenciar con {PLANS.find(p => p.id === selectedPlan)?.name}
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
