import { Heart, Flame } from 'lucide-react';

export default function AppFooter() {
  return (
    <footer className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur">
      <div className="container mx-auto px-4 py-8">
        {/* Donation buttons */}
        <div className="text-center mb-6">
          <p className="text-muted-foreground text-sm mb-3 flex items-center justify-center gap-2">
            <Heart className="h-4 w-4 text-primary" />
            Si este espacio te ayudó, podés colaborar
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#mercadopago"
              className="rounded-lg border border-border bg-muted/30 px-5 py-2.5 text-sm text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all font-semibold"
            >
              💳 Mercado Pago
            </a>
            <a
              href="#paypal"
              className="rounded-lg border border-border bg-muted/30 px-5 py-2.5 text-sm text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all font-semibold"
            >
              🌐 PayPal
            </a>
            <a
              href="#personalpay"
              className="rounded-lg border border-border bg-muted/30 px-5 py-2.5 text-sm text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all font-semibold"
            >
              📱 Personal Pay
            </a>
          </div>
        </div>

        <div className="border-t border-border/30 pt-4 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Flame className="h-3 w-3 text-primary" />
            Grito Anónimo — Un espacio seguro para tu voz.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Si estás pasando por un momento difícil, buscá ayuda profesional. No estás solo/a. 💛
          </p>
        </div>
      </div>
    </footer>
  );
}
