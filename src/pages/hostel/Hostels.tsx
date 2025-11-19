import { Home, Building, FileText, DollarSign, MessageSquare, UserCheck, Shield } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function Hostels() {
  const { user } = useAuth();

  const sidebarItems = [
    { label: 'Dashboard', path: '/dashboard/hostel-admin', icon: <Home className="h-5 w-5" /> },
    { label: 'Hostels', path: '/hostels', icon: <Building className="h-5 w-5" /> },
    { label: 'Scholarships', path: '/scholarships', icon: <FileText className="h-5 w-5" /> },
    { label: 'Funding Status', path: '/funding', icon: <DollarSign className="h-5 w-5" /> },
    { label: 'Reports', path: '/reports', icon: <FileText className="h-5 w-5" /> },
    { label: 'CMS', path: '/cms', icon: <MessageSquare className="h-5 w-5" /> },
    { label: 'CRM', path: '/crm', icon: <UserCheck className="h-5 w-5" /> },
    { label: 'Settings', path: '/settings', icon: <Shield className="h-5 w-5" /> },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      currentPath="/hostels"
      userName={user?.email || "Admin"}
      userPhone=""
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Hostels Management</h2>
          <p className="text-muted-foreground">Manage your hostel properties</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hostel List</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Hostel management features coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
