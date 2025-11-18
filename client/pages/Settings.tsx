import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSession, clearSession } from "@/lib/auth";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function Settings() {
  const session = getSession();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mm, setMm] = useState("");
  const [notifOrders, setNotifOrders] = useState(true);
  const [notifMarketing, setNotifMarketing] = useState(false);
  const [vehicleType, setVehicleType] = useState("moto");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (session) {
      setEmail(session.email);
      setName(session.name || "");
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem("nile_profile", JSON.stringify({ name, email, phone }));
    toast("Profil mis à jour");
  };

  const saveVehicle = () => {
    localStorage.setItem("nile_vehicle", JSON.stringify({ vehicleType, vehicleModel, vehiclePlate }));
    toast("Véhicule enregistré");
  };

  const savePayment = () => {
    localStorage.setItem("nile_payment", JSON.stringify({ mm }));
    toast("Moyen de paiement enregistré");
  };

  const saveNotif = () => {
    localStorage.setItem("nile_notifications", JSON.stringify({ notifOrders, notifMarketing }));
    toast("Préférences notifications enregistrées");
  };

  const deleteAccount = () => {
    localStorage.clear();
    clearSession();
    toast.success("Compte supprimé");
    nav("/");
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Paramètres</h1>
      <p className="text-muted-foreground mt-2">Gérez votre profil, paiements, notifications et sécurité.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 grid gap-4">
          <div className="font-semibold">Profil</div>
          <div className="grid gap-3">
            <div>
              <Label>Nom</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            </div>
            <div>
              <Label>Téléphone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Numéro" />
            </div>
          </div>
          <div className="flex justify-end"><Button onClick={saveProfile}>Enregistrer</Button></div>
        </Card>

        <Card className="p-6 grid gap-4">
          <div className="font-semibold">Notifications</div>
          <div className="flex items-center justify-between">
            <div>
              <div>Suivi de commandes</div>
              <div className="text-sm text-muted-foreground">Notifications pour demandes/états</div>
            </div>
            <Switch checked={notifOrders} onCheckedChange={setNotifOrders} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div>Marketing</div>
              <div className="text-sm text-muted-foreground">Promotions et nouveautés</div>
            </div>
            <Switch checked={notifMarketing} onCheckedChange={setNotifMarketing} />
          </div>
          <div className="flex justify-end"><Button variant="secondary" onClick={saveNotif}>Enregistrer</Button></div>
        </Card>

        <Card className="p-6 grid gap-4">
          <div className="font-semibold">Paiements</div>
          <div>
            <Label>Mobile Money</Label>
            <Input value={mm} onChange={(e) => setMm(e.target.value)} placeholder="Numéro MoMo" />
          </div>
          <div className="flex justify-end"><Button variant="secondary" onClick={savePayment}>Enregistrer</Button></div>
        </Card>

        {session?.role === "livreur" && (
          <Card className="p-6 grid gap-4">
            <div className="font-semibold">Véhicule</div>
            <div className="grid gap-3">
              <div>
                <Label>Type</Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moto">Moto</SelectItem>
                    <SelectItem value="voiture">Voiture</SelectItem>
                    <SelectItem value="velo">Vélo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Modèle</Label>
                <Input value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} placeholder="Ex: Yamaha 125" />
              </div>
              <div>
                <Label>Immatriculation</Label>
                <Input value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} placeholder="AA-123-BB" />
              </div>
            </div>
            <div className="flex justify-end"><Button onClick={saveVehicle}>Enregistrer</Button></div>
          </Card>
        )}

        <Card className="p-6 grid gap-4">
          <div className="font-semibold">Apparence</div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">Mode clair/sombre</span>
          </div>
        </Card>

        <Card className="p-6 grid gap-4">
          <div className="font-semibold">Sécurité</div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <Label>Nouveau mot de passe</Label>
              <Input type="password" placeholder="••••••" />
            </div>
            <div>
              <Label>Confirmer</Label>
              <Input type="password" placeholder="••••••" />
            </div>
          </div>
          <div className="flex justify-end"><Button variant="secondary">Mettre à jour</Button></div>
        </Card>

        <Card className="p-6 grid gap-4 border-destructive/30 bg-destructive/5 lg:col-span-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div className="font-semibold text-destructive">Zone Dangereuse</div>
          </div>
          <div className="text-sm text-muted-foreground">
            Cette action est irréversible. Tous vos données seront supprimées de manière permanente.
          </div>
          <div className="flex justify-end">
            <Button
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              Supprimer mon compte
            </Button>
          </div>
        </Card>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer mon compte ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Tous vos données, historique de courses et paramètres seront supprimés définitivement. Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer mon compte
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
