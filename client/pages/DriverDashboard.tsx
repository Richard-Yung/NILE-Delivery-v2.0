import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, ArrowRight, Phone, MessageCircle, DollarSign, CheckCircle2, AlertCircle, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { MotoIcon, CarIcon, BikeIcon } from "@/components/icons/vehicle";
import { toast } from "sonner";

interface Request {
  id: string;
  from: string;
  to: string;
  distance: string;
  eta: string;
  pay: string;
  vehicle: "moto" | "voiture" | "velo";
  urgency: string;
}

interface AcceptedRequest extends Request {
  clientName: string;
  clientPhone: string;
  package: string;
  packageWeight: string;
  packageSize: string;
  status: string;
  progress: number;
}

const SAMPLE_REQUESTS: Request[] = [
  {
    id: "r1",
    from: "Plateau, Abidjan",
    to: "Yopougon SIPOREX",
    distance: "6.4 km",
    eta: "18 min",
    pay: "2 800 XOF",
    vehicle: "moto",
    urgency: "Nouvelle",
  },
  {
    id: "r2",
    from: "Marcory Zone 4",
    to: "Cocody Angré",
    distance: "11.2 km",
    eta: "30 min",
    pay: "4 400 XOF",
    vehicle: "voiture",
    urgency: "Prioritaire",
  },
  {
    id: "r3",
    from: "Treichville",
    to: "Adjame",
    distance: "3.0 km",
    eta: "10 min",
    pay: "1 700 XOF",
    vehicle: "velo",
    urgency: "Nouvelle",
  },
];

const CLIENT_INFO = {
  r1: {
    clientName: "Jean P",
    clientPhone: "+225 07 12 34 56",
    package: "Documents importants",
    packageWeight: "0.5 kg",
    packageSize: "Petit",
  },
  r2: {
    clientName: "Marie D",
    clientPhone: "+225 07 87 65 43",
    package: "Colis fragile",
    packageWeight: "2.5 kg",
    packageSize: "Moyen",
  },
  r3: {
    clientName: "Pierre K",
    clientPhone: "+225 07 56 78 90",
    package: "Document/Lettre",
    packageWeight: "0.2 kg",
    packageSize: "Petit",
  },
};

type Vehicle = "moto" | "voiture" | "velo";

function VIcon({ v }: { v: Vehicle }) {
  if (v === "moto") return <MotoIcon className="h-4 w-4" />;
  if (v === "voiture") return <CarIcon className="h-4 w-4" />;
  return <BikeIcon className="h-4 w-4" />;
}

