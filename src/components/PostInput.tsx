import { useState } from 'react';
import { Send, Flame } from 'lucide-react';
import { addPost } from '@/lib/store';
import { MAX_CONTENT_LENGTH } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function PostInput() {
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  const charCount = content.length;
  const isOverLimit = charCount > MAX_CONTENT_LENGTH;
  const isEmpty = content.trim().length === 0;

  const handleSubmit = () => {
    if (isEmpty || isOverLimit) return;
    setIsSending(true);
    setTimeout(() => {
      const post = addPost(content.trim());
      toast.success(`Tu grito fue escuchado. Eres Anónimo #${post.anon_num}`, {
        icon: '🔥',
      });
      setContent('');
      setIsSending(false);
    }, 400);
  };

  return (
    <div className="relative z-10 container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-card/80 backdrop-blur border border-border p-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Flame className="h-5 w-5 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">Dejá salir lo que quemas por dentro</h2>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribí lo que necesitás decir... nadie sabrá quién sos."
          className="w-full min-h-[120px] bg-input/50 border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          maxLength={MAX_CONTENT_LENGTH + 50}
        />
        <div className="flex items-center justify-between mt-3">
          <span className={`text-sm ${isOverLimit ? 'text-destructive font-semibold' : 'text-muted-foreground'}`}>
            {charCount}/{MAX_CONTENT_LENGTH}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={isEmpty || isOverLimit || isSending}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
            {isSending ? 'Enviando...' : 'Gritar al vacío'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
