import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSelection from "./pages/LoginSelection";
import InvestigatorLogin from "./pages/InvestigatorLogin";
import AdminLogin from "./pages/AdminLogin";
import InvestigatorDashboard from "./pages/InvestigatorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Login Routes */}
          <Route path="/" element={<LoginSelection />} />
          <Route path="/investigator-login" element={<InvestigatorLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          
          {/* Dashboard Routes */}
          <Route path="/investigator" element={<InvestigatorDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
