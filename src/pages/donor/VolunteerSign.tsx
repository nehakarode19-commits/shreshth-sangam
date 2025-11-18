import { Home, FileText, Receipt, MessageSquare } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function VolunteerSign() {
  const { user } = useAuth();

  const sidebarItems = [
    { label: 'Dashboard', path: '/dashboard/donor', icon: <Home className="h-5 w-5" /> },
    { label: 'Impact Reports', path: '/donor/impact-reports', icon: <FileText className="h-5 w-5" /> },
    { label: 'Tax Receipts', path: '/donor/tax-receipts', icon: <Receipt className="h-5 w-5" /> },
    { label: 'Volunteer Sign', path: '/donor/volunteer', icon: <MessageSquare className="h-5 w-5" /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for signing up as a volunteer!');
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      currentPath="/donor/volunteer"
      userName={user?.email || "Donor"}
      userPhone=""
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Volunteer Sign Up</h2>
          <p className="text-muted-foreground">Join us in making a difference through your time and skills</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Volunteer Registration Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" placeholder="Your city" required />
                </div>
              </div>

              <div>
                <Label htmlFor="interest">Area of Interest *</Label>
                <Input id="interest" placeholder="e.g., Teaching, Mentoring, Event Organization" required />
              </div>

              <div>
                <Label htmlFor="availability">Availability</Label>
                <Textarea 
                  id="availability" 
                  placeholder="Please describe your availability (days/hours per week)"
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">Submit Application</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
