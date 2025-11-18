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
    { label: 'Impact Reports', path: '/impact', icon: <FileText className="h-5 w-5" /> },
    { label: 'Tax Receipts', path: '/receipts', icon: <Receipt className="h-5 w-5" /> },
    { label: 'Volunteer Sign', path: '/volunteer', icon: <MessageSquare className="h-5 w-5" /> },
  ];

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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Donation</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{stats.totalDonations.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Hostel Support</CardTitle>
              <Building className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.hostelsSupported}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Donation Level</CardTitle>
              <Award className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.donationLevel}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Projects To Sponsor</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hostel Name</TableHead>
                  <TableHead>Donation Purpose</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectsToSponsor.map((project, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{project.hostel}</TableCell>
                    <TableCell>{project.purpose}</TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>{project.amount}</TableCell>
                    <TableCell>
                      <Button size="sm">Donate</Button>
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
              <CardTitle>Make a Donation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">Donate to Hostel</Button>
              <Button variant="outline" className="w-full">Donate to Institution</Button>
              <Button variant="outline" className="w-full">View All Projects</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your contributions have helped {stats.hostelsSupported} hostels provide better facilities to students across India.
              </p>
              <Button variant="secondary" className="w-full">
                View Impact Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
