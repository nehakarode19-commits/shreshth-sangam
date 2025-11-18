import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Users, Clock, DollarSign, Shield, TrendingUp } from 'lucide-react';

interface HostelStats {
  totalCapacity: number;
  occupied: number;
  vacant: number;
  pendingApplications: number;
  trusteesCount: number;
  fundingNeeded: number;
}

export default function HostelAdminDashboard() {
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<HostelStats>({
    totalCapacity: 0,
    occupied: 0,
    vacant: 0,
    pendingApplications: 0,
    trusteesCount: 0,
    fundingNeeded: 0,
  });

  useEffect(() => {
    if (userRole !== 'hostel_admin') {
      navigate('/');
    }
  }, [userRole, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const { data: hostels } = await supabase
        .from('hostels')
        .select('*')
        .eq('admin_id', user.id);

      if (hostels && hostels.length > 0) {
        const totalCapacity = hostels.reduce((sum, h) => sum + (h.total_capacity || 0), 0);
        const occupied = hostels.reduce((sum, h) => sum + (h.occupied_count || 0), 0);
        const fundingNeeded = hostels.reduce((sum, h) => sum + (h.funding_needed || 0), 0);

        const { data: applications } = await supabase
          .from('applications')
          .select('status')
          .in('hostel_id', hostels.map(h => h.id))
          .eq('status', 'pending');

        const { data: trustees } = await supabase
          .from('trustees')
          .select('id')
          .in('hostel_id', hostels.map(h => h.id));

        setStats({
          totalCapacity,
          occupied,
          vacant: totalCapacity - occupied,
          pendingApplications: applications?.length || 0,
          trusteesCount: trustees?.length || 0,
          fundingNeeded,
        });
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Hostel Admin Portal</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button onClick={signOut} variant="outline">Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
          <p className="text-muted-foreground">Manage your hostels and monitor performance</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCapacity}</div>
              <p className="text-xs text-muted-foreground mt-1">Students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Occupied</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.occupied}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.totalCapacity > 0 ? Math.round((stats.occupied / stats.totalCapacity) * 100) : 0}% occupancy
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Vacant</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.vacant}</div>
              <p className="text-xs text-muted-foreground mt-1">Available beds</p>
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
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.trusteesCount}</div>
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
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => navigate('/hostel/register')} className="w-full" size="lg">
                Add New Hostel
              </Button>
              <Button variant="outline" className="w-full">
                View Applications
              </Button>
              <Button variant="outline" className="w-full">
                Manage Trustees
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No recent activity to display
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
