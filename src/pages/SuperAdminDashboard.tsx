import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SuperAdminLayout from "@/components/SuperAdminLayout";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./super-admin/Dashboard";
import Institutions from "./super-admin/Institutions";
import AddInstitution from "./super-admin/AddInstitution";
import Scholarships from "./super-admin/Scholarships";
import Reports from "./super-admin/Reports";
import Funding from "./super-admin/Funding";
import UserManagement from "./super-admin/UserManagement";
import CRM from "./super-admin/CRM";
import ContactQueries from "./super-admin/ContactQueries";
import Podcasts from "./super-admin/cms/Podcasts";
import Events from "./super-admin/cms/Events";
import Blogs from "./super-admin/cms/Blogs";
import MediaGallery from "./super-admin/cms/MediaGallery";
import PressCoverage from "./super-admin/cms/PressCoverage";

export default function SuperAdminDashboard() {
  const { userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if loading is complete and role doesn't match
    if (!loading && userRole && userRole !== 'super_admin') {
      navigate('/portal-selection');
    }
  }, [userRole, loading, navigate]);

  return (
    <SuperAdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/institutions" element={<Institutions />} />
        <Route path="/institutions/add" element={<AddInstitution />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/funding" element={<Funding />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/contact" element={<ContactQueries />} />
        <Route path="/cms/podcasts" element={<Podcasts />} />
        <Route path="/cms/events" element={<Events />} />
        <Route path="/cms/blogs" element={<Blogs />} />
        <Route path="/cms/media" element={<MediaGallery />} />
        <Route path="/cms/press" element={<PressCoverage />} />
      </Routes>
    </SuperAdminLayout>
  );
}

