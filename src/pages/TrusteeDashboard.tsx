import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Building, Clock, Shield, FileText, MessageSquare } from 'lucide-react';

interface TrusteeStats {
  hostelsManaged: number;
  institutionsManaged: number;
  pendingApprovals: number;
  complianceScore: number;
}

export default function TrusteeDashboard() {
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<TrusteeStats>({
    hostelsManaged: 0,
    institutionsManaged: 0,
    pendingApprovals: 0,
    complianceScore: 0,
  });

  useEffect(() => {
    if (userRole !== 'trustee') {
      navigate('/');
    }
  }, [userRole, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const { data: trusteeData } = await supabase
        .from('trustees')
        .select('*')
        .eq('user_id', user.id);

      if (trusteeData && trusteeData.length > 0) {
        const hostelIds = trusteeData.filter(t => t.hostel_id).map(t => t.hostel_id);
        const institutionIds = trusteeData.filter(t => t.institution_id).map(t => t.institution_id);
        
        const avgComplianceScore = trusteeData.reduce((sum, t) => sum + (t.compliance_score || 0), 0) / trusteeData.length;

        setStats({
          hostelsManaged: new Set(hostelIds).size,
          institutionsManaged: new Set(institutionIds).size,
          pendingApprovals: 0,
          complianceScore: Math.round(avgComplianceScore),
        });
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Trustee Portal</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button onClick={signOut} variant="outline">Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Trustee Dashboard</h2>
          <p className="text-muted-foreground">Manage your responsibilities and oversight</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Hostels Managed</CardTitle>
              <Home className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.hostelsManaged}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Institutions Managed</CardTitle>
              <Building className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.institutionsManaged}</div>
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
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <Shield className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.complianceScore}%</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">View Managed Hostels</Button>
              <Button variant="outline" className="w-full">View Managed Institutions</Button>
              <Button variant="outline" className="w-full">Compliance Documents</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Communication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Stay connected with admins and coordinators
              </p>
              <Button variant="secondary" className="w-full">
                Communication Hub
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
