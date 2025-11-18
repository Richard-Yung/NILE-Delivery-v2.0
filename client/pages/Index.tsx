import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Truck, Clock, Lock, Star, CheckCircle2, Shield, Zap, MapPin } from "lucide-react";

export default function Index() {
  return (
    <div className="bg-background text-foreground">
      <HeroSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <FeaturesSection />
      <SecuritySection />
      <FinalCTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-primary/30 px-4 py-2 text-sm text-primary bg-primary/5">
            ⚡ Plateforme de mise en relation ultra-sécurisée
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-foreground">
            Livraisons instantanées,{" "}
            <span className="text-primary">100% sécurisées</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            NILE connecte clients et livreurs vérifiés en temps réel, avec paiements protégés par séquestre jusqu'à confirmation de livraison.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/auth?tab=signup">S'inscrire maintenant</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
              <Link to="/auth?role=livreur&tab=signup">Devenir Livreur</Link>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-primary/20">
            <div>
              <div className="text-3xl font-bold text-primary">10k+</div>
              <div className="text-sm text-muted-foreground">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">5k+</div>
              <div className="text-sm text-muted-foreground">Livreurs vérifiés</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Paiements sécurisés</div>
            </div>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="absolute -right-20 -top-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm shadow-2xl p-6">
            <div className="aspect-[9/19] w-full rounded-xl bg-gradient-to-b from-primary/20 to-transparent border border-primary/20 overflow-hidden flex flex-col items-center justify-center">
              <Truck className="h-20 w-20 text-primary mb-4 opacity-80" />
              <div className="text-center space-y-3">
                <div className="text-2xl font-bold text-primary">Livreurs proches</div>
                <p className="text-sm text-muted-foreground">En temps réel</p>
                <div className="flex justify-center gap-2 pt-2">
                  <div className="h-3 w-3 rounded-full bg-primary/60" />
                  <div className="h-3 w-3 rounded-full bg-primary/40" />
                  <div className="h-3 w-3 rounded-full bg-primary/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  const reasons = [
    {
      icon: Clock,
      title: "Livraison instantanée",
      description: "Obtenez votre commande en quelques minutes seulement."
    },
    {
      icon: Lock,
      title: "Sécurité complète",
      description: "Paiements protégés par séquestre jusqu'à confirmation."
    },
    {
      icon: Star,
      title: "Livreurs vérifiés",
      description: "Tous les livreurs sont contrôlés et certifiés."
    },
    {
      icon: Shield,
      title: "Confiance garantie",
      description: "Système d'évaluation transparent et juste."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-card/40">
      <div className="container">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Pourquoi choisir NILE ?</h2>
          <p className="text-lg text-muted-foreground">Les raisons pour lesquelles des milliers de clients nous font confiance</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div key={idx} className="rounded-lg border border-primary/20 bg-background/50 p-6 space-y-3 hover:border-primary/40 hover:bg-background/80 transition-all">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Créer une commande",
      description: "Décrivez ce que vous voulez faire livrer et le lieu."
    },
    {
      number: "2",
      title: "Choisir un livreur",
      description: "Consultez les profils et les avis avant de choisir."
    },
    {
      number: "3",
      title: "Payer en sécurité",
      description: "Effectuez le paiement protégé par séquestre."
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Comment ça marche</h2>
          <p className="text-lg text-muted-foreground">Un processus simple et sécurisé en trois étapes</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">
                  {step.number}
                </div>
                <div className="space-y-2 pt-1">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className="absolute left-6 top-12 h-12 w-0.5 bg-gradient-to-b from-primary to-transparent hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Instant",
      description: "Reçoivent et acceptez des demandes en temps réel."
    },
    {
      icon: MapPin,
      title: "Localisé",
      description: "Trouvez les livreurs disponibles les plus proches."
    },
    {
      icon: CheckCircle2,
      title: "Confirmé",
      description: "Validez la livraison avant le transfert des fonds."
    },
    {
      icon: Shield,
      title: "Protégé",
      description: "Tous les paiements sont assuré par séquestre."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-card/40">
      <div className="container">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Tout ce dont vous avez besoin</h2>
          <p className="text-lg text-muted-foreground">Pour une expérience de livraison sans stress</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="rounded-lg border border-primary/20 bg-background/50 p-6 space-y-3 text-center hover:border-primary/40 hover:bg-background/80 transition-all">
                <div className="flex justify-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SecuritySection() {
  const securityPoints = [
    {
      icon: Shield,
      title: "Profils vérifiés",
      description: "Tous les utilisateurs sont contrôlés et certifiés."
    },
    {
      icon: Lock,
      title: "Paiement sécurisé",
      description: "Système de séquestre pour votre protection."
    },
    {
      icon: Star,
      title: "Notes et évaluations",
      description: "Transparence totale avec le système d'avis."
    },
    {
      icon: Zap,
      title: "Support 24/7",
      description: "Aide disponible à tout moment pour vous."
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Votre sécurité est notre priorité</h2>
          <p className="text-lg text-muted-foreground">Nous mettons en place les mesures nécessaires pour votre tranquillité d'esprit</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <div key={idx} className="rounded-lg border border-primary/20 bg-card/50 p-6 space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{point.title}</h3>
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary/20 via-transparent to-primary/20">
      <div className="container text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Prêt à commencer ?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Rejoignez des milliers de clients et livreurs qui font confiance à NILE pour leurs livraisons sécurisées.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/auth?tab=signup">S'inscrire gratuitement</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
            <Link to="/auth?role=livreur&tab=signup">Devenir livreur</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
