import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setSession } from "@/lib/auth";
import { ShoppingCart, Truck } from "lucide-react";

export default function Auth() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const initialRole = params.get("role") ?? "client";
  const [role, setRole] = useState<"client" | "livreur">(initialRole as "client" | "livreur");
  const [tab, setTab] = useState<"signin" | "signup">(params.get("tab") as "signin" | "signup" || "signin");

  useEffect(() => {
    const newParams = new URLSearchParams(params);
    newParams.set("role", role);
    newParams.set("tab", tab);
    setParams(newParams, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, tab]);

  const go = () => {
    const email = (document.getElementById("email") as HTMLInputElement | null)?.value || "user@example.com";
    const name = role === "livreur" ? "Livreur" : "Client";
    setSession({ role: role as any, email, name });
    const dest = role === "livreur" ? "/livreur" : "/client";
    navigate(dest);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Role selector - TOP */}
      <div className="container py-6">
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* CLIENT */}
          <button
            onClick={() => setRole("client")}
            className={`relative p-6 rounded-lg border-2 transition ${
              role === "client"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                role === "client" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              }`}>
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Je suis Client</div>
                <div className="text-xs text-muted-foreground">Commandez des livraisons</div>
              </div>
            </div>
          </button>

          {/* LIVREUR */}
          <button
            onClick={() => setRole("livreur")}
            className={`relative p-6 rounded-lg border-2 transition ${
              role === "livreur"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                role === "livreur" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              }`}>
                <Truck className="h-6 w-6" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Je suis Livreur</div>
                <div className="text-xs text-muted-foreground">Acceptez des courses et gagnez</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Auth content */}
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              {role === "client" ? (
                <>
                  <CardTitle className="text-2xl">Bienvenue Client</CardTitle>
                  <CardDescription>
                    {tab === "signin"
                      ? "Connectez-vous à votre compte pour commander des livraisons"
                      : "Créez un compte pour commencer à commander des livraisons"}
                  </CardDescription>
                </>
              ) : (
                <>
                  <CardTitle className="text-2xl">Bienvenue Livreur</CardTitle>
                  <CardDescription>
                    {tab === "signin"
                      ? "Connectez-vous à votre tableau de bord pour accepter des courses"
                      : "Créez un compte et devenez livreur"}
                  </CardDescription>
                </>
              )}
            </CardHeader>

            <CardContent>
              <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Connexion</TabsTrigger>
                  <TabsTrigger value="signup">
                    {role === "livreur" ? (
                      <span>Postuler</span>
                    ) : (
                      <span>Inscription</span>
                    )}
                  </TabsTrigger>
                </TabsList>

                {/* Sign In */}
                <TabsContent value="signin" className="space-y-4">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      go();
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="vous@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button type="submit" className="w-full">
                        Se connecter
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        className="w-full"
                        onClick={go}
                      >
                        <GoogleIcon className="h-4 w-4 mr-2" />
                        Google
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      Mot de passe oublié? (à implémenter)
                    </div>
                  </form>
                </TabsContent>

                {/* Sign Up */}
                <TabsContent value="signup" className="space-y-4">
                  {role === "livreur" ? (
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-sm text-foreground">
                        L'inscription livreur nécessite des documents de vérification.
                      </p>
                      <Button
                        className="w-full mt-3"
                        onClick={() => navigate("/livreur/apply")}
                      >
                        <Truck className="h-4 w-4 mr-2" />
                        Commencer votre application
                      </Button>
                    </div>
                  ) : (
                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        go();
                      }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="email-signup">Email</Label>
                        <Input
                          id="email-signup"
                          type="email"
                          placeholder="vous@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone (optionnel)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+225 07 12 34 56"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="password-signup">Mot de passe</Label>
                          <Input
                            id="password-signup"
                            type="password"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm">Confirmer</Label>
                          <Input
                            id="confirm"
                            type="password"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Button type="submit" className="w-full">
                          Créer mon compte
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          className="w-full"
                          onClick={go}
                        >
                          <GoogleIcon className="h-4 w-4 mr-2" />
                          Google
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        En poursuivant, vous acceptez nos conditions et notre
                        politique de confidentialité.
                      </div>
                    </form>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Info text */}
          <div className="mt-6 text-center text-xs text-muted-foreground">
            Email/Mot de passe ou Google (Téléphone optionnel)
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.95h5.59c-.24 1.27-1.69 3.72-5.59 3.72-3.36 0-6.11-2.78-6.11-6.22S8.64 5.43 12 5.43c1.92 0 3.22.82 3.96 1.53l2.7-2.6C17.28 2.6 14.86 1.6 12 1.6 6.94 1.6 2.8 5.74 2.8 10.8S6.94 20 12 20c6.93 0 9.2-4.85 9.2-7.33 0-.49-.05-.86-.11-1.23H12z"
      />
    </svg>
  );
}
