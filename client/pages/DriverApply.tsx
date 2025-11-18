import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Camera, FileUp, ArrowLeft, CheckCircle2, Hourglass } from "lucide-react";
import { cn } from "@/lib/utils";
import { setSession } from "@/lib/auth";

export default function DriverApply() {
  const nav = useNavigate();
  const glow = useMemo(() => "shadow-[0_0_20px_hsl(var(--primary))]", []);

  // Personal info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cc, setCc] = useState("+225");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  // Documents
  const [idDoc, setIdDoc] = useState<File | null>(null);
  const [licenseDoc, setLicenseDoc] = useState<File | null>(null);
  const [vehicleDoc, setVehicleDoc] = useState<File | null>(null);

  // Submitted
  const [submitted, setSubmitted] = useState(false);

  const emailValid = /.+@.+\..+/.test(email);
  const pwdValid = pwd.length >= 6 && /[0-9]/.test(pwd);
  const pwdMatch = pwd && pwd === pwd2;

  const canContinue = firstName && lastName && emailValid && phone.length >= 6 && pwdValid && pwdMatch;
  const canSubmit = !!(idDoc && licenseDoc && vehicleDoc);

  const submit = () => {
    setSession({ role: "livreur", email: email || "livreur@nile.app", name: `${firstName} ${lastName}`.trim() || "Livreur" });
    setSubmitted(true);
  };

  return (
    <div className="container py-6 md:py-10">
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="icon" onClick={() => nav(-1)} aria-label="Retour">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Devenez Livreur NILE</h1>
          <p className="text-muted-foreground">Sécurité et Confiance au cœur de chaque livraison.</p>
        </div>
      </div>

      {/* Personal info */}
      <Card className="mt-6 p-6 grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="last">Nom</Label>
            <Input id="last" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Ex: Yao" />
          </div>
          <div>
            <Label htmlFor="first">Prénom</Label>
            <Input id="first" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Ex: Koffi" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Adresse Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.com" className={cn(email && !emailValid && "border-destructive")} />
            {email && !emailValid && <p className="mt-1 text-xs text-destructive">Email invalide</p>}
          </div>
          <div>
            <Label>Téléphone</Label>
            <div className="flex gap-2">
              <Select value={cc} onValueChange={setCc}>
                <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="+225">+225</SelectItem>
                  <SelectItem value="+221">+221</SelectItem>
                  <SelectItem value="+223">+223</SelectItem>
                  <SelectItem value="+237">+237</SelectItem>
                </SelectContent>
              </Select>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Numéro" />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Label htmlFor="pwd">Créer un mot de passe</Label>
            <Input id="pwd" type={showPwd ? "text" : "password"} value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="••••••" className={cn(pwd && !pwdValid && "border-destructive")} />
            <button type="button" aria-label="toggle" onClick={() => setShowPwd((s) => !s)} className="absolute right-2 bottom-2.5 text-muted-foreground">
              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            {pwd && !pwdValid && <p className="mt-1 text-xs text-destructive">6+ caractères, inclure un chiffre</p>}
          </div>
          <div className="relative">
            <Label htmlFor="pwd2">Confirmer le mot de passe</Label>
            <Input id="pwd2" type={showPwd2 ? "text" : "password"} value={pwd2} onChange={(e) => setPwd2(e.target.value)} placeholder="••••••" className={cn(pwd2 && !pwdMatch && "border-destructive")} />
            <button type="button" aria-label="toggle2" onClick={() => setShowPwd2((s) => !s)} className="absolute right-2 bottom-2.5 text-muted-foreground">
              {showPwd2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            {pwd2 && !pwdMatch && <p className="mt-1 text-xs text-destructive">Les mots de passe ne correspondent pas</p>}
          </div>
        </div>
        <div className="flex justify-end">
          <Button disabled={!canContinue}>Continuer</Button>
        </div>
      </Card>

      {/* Documents */}
      <Card className="mt-6 p-6 grid gap-6">
        <div>
          <div className="font-semibold text-lg">Vérification des documents</div>
          <p className="text-sm text-muted-foreground">Téléchargez les documents pour la vérification de votre profil.</p>
        </div>

        <UploadRow
          label="Pièce d'identité (CNI ou Passeport)"
          help="Photo nette, informations lisibles"
          file={idDoc}
          onChange={setIdDoc}
        />
        <UploadRow
          label="Permis de conduire"
          help="Recto/verso accepté"
          file={licenseDoc}
          onChange={setLicenseDoc}
        />
        <UploadRow
          label="Photo du véhicule"
          help="Véhicule entier, plaques visibles"
          file={vehicleDoc}
          onChange={setVehicleDoc}
        />

        <div className="flex flex-col gap-3">
          <Button disabled={!canContinue || !canSubmit} className={cn(!canContinue || !canSubmit ? "" : glow)} onClick={submit}>
            Soumettre ma Candidature
          </Button>
          <p className="text-xs text-muted-foreground">En soumettant, vous acceptez nos <a className="text-primary underline" href="#">Conditions Générales</a> et <a className="text-primary underline" href="#">Politique de Confidentialité</a>.</p>
        </div>
      </Card>

      {/* Status after submission */}
      {submitted && (
        <Card className="mt-6 p-6 flex items-start gap-3">
          <Hourglass className="h-5 w-5 text-primary" />
          <div>
            <div className="font-semibold">Votre candidature est en cours de vérification</div>
            <p className="text-sm text-muted-foreground">Vous recevrez une notification dans les 24–48h.</p>
          </div>
        </Card>
      )}
    </div>
  );
}

type UploadRowProps = {
  label: string;
  help?: string;
  file: File | null;
  onChange: (f: File | null) => void;
};

function UploadRow({ label, help, file, onChange }: UploadRowProps) {
  const id = label.replace(/\W+/g, "-").toLowerCase();
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {help && <p className="text-xs text-muted-foreground">{help}</p>}
      <label
        htmlFor={id}
        className={cn(
          "mt-1 flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/50 bg-card/60 px-4 py-10 text-sm hover:bg-muted cursor-pointer"
        )}
      >
        {file ? (
          <span className="inline-flex items-center gap-2 text-emerald-400"><CheckCircle2 className="h-4 w-4" /> Document ajouté: <span className="text-foreground">{file.name}</span></span>
        ) : (
          <span className="inline-flex items-center gap-2 text-muted-foreground"><Camera className="h-5 w-5" /> Appuyer pour téléverser</span>
        )}
      </label>
      <input id={id} type="file" className="hidden" onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
    </div>
  );
}
