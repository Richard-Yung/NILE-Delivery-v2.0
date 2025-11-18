import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DEV_MODE = import.meta.env.DEV && import.meta.env.VITE_NILE_DEV_MODE === "true";

export default function DevLauncher() {
  if (!DEV_MODE) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-semibold">Dev mode désactivé</h1>
        <p className="text-muted-foreground">Activez VITE_NILE_DEV_MODE=true en développement pour accéder à ce lanceur.</p>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Lanceur de Développement</h1>
      <p className="text-muted-foreground mt-2">Accédez rapidement aux interfaces sans authentification (dev uniquement).</p>
      <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-xl">
        <Button asChild className="h-12">
          <Link to="/client">Interface Client</Link>
        </Button>
        <Button asChild variant="secondary" className="h-12">
          <Link to="/livreur">Tableau de Bord Livreur</Link>
        </Button>
      </div>
    </div>
  );
}
