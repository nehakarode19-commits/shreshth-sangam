import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Building, Clock, Shield, FileText, MessageSquare, Book, Users } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface TrusteeStats {
  hostelsManaged: number;
  institutionsManaged: number;
  pendingApprovals: number;
  complianceScore: number;
}

export default function TrusteeDashboard() {
  const { user, userRole, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<TrusteeStats>({
    hostelsManaged: 0,
    institutionsManaged: 0,
    pendingApprovals: 0,
    complianceScore: 0,
  });

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    // Only redirect if loading is complete and role doesn't match
    if (!loading && userRole && userRole !== 'trustee') {
      navigate('/portal-selection');
    }
  }, [userRole, loading, navigate]);

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

  const sidebarItems = [
    { label: 'Dashboard', path: '/dashboard/trustee', icon: <Home className="h-5 w-5" /> },
    { label: 'Institution', path: '/trustee/institutions', icon: <Building className="h-5 w-5" /> },
    { label: 'Avail Scholarship', path: '/trustee/scholarships', icon: <Book className="h-5 w-5" /> },
    { label: 'Loan Helpdesk', path: '/trustee/loans', icon: <FileText className="h-5 w-5" /> },
    { label: 'Nutrition Support', path: '/trustee/nutrition', icon: <Shield className="h-5 w-5" /> },
    { label: 'Learning Resources', path: '/trustee/resources', icon: <Book className="h-5 w-5" /> },
    { label: 'Help', path: '/trustee/help', icon: <MessageSquare className="h-5 w-5" /> },
  ];

  const applicationTimeline = [
    { college: 'Greenwood University', location: 'Mumbai', request: 'Infrastructure Renovation Fund Raise', status: 'submitted' },
    { college: 'Riverside College', location: 'Delhi', request: 'Library Expansion Project', status: 'rejected' },
    { college: 'Hillside Academy', location: 'Bangalore', request: 'Sports Facilities Upgrade', status: 'approved' },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      currentPath="/dashboard/trustee"
      userName="Shyam"
      userPhone="+91 98765 43210"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Trustee Dashboard</h2>
          <p className="text-muted-foreground">Manage your responsibilities and oversight</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Hostels Managed</CardTitle>
              <Home className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.hostelsManaged}</div>
              <p className="text-xs text-muted-foreground">Active hostels</p>
            </CardContent>
          </Card>

          <Card className="border-success/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Hostels</CardTitle>
              <Building className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.hostelsManaged}</div>
              <p className="text-xs text-muted-foreground">Currently operational</p>
            </CardContent>
          </Card>

          <Card className="border-saffron/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Dormant Hostels</CardTitle>
              <Clock className="h-4 w-4 text-saffron" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-saffron">0</div>
              <p className="text-xs text-muted-foreground">Inactive facilities</p>
            </CardContent>
          </Card>

          <Card className="border-teal/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Hostel Beds</CardTitle>
              <Users className="h-4 w-4 text-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal">0</div>
              <p className="text-xs text-muted-foreground">Available capacity</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Hostel Beds</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">5000+</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Application Timeline Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>College Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Requests Raised</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicationTimeline.map((app, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{app.college}</TableCell>
                    <TableCell>{app.location}</TableCell>
                    <TableCell>{app.request}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          app.status === 'approved'
                            ? 'default'
                            : app.status === 'rejected'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {app.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Applications to Hostels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Chart visualization would go here
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hostel Funding Received</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hostel Name</TableHead>
                    <TableHead className="text-right">Funding Received</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Greenwood Hostel</TableCell>
                    <TableCell className="text-right">₹5,00,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Riverside Hostel</TableCell>
                    <TableCell className="text-right">₹3,50,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hillside Hostel</TableCell>
                    <TableCell className="text-right">₹7,00,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
