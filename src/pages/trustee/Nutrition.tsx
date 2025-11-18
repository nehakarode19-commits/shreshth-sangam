import { Home, Building, Book, FileText, Shield, MessageSquare } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function TrusteeNutrition() {
  const { user } = useAuth();

  const sidebarItems = [
    { label: 'Dashboard', path: '/dashboard/trustee', icon: <Home className="h-5 w-5" /> },
    { label: 'Institution', path: '/trustee/institutions', icon: <Building className="h-5 w-5" /> },
    { label: 'Avail Scholarship', path: '/trustee/scholarships', icon: <Book className="h-5 w-5" /> },
    { label: 'Loan Helpdesk', path: '/trustee/loans', icon: <FileText className="h-5 w-5" /> },
    { label: 'Nutrition Support', path: '/trustee/nutrition', icon: <Shield className="h-5 w-5" /> },
    { label: 'Learning Resources', path: '/trustee/resources', icon: <Book className="h-5 w-5" /> },
    { label: 'Help', path: '/trustee/help', icon: <MessageSquare className="h-5 w-5" /> },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      currentPath="/trustee/nutrition"
      userName={user?.email || "Trustee"}
      userPhone="+91 98765 43210"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Nutrition Support</h2>
          <p className="text-muted-foreground">Nutritional programs and support services</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nutrition Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Nutrition support details coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
