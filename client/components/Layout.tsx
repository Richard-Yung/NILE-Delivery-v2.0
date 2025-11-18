import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { getSession, clearSession } from "@/lib/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const DEV_MODE = import.meta.env.DEV && import.meta.env.VITE_NILE_DEV_MODE === "true";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {DEV_MODE && (
        <div className="w-full bg-amber-500 text-black text-sm text-center py-1">
          Mode Dev actif • <a className="underline" href="/__dev">Ouvrir le lanceur</a>
        </div>
      )}
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const isClient = location.pathname.startsWith("/client");
  const [session, setSession] = useState(getSession());
  useEffect(() => {
    setSession(getSession());
    const apply = () => setSession(getSession());
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === "nile_session") apply();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("nile_session", apply as any);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("nile_session", apply as any);
    };
  }, []);

  const logout = () => {
    clearSession();
    setSession(null);
    navigate("/");
  };

  return (
    <header className={cn("sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur", !isHome && "bg-background/95")}>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-7 w-auto" />
          <span className="sr-only">NILE</span>
        </Link>
        {session ? (
          <nav className="flex items-center gap-2">
            {isClient && (
              <>
                <button aria-label="Informations" className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-card hover:bg-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                </button>
                <button aria-label="Notifications" className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border bg-card hover:bg-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 5 3 9H3c0-4 3-2 3-9"></path><path d="M10.3 21a1.7 1.7 0 0 0 3.4 0"></path></svg>
                  <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_theme(colors.primary.DEFAULT)]"></span>
                </button>
              </>
            )}
            <UserMenu onLogout={logout} role={session.role} onGo={(path) => navigate(path)} />
            <ThemeToggle />
          </nav>
        ) : isClient ? (
          <nav className="flex items-center gap-2">
            <button aria-label="Informations" className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-card hover:bg-muted">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            </button>
            <button aria-label="Notifications" className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border bg-card hover:bg-muted">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 5 3 9H3c0-4 3-2 3-9"></path><path d="M10.3 21a1.7 1.7 0 0 0 3.4 0"></path></svg>
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_theme(colors.primary.DEFAULT)]"></span>
            </button>
            <ThemeToggle />
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground">Se connecter</Link>
            <Button size="sm" variant="secondary" onClick={() => navigate("/auth?tab=signup")}>S'inscrire</Button>
            <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => navigate("/auth?role=livreur&tab=signup")}>Devenir Livreur</Button>
            <ThemeToggle />
          </nav>
        )}
        {!session && !isClient && (
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button size="sm" variant="secondary" onClick={() => navigate("/auth")}>Connexion</Button>
          </div>
        )}
      </div>
    </header>
  );
}

function UserMenu({ onLogout, role, onGo }: { onLogout: () => void; role: string; onGo: (path: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-sm hover:bg-muted">
          <span className="inline-block h-6 w-6 rounded-full bg-primary/20" />
          <span className="capitalize">{role}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {role === "client" && <DropdownMenuItem onClick={() => onGo("/client")}>Mes commandes</DropdownMenuItem>}
        {role === "livreur" && <DropdownMenuItem onClick={() => onGo("/livreur")}>Tableau de bord</DropdownMenuItem>}
        {role === "livreur" && <DropdownMenuItem onClick={() => onGo("/livreur/revenus")}>Revenus</DropdownMenuItem>}
        <DropdownMenuItem onClick={() => onGo("/settings")}>Paramètres</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>Se déconnecter</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-card/40">
      <div className="container py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo className="h-5" />
          <span>NILE © 2023 NILE. Tous droits réservés.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/settings" className="hover:text-foreground">Paramètres</Link>
          <a href="#securite" className="hover:text-foreground">Sécurité</a>
          <a href="#fonctionnalites" className="hover:text-foreground">Fonctionnalités</a>
        </div>
      </div>
    </footer>
  );
}
