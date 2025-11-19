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
import Committee from "./pages/Committee";
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
import HostelRegistration from "./pages/HostelRegistration";
import StudentRegistration from "./pages/StudentRegistration";
import HostelRegistrationSuccess from "./pages/HostelRegistrationSuccess";
import StudentRegistrationSuccess from "./pages/StudentRegistrationSuccess";
import ImpactReports from "./pages/donor/ImpactReports";
import TaxReceipts from "./pages/donor/TaxReceipts";
import VolunteerSign from "./pages/donor/VolunteerSign";
import TrusteeInstitutions from "./pages/trustee/Institutions";
import TrusteeScholarships from "./pages/trustee/Scholarships";
import TrusteeLoans from "./pages/trustee/Loans";
import TrusteeNutrition from "./pages/trustee/Nutrition";
import TrusteeResources from "./pages/trustee/Resources";
import TrusteeHelp from "./pages/trustee/Help";
import HostelHostels from "./pages/hostel/Hostels";
import HostelScholarships from "./pages/hostel/Scholarships";
import HostelFunding from "./pages/hostel/Funding";
import HostelReports from "./pages/hostel/Reports";
import HostelCMS from "./pages/hostel/CMS";
import HostelCRM from "./pages/hostel/CRM";
import HostelSettings from "./pages/hostel/Settings";

const queryClient = new QueryClient();

// Application root component with AuthProvider wrapping all routes
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
            <Route path="/committee" element={<Committee />} />
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
            <Route path="/hostel/register" element={<HostelRegistration />} />
            <Route path="/student/register" element={<StudentRegistration />} />
            <Route path="/hostel/registration-success" element={<HostelRegistrationSuccess />} />
            <Route path="/student/registration-success" element={<StudentRegistrationSuccess />} />
            
            {/* Donor Portal Routes */}
            <Route path="/donor/impact-reports" element={<ImpactReports />} />
            <Route path="/donor/tax-receipts" element={<TaxReceipts />} />
            <Route path="/donor/volunteer" element={<VolunteerSign />} />
            
            {/* Trustee Portal Routes */}
            <Route path="/trustee/institutions" element={<TrusteeInstitutions />} />
            <Route path="/trustee/scholarships" element={<TrusteeScholarships />} />
            <Route path="/trustee/loans" element={<TrusteeLoans />} />
            <Route path="/trustee/nutrition" element={<TrusteeNutrition />} />
            <Route path="/trustee/resources" element={<TrusteeResources />} />
            <Route path="/trustee/help" element={<TrusteeHelp />} />
            
            {/* Hostel Admin Portal Routes */}
            <Route path="/hostels" element={<HostelHostels />} />
            <Route path="/scholarships" element={<HostelScholarships />} />
            <Route path="/funding" element={<HostelFunding />} />
            <Route path="/reports" element={<HostelReports />} />
            <Route path="/cms" element={<HostelCMS />} />
            <Route path="/crm" element={<HostelCRM />} />
            <Route path="/settings" element={<HostelSettings />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
