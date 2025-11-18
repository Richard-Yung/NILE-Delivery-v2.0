import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, CreditCard, Wallet, MapPin } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ClientTrackPay() {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const [paid, setPaid] = useState(false);
  const glowShadow = useMemo(() => "shadow-[0_0_20px_hsl(var(--primary))]", []);

  const driver = params.get("driver") || "d1";

  const onPay = () => setPaid(true);

  return (
    <div className="container py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Suivi de Commande & Paiement</h1>

      {/* Map & status */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr,420px]">
        {/* Simulated route map */}
        <div className="relative rounded-xl border bg-card overflow-hidden min-h-[420px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(24_14%_10%)_0,transparent_35%),radial-gradient(circle_at_70%_70%,hsl(24_14%_12%)_0,transparent_35%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:40px_40px]" />
          {/* Start */}
          <div className="absolute left-[18%] top-[68%] flex items-center gap-2">
            <span className="block h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/30" />
            <span className="text-xs bg-background/70 rounded px-2 py-0.5">Départ</span>
          </div>
          {/* End */}
          <div className="absolute right-[12%] top-[22%] flex items-center gap-2">
            <span className="text-xs bg-background/70 rounded px-2 py-0.5">Arrivée</span>
            <span className="block h-3 w-3 rounded-full bg-rose-500 ring-4 ring-rose-500/30" />
          </div>
          {/* Route line */}
          <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M18,68 Q40,40 88,22" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeDasharray="4 3" />
          </svg>
          {/* Driver dot */}
          <div className="absolute left-[42%] top-[50%]">
            <span className={cn("block h-3 w-3 rounded-full bg-primary", glowShadow)} />
            <span className="mt-1 inline-block rounded bg-background/70 px-2 py-0.5 text-xs">Livreur</span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="font-semibold">Statut de la course</div>
            <div className="mt-3 grid gap-3">
              <Status label="Demande envoyée" value={100} />
              <Status label="Livreur en route" value={70} />
              <Status label="Livraison" value={paid ? 100 : 20} />
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> ID Livreur: <span className="text-foreground">{driver}</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="font-semibold">Paiement</div>
            <Tabs defaultValue="momo" className="mt-3">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="momo" className="gap-2"><Wallet className="h-4 w-4" /> Mobile Money</TabsTrigger>
                <TabsTrigger value="card" className="gap-2"><CreditCard className="h-4 w-4" /> Carte</TabsTrigger>
              </TabsList>
              <TabsContent value="momo" className="space-y-3">
                <Input placeholder="Numéro Mobile Money" />
                <Input placeholder="Nom du titulaire" />
                <Button className="w-full" onClick={onPay}>Payer maintenant</Button>
              </TabsContent>
              <TabsContent value="card" className="space-y-3">
                <Input placeholder="Numéro de carte" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="MM/AA" />
                  <Input placeholder="CVC" />
                </div>
                <Button className="w-full" onClick={onPay}>Payer maintenant</Button>
              </TabsContent>
            </Tabs>
          </Card>

          <Card className="p-4">
            <div className="font-semibold">Récapitulatif</div>
            <div className="mt-3 space-y-2 text-sm">
              <Row k="Distance" v="3.2 km" />
              <Row k="Temps estimé" v="12 min" />
              <Separator />
              <Row k="Sous-total" v="3 000 XOF" />
              <Row k="Frais" v="500 XOF" />
              <Separator />
              <Row k="Total" v="3 500 XOF" strong />
            </div>
          </Card>

          <div className="flex items-center gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => nav(-1)}>
              Annuler
            </Button>
            <Button className={cn("flex-1", glowShadow)} onClick={() => nav("/client/confirm")}>Confirmer la réception</Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex-1" onClick={() => toast.success("Appel en cours…")}> <Phone className="h-4 w-4 mr-2" /> Contacter</Button>
            <Button variant="outline" className="flex-1" onClick={() => nav("/client/messages")}> <MessageCircle className="h-4 w-4 mr-2" /> Message</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <span>{label}</span>
        <Badge variant="outline" className="border-primary/40">{value}%</Badge>
      </div>
      <Progress value={value} />
    </div>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className={strong ? "font-semibold" : ""}>{v}</span>
    </div>
  );
}
