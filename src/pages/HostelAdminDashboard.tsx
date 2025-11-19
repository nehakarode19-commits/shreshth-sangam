import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Building, Clock, Shield, UserCheck, DollarSign, FileText, MessageSquare } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

interface HostelStats {
  totalCapacity: number;
  occupied: number;
  vacant: number;
  pendingApplications: number;
  trustees: number;
  fundingNeeded: number;
}

export default function HostelAdminDashboard() {
  const { user, userRole, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<HostelStats>({
    totalCapacity: 0,
    occupied: 0,
    vacant: 0,
    pendingApplications: 0,
    trustees: 0,
    fundingNeeded: 0,
  });

  useEffect(() => {
    // Only redirect if loading is complete and role doesn't match
    if (!loading && userRole && userRole !== 'hostel_admin') {
      navigate('/portal-selection');
    }
  }, [userRole, loading, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const { data: hostelsData } = await supabase
        .from('hostels')
        .select('*')
        .eq('admin_id', user.id);

      if (hostelsData && hostelsData.length > 0) {
        const totalCapacity = hostelsData.reduce((sum, h) => sum + (h.total_capacity || 0), 0);
        const occupied = hostelsData.reduce((sum, h) => sum + (h.occupied_count || 0), 0);
        const fundingNeeded = hostelsData.reduce((sum, h) => sum + (h.funding_needed || 0), 0);

        const { data: applicationsData } = await supabase
          .from('applications')
          .select('id')
          .in('hostel_id', hostelsData.map(h => h.id))
          .eq('status', 'pending');

        const { data: trusteesData } = await supabase
          .from('trustees')
          .select('id')
          .in('hostel_id', hostelsData.map(h => h.id));

        setStats({
          totalCapacity,
          occupied,
          vacant: totalCapacity - occupied,
          pendingApplications: applicationsData?.length || 0,
          trustees: trusteesData?.length || 0,
          fundingNeeded: fundingNeeded,
        });
      }
    };

    fetchStats();
  }, [user]);

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
      currentPath="/dashboard/hostel-admin"
      userName={user?.email || "Admin"}
      userPhone=""
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Hostel Dashboard</h2>
          <p className="text-muted-foreground">Manage your hostel operations</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
              <Home className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalCapacity}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Occupied</CardTitle>
              <Building className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.occupied}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Vacant</CardTitle>
              <UserCheck className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.vacant}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingApplications}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Trustees</CardTitle>
              <Shield className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.trustees}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Funding Needed</CardTitle>
              <DollarSign className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">₹{stats.fundingNeeded.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={() => navigate('/hostel/register')}>Add New Hostel</Button>
              <Button variant="outline" className="w-full">Manage Applications</Button>
              <Button variant="outline" className="w-full">Update Hostel Details</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No recent activity to display</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
