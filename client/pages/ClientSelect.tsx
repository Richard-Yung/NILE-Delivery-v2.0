import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft, Bike, Car, Star } from "lucide-react";
import { MotoIcon } from "@/components/icons/vehicle";

const DRIVERS = [
  { id: "d1", name: "Awa K.", rating: 4.8, reviews: 126, distanceKm: 1.2, vehicle: "moto" as const, price: 3500 },
  { id: "d2", name: "Ibrahima T.", rating: 4.7, reviews: 98, distanceKm: 2.0, vehicle: "moto" as const, price: 3600 },
  { id: "d3", name: "Fatou S.", rating: 4.9, reviews: 203, distanceKm: 0.9, vehicle: "voiture" as const, price: 5200 },
  { id: "d4", name: "Moussa B.", rating: 4.5, reviews: 64, distanceKm: 1.8, vehicle: "velo" as const, price: 3000 },
];

type Vehicle = "moto" | "voiture" | "velo";

const VehicleIcon = ({ v }: { v: Vehicle }) => {
  const Icon = v === "moto" ? MotoIcon : v === "voiture" ? Car : Bike;
  return <Icon className="h-4 w-4" />;
};

export default function ClientSelect() {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const [selected, setSelected] = useState(DRIVERS[0].id);
  const vehicle = (params.get("vehicle") as Vehicle) || "moto";
  const to = params.get("to") || "Destination";

  const glowShadow = useMemo(() => "shadow-[0_0_20px_hsl(var(--primary))]", []);

  useEffect(() => {
    // Default selection aligned with requested vehicle if possible
    const match = DRIVERS.find((d) => d.vehicle === vehicle);
    if (match) setSelected(match.id);
  }, [vehicle]);

  const onSend = () => {
    nav(`/client/track?driver=${selected}`);
  };

  return (
    <div className="container py-6 md:py-10">
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="icon" onClick={() => nav(-1)} aria-label="Retour">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Sélectionnez votre Livreur</h1>
      </div>

      {/* Recap */}
      <Card className="mt-4 p-4 md:p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-primary/40">
              <VehicleIcon v={vehicle} />
              <span className="ml-2 capitalize">{vehicle}</span>
            </Badge>
            <Separator orientation="vertical" className="h-6" />
            <div className="text-sm text-muted-foreground">Arrivée: <span className="text-foreground font-medium">{to}</span></div>
          </div>
          <div className="text-xs text-muted-foreground">{DRIVERS.length} livreurs trouvés à proximité</div>
        </div>
      </Card>

      {/* Drivers list */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DRIVERS.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelected(d.id)}
            className={cn(
              "text-left rounded-xl border p-4 hover:bg-muted transition relative",
              selected === d.id ? "border-primary" : "border-border"
            )}
            aria-pressed={selected === d.id}
          >
            <div className={cn("absolute inset-0 rounded-xl pointer-events-none", selected === d.id && glowShadow)} />
            <div className="flex items-start gap-3">
              <Avatar className="h-11 w-11">
                <AvatarFallback>{d.name.split(" ")[0][0]}{d.name.split(" ")[1]?.[0] ?? ""}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{d.name}</div>
                  <div className="inline-flex items-center gap-1 text-amber-400">
                    <Star className="h-4 w-4 fill-amber-400" />
                    <span className="text-sm">{d.rating.toFixed(1)}</span>
                    <span className="text-xs text-muted-foreground">({d.reviews})</span>
                  </div>
                </div>
                <div className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
                  <VehicleIcon v={d.vehicle} />
                  <span className="capitalize">{d.vehicle}</span>
                  <span>• {d.distanceKm.toFixed(1)} km</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-base font-semibold">{d.price.toLocaleString()} XOF</div>
                  <Button
                    variant="secondary"
                    onClick={(e) => { e.stopPropagation(); nav(`/client/driver/${d.id}`); }}
                  >
                    Voir Profil
                  </Button>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Primary action */}
      <div className="h-20" />
      <div className="fixed inset-x-0 bottom-0 border-t bg-background/80 backdrop-blur p-4">
        <div className="container">
          <Button className={cn("w-full h-12 text-base font-semibold", glowShadow)} onClick={onSend}>
            Envoyer une Demande
          </Button>
        </div>
      </div>
    </div>
  );
}
