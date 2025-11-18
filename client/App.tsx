import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import DevLauncher from "./pages/DevLauncher";
import ClientHome from "./pages/ClientHome";
import ClientSelect from "./pages/ClientSelect";
import ClientDriverProfile from "./pages/ClientDriverProfile";
import ClientTrackPay from "./pages/ClientTrackPay";
import ClientConfirm from "./pages/ClientConfirm";
import DriverDashboard from "./pages/DriverDashboard";
import DriverApply from "./pages/DriverApply";
import DriverEarnings from "./pages/DriverEarnings";
import ClientMessages from "./pages/ClientMessages";
import Support from "./pages/Support";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
            <Route path="/__dev" element={<DevLauncher />} />
            <Route path="/client" element={<ClientHome />} />
            <Route path="/client/select" element={<ClientSelect />} />
            <Route path="/client/driver/:id" element={<ClientDriverProfile />} />
            <Route path="/client/track" element={<ClientTrackPay />} />
            <Route path="/client/confirm" element={<ClientConfirm />} />
            <Route path="/client/messages" element={<ClientMessages />} />
            <Route path="/livreur" element={<DriverDashboard />} />
            <Route path="/livreur/apply" element={<DriverApply />} />
            <Route path="/livreur/revenus" element={<DriverEarnings />} />
            <Route path="/livreur/messages" element={<ClientMessages />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
