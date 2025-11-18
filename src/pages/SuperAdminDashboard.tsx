import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Building, Users, Heart, Shield, DollarSign, Clock, CheckCircle } from 'lucide-react';

interface AdminStats {
  totalHostels: number;
  totalInstitutions: number;
  totalStudents: number;
  totalDonors: number;
  totalTrustees: number;
  totalFunding: number;
  pendingApprovals: number;
  approvedToday: number;
}

export default function SuperAdminDashboard() {
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats>({
    totalHostels: 0,
    totalInstitutions: 0,
    totalStudents: 0,
    totalDonors: 0,
    totalTrustees: 0,
    totalFunding: 0,
    pendingApprovals: 0,
    approvedToday: 0,
  });

  useEffect(() => {
    if (userRole !== 'super_admin') {
      navigate('/');
    }
  }, [userRole, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      const [hostels, institutions, students, donors, trustees, donations, applications] = await Promise.all([
        supabase.from('hostels').select('id, status'),
        supabase.from('institutions').select('id, status'),
        supabase.from('students').select('id'),
        supabase.from('donors').select('id'),
        supabase.from('trustees').select('id'),
        supabase.from('donations').select('amount'),
        supabase.from('applications').select('status, updated_at'),
      ]);

      const totalFunding = donations.data?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0;
      const pendingApprovals = [
        ...(hostels.data?.filter(h => h.status === 'pending') || []),
        ...(institutions.data?.filter(i => i.status === 'pending') || []),
      ].length;

      const today = new Date().toISOString().split('T')[0];
      const approvedToday = applications.data?.filter(
        a => a.status === 'approved' && a.updated_at?.startsWith(today)
      ).length || 0;

      setStats({
        totalHostels: hostels.data?.length || 0,
        totalInstitutions: institutions.data?.length || 0,
        totalStudents: students.data?.length || 0,
        totalDonors: donors.data?.length || 0,
        totalTrustees: trustees.data?.length || 0,
        totalFunding,
        pendingApprovals,
        approvedToday,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Super Admin Portal</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button onClick={signOut} variant="outline">Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">System Overview</h2>
          <p className="text-muted-foreground">Complete control and monitoring of the federation</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Hostels</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalHostels}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Institutions</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInstitutions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
              <Heart className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.totalDonors}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Trustees</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTrustees}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{stats.totalFunding.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingApprovals}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approvedToday}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">Manage Students</Button>
              <Button variant="outline" className="w-full">Manage Hostels</Button>
              <Button variant="outline" className="w-full">Manage Institutions</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Approvals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">Hostel Approvals</Button>
              <Button variant="outline" className="w-full">Institution Approvals</Button>
              <Button variant="outline" className="w-full">Application Reviews</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">CMS Management</Button>
              <Button variant="outline" className="w-full">Reports & Analytics</Button>
              <Button variant="outline" className="w-full">System Settings</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
