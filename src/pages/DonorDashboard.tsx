import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Building, FileText, MessageSquare, DollarSign, Award, Receipt } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DonorStats {
  totalDonations: number;
  hostelsSupported: number;
  donationLevel: string;
}

export default function DonorDashboard() {
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DonorStats>({
    totalDonations: 0,
    hostelsSupported: 0,
    donationLevel: 'L1',
  });

  useEffect(() => {
    if (userRole !== 'donor') {
      navigate('/');
    }
  }, [userRole, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const { data: donorData } = await supabase
        .from('donors')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (donorData) {
        const { data: donations } = await supabase
          .from('donations')
          .select('*')
          .eq('donor_id', donorData.id);

        const totalDonations = donations?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0;
        const uniqueHostels = new Set(donations?.map(d => d.hostel_id).filter(Boolean));

        setStats({
          totalDonations,
          hostelsSupported: uniqueHostels.size,
          donationLevel: donorData.impact_level || 'L1',
        });
      }
    };

    fetchStats();
  }, [user]);

  const sidebarItems = [
    { label: 'Dashboard', path: '/dashboard/donor', icon: <Home className="h-5 w-5" /> },
    { label: 'Impact Reports', path: '/donor/impact-reports', icon: <FileText className="h-5 w-5" /> },
    { label: 'Tax Receipts', path: '/donor/tax-receipts', icon: <Receipt className="h-5 w-5" /> },
    { label: 'Volunteer Sign', path: '/donor/volunteer', icon: <MessageSquare className="h-5 w-5" /> },
  ];

  const handleDonate = (project: typeof projectsToSponsor[0]) => {
    // TODO: Implement donation modal
    alert(`Donate to ${project.hostel} for ${project.purpose}`);
  };

  const projectsToSponsor = [
    { hostel: 'Greenwood Hostel', purpose: 'Library Expansion', location: 'Mumbai', amount: '₹5,00,000' },
    { hostel: 'Riverside Hostel', purpose: 'Infrastructure Renovation', location: 'Delhi', amount: '₹7,50,000' },
    { hostel: 'Hillside Hostel', purpose: 'Sports Facilities', location: 'Bangalore', amount: '₹3,00,000' },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      currentPath="/dashboard/donor"
      userName={user?.email || "Donor"}
      userPhone=""
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Donor Dashboard</h2>
          <p className="text-muted-foreground">Your Giving Impact</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Donation</CardTitle>
              <DollarSign className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                ₹{stats.totalDonations.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Lifetime contributions</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hostel Support</CardTitle>
              <Building className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.hostelsSupported}</div>
              <p className="text-xs text-muted-foreground mt-1">Hostels benefited</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Donation Level</CardTitle>
              <Award className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground uppercase">{stats.donationLevel}</div>
              <p className="text-xs text-muted-foreground mt-1">Impact tier</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Projects To Sponsor</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Support meaningful initiatives across our hostel network</p>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Hostel Name</TableHead>
                    <TableHead className="font-semibold">Donation Purpose</TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectsToSponsor.map((project, idx) => (
                    <TableRow key={idx} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{project.hostel}</TableCell>
                      <TableCell>{project.purpose}</TableCell>
                      <TableCell className="text-muted-foreground">{project.location}</TableCell>
                      <TableCell className="font-semibold">{project.amount}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          onClick={() => handleDonate(project)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Donate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Make a Donation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full h-11">Donate to Hostel</Button>
              <Button variant="outline" className="w-full h-11">Donate to Institution</Button>
              <Button variant="outline" className="w-full h-11">View All Projects</Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Your Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Your contributions have helped <span className="font-semibold text-foreground">{stats.hostelsSupported} hostels</span> provide better facilities to students across India.
              </p>
              <Button variant="default" className="w-full h-11" onClick={() => window.location.href = '/donor/impact-reports'}>
                View Impact Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
