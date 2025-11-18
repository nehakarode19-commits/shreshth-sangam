import { Home, FileText, Receipt, MessageSquare, Download } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function TaxReceipts() {
  const { user } = useAuth();

  const sidebarItems = [
    { label: 'Dashboard', path: '/dashboard/donor', icon: <Home className="h-5 w-5" /> },
    { label: 'Impact Reports', path: '/donor/impact-reports', icon: <FileText className="h-5 w-5" /> },
    { label: 'Tax Receipts', path: '/donor/tax-receipts', icon: <Receipt className="h-5 w-5" /> },
    { label: 'Volunteer Sign', path: '/donor/volunteer', icon: <MessageSquare className="h-5 w-5" /> },
  ];

  const receipts = [
    { date: '2024-01-15', project: 'Greenwood Hostel - Library', amount: '₹5,00,000' },
    { date: '2024-02-20', project: 'Riverside Hostel - Infrastructure', amount: '₹7,50,000' },
    { date: '2024-03-10', project: 'Hillside Hostel - Sports Facilities', amount: '₹3,00,000' },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      currentPath="/donor/tax-receipts"
      userName={user?.email || "Donor"}
      userPhone=""
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Tax Receipts</h2>
          <p className="text-muted-foreground">Download your donation receipts for tax purposes</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Donation Receipts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Project / Hostel</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Receipt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receipts.map((receipt, index) => (
                  <TableRow key={index}>
                    <TableCell>{receipt.date}</TableCell>
                    <TableCell className="font-medium">{receipt.project}</TableCell>
                    <TableCell className="text-right font-semibold">{receipt.amount}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
