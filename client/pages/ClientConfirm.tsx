import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export default function ClientConfirm() {
  const nav = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const submit = () => {
    // Persist to API in future
    nav("/client");
  };

  return (
    <div className="container py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Validation Post-Livraison</h1>

      <Card className="mt-6 p-6 max-w-2xl">
        <div className="text-sm text-muted-foreground">Votre commande a été livrée. Merci d'évaluer le service du livreur.</div>

        <div className="mt-4 flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => {
            const idx = i + 1;
            const active = (hover ?? rating) >= idx;
            return (
              <button
                key={idx}
                aria-label={`star-${idx}`}
                onClick={() => setRating(idx)}
                onMouseEnter={() => setHover(idx)}
                onMouseLeave={() => setHover(null)}
                className="h-10 w-10"
              >
                <Star className={`h-10 w-10 ${active ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <Textarea placeholder="Laissez un commentaire (optionnel)" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button className="flex-1" onClick={submit}>Confirmer la réception</Button>
          <Button variant="secondary" className="flex-1" onClick={submit}>Soumettre l'avis</Button>
        </div>
      </Card>
    </div>
  );
}
