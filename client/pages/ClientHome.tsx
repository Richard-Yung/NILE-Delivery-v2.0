import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Bike, Car, MapPin, MessageCircle, HeadsetIcon, User, Settings } from "lucide-react";
import { MotoIcon } from "@/components/icons/vehicle";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const VEHICLES = [
  { key: "moto", label: "Moto", icon: MotoIcon },
  { key: "voiture", label: "Voiture", icon: Car },
  { key: "velo", label: "Vélo", icon: Bike },
] as const;

type VehicleKey = typeof VEHICLES[number]["key"];

export default function ClientHome() {
  const nav = useNavigate();
  const [vehicle, setVehicle] = useState<VehicleKey>("moto");
  const [depart, setDepart] = useState("Votre adresse actuelle");
  const [arrivee, setArrivee] = useState("Entrez une destination");
  const [packageType, setPackageType] = useState("petit");
  const [packageWeight, setPackageWeight] = useState("");
  const [packageLength, setPackageLength] = useState("");
  const [packageWidth, setPackageWidth] = useState("");
  const [packageHeight, setPackageHeight] = useState("");
  const [packageFragile, setPackageFragile] = useState(false);
  const [packageNotes, setPackageNotes] = useState("");

  const glowShadow = useMemo(() => "shadow-[0_0_20px_hsl(var(--primary))]", []);

  const onFind = () => {
    const params = new URLSearchParams();
    params.set("vehicle", vehicle);
    if (arrivee.trim() && arrivee !== "Entrez une destination") params.set("to", arrivee.trim());
    nav(`/client/select?${params.toString()}`);
  };

  return (
    <div className="container py-6 md:py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Accueil Client</h1>
          <p className="text-sm text-muted-foreground mt-1">Trouvez et commandez une livraison en quelques secondes</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Géolocalisation active</span>
        </div>
      </div>

      {/* Raccourcis en haut */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-20 gap-2"
          onClick={() => nav("/support")}
        >
          <HeadsetIcon className="h-5 w-5" />
          <span className="text-xs text-center">Support</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-20 gap-2"
          onClick={() => nav("/settings")}
        >
          <User className="h-5 w-5" />
          <span className="text-xs text-center">Profil</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-20 gap-2"
          onClick={() => nav("/settings")}
        >
          <Settings className="h-5 w-5" />
          <span className="text-xs text-center">Ressources</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-20 gap-2"
          onClick={() => nav("/client/messages")}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs text-center">Messages</span>
        </Button>
      </div>

      {/* Map Section */}
      <div className="mt-6 relative rounded-xl border bg-card overflow-hidden mb-6">
        <div className="h-64 md:h-80 bg-[radial-gradient(circle_at_20%_20%,hsl(24_14%_10%)_0,transparent_35%),radial-gradient(circle_at_80%_60%,hsl(24_14%_12%)_0,transparent_35%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:40px_40px]" />
        
        {/* Client position (orange pin) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={cn("rounded-full bg-primary", glowShadow)}>
            <span className="block h-3 w-3 rounded-full bg-primary" />
          </div>
          <span className="mt-1 inline-block rounded bg-background/70 px-2 py-0.5 text-xs whitespace-nowrap">Votre position</span>
        </div>

        {/* Map controls */}
        <div className="absolute right-3 bottom-3 flex flex-col gap-1">
          <button className="h-8 w-8 rounded-md border bg-background/90 backdrop-blur flex items-center justify-center text-xs">+</button>
          <button className="h-8 w-8 rounded-md border bg-background/90 backdrop-blur flex items-center justify-center text-xs">−</button>
          <button className="h-8 w-8 rounded-md border bg-background/90 backdrop-blur flex items-center justify-center text-xs">⌂</button>
        </div>
      </div>

      {/* Détails du colis Section */}
      <Card className="p-6 mb-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Détails du colis</div>
          <button className="text-xs text-primary hover:underline">Obligatoire</button>
        </div>

        <div className="space-y-4">
          {/* Description */}
          <div>
            <Label className="text-sm font-semibold">Détails du colis</Label>
            <p className="text-xs text-muted-foreground mb-2">Fournissez les informations de votre colis pour un meilleur matching avec les livreurs</p>
            <Textarea
              value={packageNotes}
              onChange={(e) => setPackageNotes(e.target.value)}
              placeholder="Ex: Cadeau à frais, Emballage à l'ombre, Manipuler avec soin..."
              className="min-h-[80px]"
            />
          </div>

          {/* Package Type */}
          <div>
            <Label htmlFor="pkg-type" className="text-sm font-semibold">Type de colis</Label>
            <select
              id="pkg-type"
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              className="w-full mt-2 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="petit">Petit colis (5kg max)</option>
              <option value="moyen">Moyen colis (5-20kg)</option>
              <option value="grand">Grand colis (20kg plus)</option>
            </select>
          </div>

          {/* Weight */}
          <div>
            <Label htmlFor="pkg-weight" className="text-sm font-semibold">Poids (kg)</Label>
            <Input
              id="pkg-weight"
              type="number"
              value={packageWeight}
              onChange={(e) => setPackageWeight(e.target.value)}
              placeholder="0"
              className="mt-2"
            />
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="length" className="text-sm font-semibold">Longeur (cm)</Label>
              <Input
                id="length"
                type="number"
                value={packageLength}
                onChange={(e) => setPackageLength(e.target.value)}
                placeholder="0"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="width" className="text-sm font-semibold">Largeur (cm)</Label>
              <Input
                id="width"
                type="number"
                value={packageWidth}
                onChange={(e) => setPackageWidth(e.target.value)}
                placeholder="0"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-sm font-semibold">Hauteur (cm)</Label>
              <Input
                id="height"
                type="number"
                value={packageHeight}
                onChange={(e) => setPackageHeight(e.target.value)}
                placeholder="0"
                className="mt-2"
              />
            </div>
          </div>

          {/* Fragile toggle */}
          <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
            <Switch
              id="fragile"
              checked={packageFragile}
              onCheckedChange={setPackageFragile}
            />
            <Label htmlFor="fragile" className="text-sm font-semibold cursor-pointer">Colis fragile</Label>
          </div>

          {/* Additional notes */}
          <div>
            <Label htmlFor="notes" className="text-sm font-semibold">Notes supplémentaires</Label>
            <p className="text-xs text-muted-foreground mb-2">Ex: Cadeau au frais, Emballage à l'ombre, Manipuler avec soin...</p>
            <Textarea
              id="notes"
              value={packageNotes}
              onChange={(e) => setPackageNotes(e.target.value)}
              placeholder="Ajoutez vos instructions spéciales..."
              className="min-h-[60px]"
            />
          </div>
        </div>
      </Card>

      {/* Départ/Arrivée Section */}
      <Card className="p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-2 block">Départ</Label>
            <Input
              value={depart}
              onChange={(e) => setDepart(e.target.value)}
              placeholder="Votre adresse actuelle"
              className="text-sm"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-2 block">Arrivée</Label>
            <Input
              value={arrivee}
              onChange={(e) => setArrivee(e.target.value)}
              placeholder="Entrez une destination"
              className="text-sm"
            />
          </div>
        </div>

        {/* Vehicle selection and estimates */}
        <div className="flex items-center justify-between flex-wrap gap-3 border-t pt-4">
          <div className="flex items-center gap-2">
            {VEHICLES.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setVehicle(key)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition",
                  key === vehicle && "border-primary bg-primary/10 text-foreground",
                  key === vehicle && glowShadow
                )}
                aria-pressed={vehicle === key}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-primary/40 text-xs">Temps moyen: ~4 min</Badge>
            <Badge variant="outline" className="border-primary/40 text-xs">Tarif dès 500 XOF</Badge>
          </div>
        </div>

        {/* Find button */}
        <Button
          size="lg"
          className={cn("w-full h-12 text-base font-semibold", glowShadow)}
          onClick={onFind}
        >
          Trouver un Livreur
        </Button>
      </Card>
    </div>
  );
}
