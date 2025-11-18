import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Wallet, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const TX = [
  { id: "t1", date: "2025-10-31 14:12", desc: "Livraison #4021 • Cocody -> Plateau", amount: "+1 800 XOF", status: "Validé" },
  { id: "t2", date: "2025-10-31 11:05", desc: "Livraison #4018 • Yopougon -> Marcory", amount: "+2 200 XOF", status: "Validé" },
  { id: "t3", date: "2025-10-30 17:28", desc: "Retrait vers MTN MoMo", amount: "-4 000 XOF", status: "Retiré" },
  { id: "t4", date: "2025-10-29 09:43", desc: "Livraison #3988 • Adjamé -> Treichville", amount: "+1 400 XOF", status: "En attente" },
];

export default function DriverEarnings() {
  const glow = useMemo(() => "shadow-[0_0_20px_hsl(var(--primary))]", []);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");

  return (
    <div className="container py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Revenus & Retraits</h1>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr,420px]">
        {/* History */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="font-semibold">Historique des transactions</div>
            <div className="mt-3 divide-y">
              {TX.map((t) => (
                <div key={t.id} className="py-3 grid md:grid-cols-[200px,1fr,140px,120px] items-center gap-3 text-sm">
                  <div className="text-muted-foreground">{t.date}</div>
                  <div>{t.desc}</div>
                  <div className={t.amount.startsWith("-") ? "text-destructive" : "text-primary font-semibold"}>{t.amount}</div>
                  <div>
                    <Badge variant="outline" className={cn("border-primary/40", t.status === "En attente" && "border-border")}>{t.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="font-semibold">Soldes</div>
            <div className="mt-3 grid gap-3">
              <div className="rounded-lg border p-3">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Solde disponible</div>
                <div className="text-2xl font-extrabold text-primary">6 200 XOF</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Fonds en séquestre (Escrow)</div>
                <div className="text-lg font-semibold">2 900 XOF</div>
              </div>
            </div>
            <div className="mt-3">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className={glow + " w-full"}>Demander un Retrait</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Demande de Retrait</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-3">
                    <Input placeholder="Montant (XOF)" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <Tabs defaultValue="momo">
                      <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="momo" className="gap-2"><Wallet className="h-4 w-4" /> Mobile Money</TabsTrigger>
                        <TabsTrigger value="card" className="gap-2"><CreditCard className="h-4 w-4" /> Carte</TabsTrigger>
                      </TabsList>
                      <TabsContent value="momo" className="space-y-2">
                        <Input placeholder="Numéro MoMo" />
                        <Input placeholder="Nom du titulaire" />
                      </TabsContent>
                      <TabsContent value="card" className="space-y-2">
                        <Input placeholder="IBAN/Carte" />
                        <Input placeholder="Nom du titulaire" />
                      </TabsContent>
                    </Tabs>
                  </div>
                  <DialogFooter>
                    <Button variant="secondary" onClick={() => setOpen(false)}>Annuler</Button>
                    <Button disabled={!amount} onClick={() => { setOpen(false); toast.success("Demande de retrait envoyée!"); }}>Confirmer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card className="p-4">
            <div className="font-semibold">Résumé</div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
              <Stat label="Aujourd'hui" value="4 000 XOF" />
              <Stat label="Semaine" value="22 800 XOF" />
              <Stat label="Mois" value="91 200 XOF" />
            </div>
          </Card>
        </div>
      </div>
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
