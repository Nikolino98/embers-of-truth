import { Flame } from 'lucide-react';
import { useTotalPosts } from '@/hooks/useStore';
import { motion } from 'framer-motion';

export default function AppHeader() {
  const total = useTotalPosts();

  return (
    <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="h-10 w-10 text-primary" />
            </motion.div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-gradient-fire">
                GRITO ANÓNIMO
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">
                Tu voz importa. Desahógate sin miedo.
              </p>
            </div>
          </div>
          <motion.div
            className="flex items-center gap-2 rounded-lg bg-muted/50 border border-border px-4 py-2"
            animate={{ boxShadow: ['0 0 5px hsl(0 85% 50% / 0.2)', '0 0 15px hsl(0 85% 50% / 0.4)', '0 0 5px hsl(0 85% 50% / 0.2)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Flame className="h-4 w-4 text-primary animate-flicker" />
            <span className="text-sm text-muted-foreground">Almas que gritaron:</span>
            <span className="font-display font-bold text-primary text-lg">{total}</span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
