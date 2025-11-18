import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/10 dark:to-amber-900/10" />
      <div className="container py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm text-muted-foreground mb-4 bg-background/60 backdrop-blur">
            Plateforme de mise en relation ultra-sécurisée
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Courses et livraisons instantanées, sécurisées par séquestre.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            NILE connecte clients et livreurs vérifiés en temps réel, avec paiements protégés jusqu'à confirmation de livraison.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground">
              <Link to="/auth">Se connecter</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/auth?tab=signup">S'inscrire</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/auth?role=livreur&tab=signup">Devenir Livreur</Link>
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <div className="text-2xl font-bold text-foreground">10k+</div>
              Clients satisfaits
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">5k+</div>
              Livreurs vérifiés
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground"><span className="text-primary">Escrow</span></div>
              Paiement garanti
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -right-20 -top-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative mx-auto w-full max-w-sm rounded-2xl border bg-card shadow-xl p-4">
            <div className="aspect-[9/19] w-full rounded-xl bg-gradient-to-b from-black/80 to-black/20 overflow-hidden">
              <div className="p-4 text-white">
                <div className="flex items-center justify-between text-xs opacity-90">
                  <span>NILE</span>
                  <span>• En temps réel</span>
                </div>
                <div className="mt-24 text-center">
                  <div className="text-5xl font-extrabold">• • •</div>
                  <div className="mt-3 text-lg opacity-90">Livreurs proches</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur">
                  <div className="flex items-center justify-between text-sm">
                    <span>Escrow activé</span>
                    <span className="text-amber-300 font-semibold">Sécurisé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
