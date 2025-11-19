import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import InstitutionAdminLayout from "@/components/InstitutionAdminLayout";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./institution/Dashboard";
import Institutions from "./institution/Institutions";
import Students from "./institution/Students";
import Courses from "./institution/Courses";
import Staff from "./institution/Staff";
import Attendance from "./institution/Attendance";
import Reports from "./institution/Reports";
import Documents from "./institution/Documents";
import Settings from "./institution/Settings";

export default function InstitutionAdminDashboard() {
  const { userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if loading is complete and role doesn't match
    if (!loading && userRole && userRole !== 'institution_admin') {
      navigate('/portal-selection');
    }
  }, [userRole, loading, navigate]);

  return (
    <InstitutionAdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/institutions" element={<Institutions />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </InstitutionAdminLayout>
  );
}
