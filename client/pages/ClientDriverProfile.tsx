import { useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Bike, Car, ArrowLeft, Star } from "lucide-react";
import { MotoIcon } from "@/components/icons/vehicle";

const MOCK = {
  d1: { name: "Awa K.", rating: 4.8, reviews: 126, status: "Disponible", vehicle: { type: "moto" as const, plate: "AA-123-BB", model: "Yamaha 125" } },
  d2: { name: "Ibrahima T.", rating: 4.7, reviews: 98, status: "En cours", vehicle: { type: "moto" as const, plate: "AB-456-CD", model: "Honda 110" } },
  d3: { name: "Fatou S.", rating: 4.9, reviews: 203, status: "Disponible", vehicle: { type: "voiture" as const, plate: "AC-789-EF", model: "Toyota Yaris" } },
  d4: { name: "Moussa B.", rating: 4.5, reviews: 64, status: "Disponible", vehicle: { type: "velo" as const, plate: "—", model: "VTT Urbain" } },
} as const;

type Vehicle = "moto" | "voiture" | "velo";

const VIcon = ({ t }: { t: Vehicle }) => {
  const Icon = t === "moto" ? MotoIcon : t === "voiture" ? Car : Bike;
  return <Icon className="h-4 w-4" />;
};

export default function ClientDriverProfile() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const nav = useNavigate();
  const data = (MOCK as any)[id ?? ""] as (typeof MOCK)[keyof typeof MOCK] | undefined;
  const glowShadow = useMemo(() => "shadow-[0_0_20px_hsl(var(--primary))]", []);

  if (!data) {
    return (
      <div className="container py-10">
        <Button variant="secondary" onClick={() => nav(-1)} className="mb-4">Retour</Button>
        <Card className="p-6">Livreur introuvable.</Card>
      </div>
    );
  }

  const goSend = () => nav(`/client/track?driver=${id}`);

  return (
    <div className="container py-6 md:py-10">
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="icon" onClick={() => nav(-1)} aria-label="Retour">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Profil du Livreur</h1>
      </div>

      <Card className="mt-6 p-6 grid md:grid-cols-[240px,1fr] gap-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24">
            <AvatarFallback>{data.name.split(" ")[0][0]}{data.name.split(" ")[1]?.[0] ?? ""}</AvatarFallback>
          </Avatar>
          <div className="mt-3 text-xl font-semibold">{data.name}</div>
          <div className="mt-1 inline-flex items-center gap-1 text-amber-400">
            <Star className="h-4 w-4 fill-amber-400" />
            <span>{data.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({data.reviews} avis)</span>
          </div>
          <div className="mt-2">
            <Badge variant="outline" className={data.status === "Disponible" ? "border-primary/40" : "border-border"}>{data.status}</Badge>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="p-4">
            <div className="font-semibold">Informations véhicule</div>
            <div className="mt-2 text-sm text-muted-foreground flex items-center gap-3">
              <VIcon t={data.vehicle.type} />
              <span className="capitalize">{data.vehicle.type}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Modèle: <span className="text-foreground">{data.vehicle.model}</span></span>
              <Separator orientation="vertical" className="h-4" />
              <span>Immatriculation: <span className="text-foreground">{data.vehicle.plate}</span></span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="font-semibold">Historique & fiabilité</div>
            <div className="mt-2 grid sm:grid-cols-3 gap-3 text-sm">
              <Stat label="Courses" value="1 254" />
              <Stat label="Annulations" value="0.8%" />
              <Stat label="Temps moyen" value="12 min" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="font-semibold">Commentaires récents</div>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>• Service rapide et professionnel.</li>
              <li>• Très aimable, livraison en avance.</li>
              <li>• Communication impeccable.</li>
            </ul>
          </Card>

          <div className="flex items-center gap-3">
            <Button className={cn("flex-1 h-12 text-base font-semibold", glowShadow)} onClick={goSend}>Envoyer une Demande</Button>
            <Button variant="secondary" className="h-12" onClick={() => nav(-1)}>Retour</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}
