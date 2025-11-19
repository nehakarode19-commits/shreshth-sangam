import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const mockContacts = [
  { id: 1, name: 'Ramesh Patel', from: 'Swetamber Murtipujak Jain Boarding', phone: '+91 98765 43210', email: 'ramesh@example.com', message: 'Interested in partnering with your organization for student welfare programs.', category: 'Partnership', date: '2024-11-15', status: 'new' },
  { id: 2, name: 'Anjali Shah', from: 'Individual Donor', phone: '+91 98765 43211', email: 'anjali@example.com', message: 'Want to know more about donation options and tax benefits.', category: 'Donation', date: '2024-11-16', status: 'responded' },
  { id: 3, name: 'Vijay Kumar', from: 'Digambar Jain Boarding School', phone: '+91 98765 43212', email: 'vijay@example.com', message: 'Need assistance with hostel registration process.', category: 'Support', date: '2024-11-17', status: 'new' },
  { id: 4, name: 'Priya Mehta', from: 'Parent', phone: '+91 98765 43213', email: 'priya@example.com', message: 'Looking for information about scholarship programs for my child.', category: 'Inquiry', date: '2024-11-18', status: 'in_progress' },
];

export default function ContactQueries() {
  const [selectedContact, setSelectedContact] = useState<typeof mockContacts[0] | null>(null);

  const handleViewContact = (contact: typeof mockContacts[0]) => {
    setSelectedContact(contact);
  };

  const handleReply = () => {
    toast.success('Reply sent successfully!');
    setSelectedContact(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Contact Queries</h1>
        <p className="text-muted-foreground">Manage all contact form submissions and inquiries</p>
      </div>

      {/* Contact Queries Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Contact Submissions ({mockContacts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No</TableHead>
                <TableHead>Contact Person Name</TableHead>
                <TableHead>From (Institution/Hostel)</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Email ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContacts.map((contact, index) => (
                <TableRow key={contact.id} className="cursor-pointer hover:bg-accent">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.from}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{contact.category}</Badge>
                  </TableCell>
                  <TableCell>{contact.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={contact.status === 'new' ? 'destructive' : contact.status === 'in_progress' ? 'secondary' : 'default'}
                      className={contact.status === 'responded' ? 'bg-primary' : ''}
                    >
                      {contact.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => handleViewContact(contact)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Contact Detail Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Query Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Contact Person</Label>
                  <p className="text-foreground font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <Label>From</Label>
                  <p className="text-foreground">{selectedContact.from}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="text-foreground">{selectedContact.phone}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-foreground">{selectedContact.email}</p>
                </div>
                <div>
                  <Label>Category</Label>
                  <Badge variant="outline">{selectedContact.category}</Badge>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="text-foreground">{selectedContact.date}</p>
                </div>
              </div>
              
              <div>
                <Label>Message</Label>
                <div className="bg-accent p-4 rounded-lg mt-2">
                  <p className="text-foreground">{selectedContact.message}</p>
                </div>
              </div>

              {selectedContact.status === 'responded' && (
                <div>
                  <Label>Previous Response</Label>
                  <div className="bg-primary/10 p-4 rounded-lg mt-2 border border-primary/20">
                    <p className="text-foreground text-sm">Thank you for reaching out. We have received your inquiry and will get back to you shortly.</p>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="response">Response</Label>
                <Textarea id="response" placeholder="Type your response..." rows={5} />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedContact(null)}>Cancel</Button>
                <Button onClick={handleReply}>Send Reply</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
