import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Shield, Timer, Wallet, MapPin, Star, Car, Bell } from "lucide-react";

function Feature({ title, desc, icon: Icon }: { title: string; desc: string; icon: React.ComponentType<any> }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent />
    </Card>
  );
}

export default function FeatureGrid() {
  return (
    <section id="fonctionnalites" className="container py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Pour les Clients</h2>
          <p className="mt-2 text-muted-foreground">Trouvez un livreur vérifié, suivez votre course en direct et payez en toute sécurité.</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Feature title="Livreurs vérifiés" desc="Profils contrôlés avec pièces justificatives." icon={Shield} />
            <Feature title="Temps réel" desc="Cartes et positions mises à jour en direct." icon={Timer} />
            <Feature title="Paiement Escrow" desc="Vos fonds sont protégés jusqu'à confirmation." icon={Wallet} />
            <Feature title="Filtres" desc="Moto, voiture, vélo selon votre besoin." icon={MapPin} />
          </div>
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Pour les Livreurs</h2>
          <p className="mt-2 text-muted-foreground">Acceptez des missions, gérez votre statut et vos revenus à la demande.</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Feature title="Demandes instantanées" desc="Recevez des notifications en temps réel." icon={Bell} />
            <Feature title="Statut flexible" desc="Disponible / Occupé en un geste." icon={CheckCircle2} />
            <Feature title="Revenus garantis" desc="Transfert après validation client." icon={Star} />
            <Feature title="Multi-véhicules" desc="Vélo, moto, voiture pris en charge." icon={Car} />
          </div>
        </div>
      </div>
    </section>
  );
}