export default function DriverDashboard() {
  const nav = useNavigate();
  const [available, setAvailable] = useState(true);
  const [requests, setRequests] = useState(SAMPLE_REQUESTS);
  const [acceptedRequests, setAcceptedRequests] = useState<AcceptedRequest[]>([]);
  const glow = useMemo(() => "shadow-[0_0_20px_hsl(var(--primary))]", []);

  const accept = (request: Request) => {
    const clientData = CLIENT_INFO[request.id as keyof typeof CLIENT_INFO] || {
      clientName: "Client",
      clientPhone: "+225 00 00 00 00",
      package: "Colis",
      packageWeight: "0 kg",
      packageSize: "Petit",
    };

    const acceptedRequest: AcceptedRequest = {
      ...request,
      ...clientData,
      status: "en_cours",
      progress: 45,
    };

    setAcceptedRequests([acceptedRequest, ...acceptedRequests]);
    setRequests(r => r.filter(x => x.id !== request.id));
  };

  const decline = (id: string) => setRequests(r => r.filter(x => x.id !== id));

  return (
    <div className="container py-6 md:py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Tableau de Bord Livreur</h1>
          <p className="text-sm text-muted-foreground mt-1">Acceptez des courses, suivez vos revenus et gérez votre statut</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Statut</span>
          <div className={cn("flex items-center gap-2 rounded-full border px-3 py-1.5", available ? "border-primary" : "border-border")}>
            <Switch checked={available} onCheckedChange={setAvailable} id="avail" />
            <label htmlFor="avail" className={cn("text-sm font-semibold", available ? "text-primary" : "text-muted-foreground")}>
              {available ? "Disponible" : "Indisponible"}
            </label>
          </div>
        </div>
      </div>

      {/* Courses en cours */}
      {acceptedRequests.length > 0 && (
        <div className="mb-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            Courses en cours ({acceptedRequests.length})
          </h2>
          <div className="space-y-4">
            {acceptedRequests.map((course) => (
              <Card key={course.id} className="p-4 border-primary/30 bg-primary/5 space-y-4">
                {/* Client header with progress */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{course.clientName}</h3>
                    <p className="text-xs text-muted-foreground">{course.clientPhone}</p>
                  </div>
                  <Badge variant="outline" className="border-primary">En cours</Badge>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted-foreground">Progression</p>
                    <p className="text-xs font-semibold">{course.progress}%</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>

                {/* Trajet et détails */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Départ</p>
                    <p className="text-foreground">{course.from}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Arrivée</p>
                    <p className="text-foreground">{course.to}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Colis</p>
                    <p className="text-foreground">{course.package}</p>
                    <p className="text-xs text-muted-foreground">Poids: {course.packageWeight} • Taille: {course.packageSize}</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" className="flex-1 inline-flex items-center justify-center gap-2" onClick={() => toast.success("Localisation activée")}>
                    <MapPin className="h-4 w-4" />
                    Localiser
                  </Button>
                  <Button variant="outline" className="flex-1 inline-flex items-center justify-center gap-2" onClick={() => nav("/livreur/messages")}>
                    <MessageCircle className="h-4 w-4" />
                    Message
                  </Button>
                  <Button className={cn("flex-1", glow)} onClick={() => toast.success("Course marquée comme livrée!")}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Livré
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Demandes disponibles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Demandes disponibles</h2>
          <p className="text-xs text-muted-foreground">Acceptez un offrant smart sauf qu'd'autres livreurs ne l'emprunte</p>
        </div>

        {requests.length === 0 ? (
          <Card className="p-6 text-center">
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Aucune demande disponible pour le moment</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id} className="p-4 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-primary/40">
                      {request.urgency}
                    </Badge>
                    <Badge variant="outline" className="border-primary/40 inline-flex items-center gap-1">
                      <VIcon v={request.vehicle} />
                      <span className="capitalize">{request.vehicle}</span>
                    </Badge>
                  </div>
                  <Badge variant="outline" className="border-primary/40 inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {request.eta}
                  </Badge>
                </div>

                {/* Route details */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Départ</p>
                      <p className="text-foreground font-medium">{request.from}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Arrivée</p>
                      <p className="text-foreground font-medium">{request.to}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground ml-6">Distance: {request.distance}</p>
                </div>

                {/* Détails du colis */}
                <div className="border-t pt-3 space-y-2">
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    Détails du colis
                  </p>
                  <div className="ml-6 space-y-1 text-sm">
                    {CLIENT_INFO[request.id as keyof typeof CLIENT_INFO] && (
                      <>
                        <p><span className="text-muted-foreground">Type:</span> <span className="font-medium">{CLIENT_INFO[request.id as keyof typeof CLIENT_INFO].package}</span></p>
                        <p><span className="text-muted-foreground">Poids:</span> <span className="font-medium">{CLIENT_INFO[request.id as keyof typeof CLIENT_INFO].packageWeight}</span></p>
                      </>
                    )}
                  </div>
                </div>

                {/* Footer with price and buttons */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">Gain estimé:</p>
                    <p className="text-lg font-bold text-primary">{request.pay}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => decline(request.id)}>
                      Refuser
                    </Button>
                    <Button className={glow} onClick={() => accept(request)}>
                      Accepter
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr,350px]">
        <div />
        <div className="space-y-4">
          {/* Position */}
          <Card className="p-4">
            <div className="font-semibold mb-3">Votre position</div>
            <div className="relative rounded-lg border bg-card overflow-hidden h-48">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(24_14%_10%)_0,transparent_35%),radial-gradient(circle_at_70%_70%,hsl(24_14%_12%)_0,transparent_35%)]" />
              <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:40px_40px]" />
              <div className="absolute left-[40%] top-[48%]">
                <span className={cn("block h-3 w-3 rounded-full bg-primary", glow)} />
                <span className="mt-1 inline-block rounded bg-background/70 px-2 py-0.5 text-xs">Vous</span>
              </div>
            </div>
          </Card>

          {/* Raccourcis */}
          <Card className="p-4">
            <div className="font-semibold mb-3">Raccourcis</div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-20 gap-2"
                onClick={() => nav("/livreur/revenus")}
              >
                <DollarSign className="h-5 w-5" />
                <span className="text-xs text-center">Revenus</span>
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
                onClick={() => nav("/support")}
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs text-center">Support</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-20 gap-2"
                onClick={() => nav("/settings")}
              >
                <Settings className="h-5 w-5" />
                <span className="text-xs text-center">Paramètres</span>
              </Button>
            </div>
          </Card>

          {/* Contacts */}
          <Card className="p-4">
            <div className="font-semibold mb-3">Contact Client</div>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full inline-flex items-center gap-2" onClick={() => toast.success("Appel en cours…")}>
                <Phone className="h-4 w-4" />
                Appeler
              </Button>
              <Button variant="secondary" className="w-full inline-flex items-center gap-2" onClick={() => nav("/livreur/messages")}>
                <MessageCircle className="h-4 w-4" />
                Message
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
