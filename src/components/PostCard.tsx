import { useState } from 'react';
import { ThumbsUp, ThumbsDown, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { Post } from '@/lib/types';
import { likePost, dislikePost, reportPost } from '@/lib/store';
import { applyPlanStyles, getPlanBadge, getPlanBadgeClass } from '@/lib/planStyles';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const TRUNCATE_LENGTH = 280;

interface PostCardProps {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = post.content.length > TRUNCATE_LENGTH;
  const displayContent = isLong && !expanded ? post.content.slice(0, TRUNCATE_LENGTH) + '…' : post.content;
  const planStyles = applyPlanStyles(post.featured_data.is_featured ? post.featured_data.plan_id : null);
  const badge = post.featured_data.is_featured ? getPlanBadge(post.featured_data.plan_id) : null;
  const badgeClass = post.featured_data.is_featured ? getPlanBadgeClass(post.featured_data.plan_id) : '';

  const handleReport = () => {
    reportPost(post.id);
    toast.info('Reporte registrado. Gracias por cuidar la comunidad.', { icon: '🛡️' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`rounded-xl p-5 transition-all ${planStyles}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-bold text-primary">
            Anónimo #{post.anon_num}
          </span>
          {badge && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${badgeClass}`}>
              {badge}
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(post.created_at).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <p className="text-foreground/90 leading-relaxed mb-2 whitespace-pre-wrap break-words">{displayContent}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 mb-3 transition-colors"
        >
          {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          {expanded ? 'Leer menos' : 'Leer más'}
        </button>
      )}

      <div className="flex items-center gap-1">
        <button
          onClick={() => likePost(post.id)}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-primary px-3 py-1.5 rounded-md hover:bg-primary/10 transition-colors text-sm"
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{post.stats.likes}</span>
        </button>
        <button
          onClick={() => dislikePost(post.id)}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-secondary px-3 py-1.5 rounded-md hover:bg-secondary/10 transition-colors text-sm"
        >
          <ThumbsDown className="h-4 w-4" />
          <span>{post.stats.dislikes}</span>
        </button>
        <div className="flex-1" />
        <button
          onClick={handleReport}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive px-3 py-1.5 rounded-md hover:bg-destructive/10 transition-colors text-xs"
          title="Reporte de Escucha"
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          Reportar
        </button>
      </div>
    </motion.div>
  );
}
