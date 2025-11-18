import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Home, FolderOpen, Award, Heart, TrendingUp } from 'lucide-react';

interface DonorStats {
  totalDonations: number;
  hostelsSupported: number;
  projectsSponsored: number;
  impactLevel: string;
}

export default function DonorDashboard() {
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DonorStats>({
    totalDonations: 0,
    hostelsSupported: 0,
    projectsSponsored: 0,
    impactLevel: 'Bronze',
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
        .single();

      if (donorData) {
        const { data: donations } = await supabase
          .from('donations')
          .select('*')
          .eq('donor_id', donorData.id);

        const totalDonations = donations?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0;
        const uniqueHostels = new Set(donations?.map(d => d.hostel_id).filter(Boolean));
        const uniqueInstitutions = new Set(donations?.map(d => d.institution_id).filter(Boolean));

        setStats({
          totalDonations,
          hostelsSupported: uniqueHostels.size,
          projectsSponsored: uniqueInstitutions.size,
          impactLevel: donorData.impact_level || 'Bronze',
        });
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Donor Portal</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button onClick={signOut} variant="outline">Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Your Giving Impact</h2>
          <p className="text-muted-foreground">Thank you for supporting our students and institutions</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{stats.totalDonations.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Hostels Supported</CardTitle>
              <Home className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.hostelsSupported}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Projects Sponsored</CardTitle>
              <FolderOpen className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.projectsSponsored}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Impact Level</CardTitle>
              <Award className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.impactLevel}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Make a Donation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => navigate('/donors')} className="w-full" size="lg">
                Donate Now
              </Button>
              <Button variant="outline" className="w-full">
                View Projects
              </Button>
              <Button variant="outline" className="w-full">
                Tax Receipts
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your generous contributions have helped provide education and shelter to students in need.
              </p>
              <Button variant="secondary" className="w-full">
                View Impact Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
