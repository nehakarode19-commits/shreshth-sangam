import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Users, Briefcase, Shield, Calendar, DollarSign } from 'lucide-react';

interface InstitutionStats {
  totalStudents: number;
  staffCount: number;
  departments: number;
  compliance: number;
  events: number;
  funding: number;
}

export default function InstitutionAdminDashboard() {
  const { user, userRole, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<InstitutionStats>({
    totalStudents: 0,
    staffCount: 0,
    departments: 0,
    compliance: 0,
    events: 0,
    funding: 0,
  });

  useEffect(() => {
    // Only redirect if loading is complete and role doesn't match
    if (!loading && userRole && userRole !== 'institution_admin') {
      navigate('/portal-selection');
    }
  }, [userRole, loading, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const { data: institutions } = await supabase
        .from('institutions')
        .select('*')
        .eq('admin_id', user.id);

      if (institutions && institutions.length > 0) {
        const totalStudents = institutions.reduce((sum, i) => sum + (i.total_students || 0), 0);
        const staffCount = institutions.reduce((sum, i) => sum + (i.staff_count || 0), 0);
        const departments = institutions.reduce((sum, i) => sum + (i.departments?.length || 0), 0);

        setStats({
          totalStudents,
          staffCount,
          departments,
          compliance: 85,
          events: 0,
          funding: 0,
        });
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Institution Admin Portal</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button onClick={signOut} variant="outline">Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Institution Overview</h2>
          <p className="text-muted-foreground">Manage your educational institution</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground mt-1">Enrolled students</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-maroon/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Staff Count</CardTitle>
              <Briefcase className="h-5 w-5 text-maroon" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-maroon">{stats.staffCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Total staff</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-success/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Departments</CardTitle>
              <Building className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{stats.departments}</div>
              <p className="text-xs text-muted-foreground mt-1">Active departments</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-saffron/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Compliance</CardTitle>
              <Shield className="h-5 w-5 text-saffron" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-saffron">{stats.compliance}%</div>
              <p className="text-xs text-muted-foreground mt-1">Current score</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-destructive/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Events</CardTitle>
              <Calendar className="h-5 w-5 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{stats.events}</div>
              <p className="text-xs text-muted-foreground mt-1">Upcoming events</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-teal/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Funding</CardTitle>
              <DollarSign className="h-5 w-5 text-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-teal">₹{stats.funding.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Total funding</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" size="lg">
                Add Institution
              </Button>
              <Button variant="outline" className="w-full">
                Manage Students
              </Button>
              <Button variant="outline" className="w-full">
                Manage Staff
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
