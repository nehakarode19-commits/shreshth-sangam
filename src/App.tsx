import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Institutions from "./pages/Institutions";
import InstitutionDetail from "./pages/InstitutionDetail";
import Apply from "./pages/Apply";
import Donors from "./pages/Donors";
import Events from "./pages/Events";
import Trustees from "./pages/Trustees";
import Auth from "./pages/Auth";
import PortalSelection from "./pages/PortalSelection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/StudentDashboard";
import HostelAdminDashboard from "./pages/HostelAdminDashboard";
import InstitutionAdminDashboard from "./pages/InstitutionAdminDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import TrusteeDashboard from "./pages/TrusteeDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/institutions" element={<Institutions />} />
            <Route path="/institutions/:id" element={<InstitutionDetail />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/events" element={<Events />} />
            <Route path="/trustees" element={<Trustees />} />
            <Route path="/portal-selection" element={<PortalSelection />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/hostel-admin" element={<HostelAdminDashboard />} />
            <Route path="/dashboard/institution-admin" element={<InstitutionAdminDashboard />} />
            <Route path="/dashboard/donor" element={<DonorDashboard />} />
            <Route path="/dashboard/trustee" element={<TrusteeDashboard />} />
            <Route path="/dashboard/super-admin" element={<SuperAdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
