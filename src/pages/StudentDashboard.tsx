import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Building, Book, FileText, MessageSquare, Users, Award } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ApplicationStats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
}

export default function StudentDashboard() {
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<ApplicationStats>({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    if (userRole !== 'student') {
      navigate('/');
    }
  }, [userRole, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const { data: studentData } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (studentData) {
        const { data: applications } = await supabase
          .from('applications')
          .select('status')
          .eq('student_id', studentData.id);

        if (applications) {
          setStats({
            total: applications.length,
            approved: applications.filter(a => a.status === 'approved').length,
            pending: applications.filter(a => a.status === 'pending').length,
            rejected: applications.filter(a => a.status === 'rejected').length,
          });
        }
      }
    };

    fetchStats();
  }, [user]);

  const sidebarItems = [
    { label: 'Dashboard', path: '/dashboard/student', icon: <Home className="h-5 w-5" /> },
    { label: 'Institution', path: '/institutions', icon: <Building className="h-5 w-5" /> },
    { label: 'Avail Scholarship', path: '/scholarships', icon: <Award className="h-5 w-5" /> },
    { label: 'Loan Helpdesk', path: '/loans', icon: <FileText className="h-5 w-5" /> },
    { label: 'Nutrition Support', path: '/nutrition', icon: <Users className="h-5 w-5" /> },
    { label: 'Learning Resources', path: '/resources', icon: <Book className="h-5 w-5" /> },
    { label: 'Help', path: '/help', icon: <MessageSquare className="h-5 w-5" /> },
  ];

  const upcomingInterviews = [
    { college: 'Greenwood Hostel', date: '15 Mar 2025', time: '10:00 AM', mode: 'Online' },
    { college: 'Riverside Hostel', date: '18 Mar 2025', time: '2:00 PM', mode: 'In-Person' },
  ];

  const preferredHostels = [
    { name: 'Greenwood Hostel', city: 'Mumbai', rating: 4.5 },
    { name: 'Riverside Hostel', city: 'Delhi', rating: 4.7 },
    { name: 'Hillside Hostel', city: 'Bangalore', rating: 4.3 },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      currentPath="/dashboard/student"
      userName={user?.email || "Student"}
      userPhone=""
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Student Dashboard</h2>
          <p className="text-muted-foreground">Track your applications and discover hostels</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <Award className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <FileText className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <FileText className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>College Name</TableHead>
                  <TableHead>Interview Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingInterviews.map((interview, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{interview.college}</TableCell>
                    <TableCell>{interview.date}</TableCell>
                    <TableCell>{interview.time}</TableCell>
                    <TableCell>{interview.mode}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Counselor / Coordinator</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Rajesh Kumar</p>
              <p className="text-sm text-muted-foreground">rajesh@jbg.org</p>
              <p className="text-sm text-muted-foreground">+91 98765 43210</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferred Hostels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {preferredHostels.map((hostel, idx) => (
                <Card key={idx} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-32 bg-muted rounded-lg mb-2"></div>
                    <CardTitle className="text-base">{hostel.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{hostel.city}</p>
                    <p className="text-sm font-medium mt-1">Rating: {hostel.rating}/5</p>
                    <Button className="w-full mt-4" size="sm">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
