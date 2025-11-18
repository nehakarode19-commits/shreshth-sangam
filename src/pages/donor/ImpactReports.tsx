import { Home, FileText, Receipt, MessageSquare } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function ImpactReports() {
  const { user } = useAuth();

  const sidebarItems = [
    { label: 'Dashboard', path: '/dashboard/donor', icon: <Home className="h-5 w-5" /> },
    { label: 'Impact Reports', path: '/donor/impact-reports', icon: <FileText className="h-5 w-5" /> },
    { label: 'Tax Receipts', path: '/donor/tax-receipts', icon: <Receipt className="h-5 w-5" /> },
    { label: 'Volunteer Sign', path: '/donor/volunteer', icon: <MessageSquare className="h-5 w-5" /> },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      currentPath="/donor/impact-reports"
      userName={user?.email || "Donor"}
      userPhone=""
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Impact Reports</h2>
          <p className="text-muted-foreground">See the difference your contributions are making</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Donations Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-48 flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization coming soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hostels Supported</CardTitle>
            </CardHeader>
            <CardContent className="h-48 flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization coming soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Students Impacted</CardTitle>
            </CardHeader>
            <CardContent className="h-48 flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization coming soon</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Contribution Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Total Donated</span>
                <span className="font-semibold">₹15,50,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Hostels Benefited</span>
                <span className="font-semibold">3 Hostels</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Students Helped</span>
                <span className="font-semibold">250+ Students</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Projects Completed</span>
                <span className="font-semibold">5 Projects</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
