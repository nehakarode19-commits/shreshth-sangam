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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const mockTickets = [
  { id: 'TKT-001234', category: 'Student', subject: 'Scholarship Application Query', description: 'Need help with scholarship application process...', submittedBy: 'Ramesh Patel', assignedTo: 'Admin Team', priority: 'high', status: 'open' },
  { id: 'TKT-001235', category: 'Hostel', subject: 'Room Allocation Issue', description: 'Student room allocation not working properly...', submittedBy: 'Vijay Kumar', assignedTo: 'Support Team', priority: 'medium', status: 'in_progress' },
  { id: 'TKT-001236', category: 'Donor', subject: 'Tax Receipt Request', description: 'Need tax receipt for recent donation...', submittedBy: 'Anjali Shah', assignedTo: 'Finance Team', priority: 'low', status: 'resolved' },
  { id: 'TKT-001237', category: 'Trustee', subject: 'Access Permission', description: 'Unable to access certain dashboard features...', submittedBy: 'Mahesh Jain', assignedTo: 'Tech Team', priority: 'high', status: 'open' },
  { id: 'TKT-001238', category: 'General', subject: 'Website Bug Report', description: 'Found a bug on the institutions page...', submittedBy: 'Priya Mehta', assignedTo: 'Dev Team', priority: 'medium', status: 'closed' },
];

export default function CRM() {
  const [selectedTicket, setSelectedTicket] = useState<typeof mockTickets[0] | null>(null);

  const handleViewTicket = (ticket: typeof mockTickets[0]) => {
    setSelectedTicket(ticket);
  };

  const handleReply = () => {
    toast.success('Reply sent successfully!');
    setSelectedTicket(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">CRM Module</h1>
        <p className="text-muted-foreground">Manage support tickets and customer queries</p>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tickets ({mockTickets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTickets.map((ticket) => (
                <TableRow key={ticket.id} className="cursor-pointer hover:bg-accent">
                  <TableCell className="font-mono font-medium">{ticket.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{ticket.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{ticket.subject}</TableCell>
                  <TableCell className="max-w-xs truncate">{ticket.description}</TableCell>
                  <TableCell>{ticket.submittedBy}</TableCell>
                  <TableCell>{ticket.assignedTo}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={ticket.priority === 'high' ? 'destructive' : ticket.priority === 'medium' ? 'secondary' : 'default'}
                    >
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={ticket.status === 'open' ? 'destructive' : ticket.status === 'in_progress' ? 'secondary' : 'default'}
                      className={ticket.status === 'resolved' ? 'bg-primary' : ''}
                    >
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => handleViewTicket(ticket)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Ticket Detail Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ticket Details - {selectedTicket?.id}</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <p className="text-foreground">{selectedTicket.category}</p>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Badge variant={selectedTicket.priority === 'high' ? 'destructive' : 'secondary'}>
                    {selectedTicket.priority}
                  </Badge>
                </div>
                <div>
                  <Label>Submitted By</Label>
                  <p className="text-foreground">{selectedTicket.submittedBy}</p>
                </div>
                <div>
                  <Label>Assigned To</Label>
                  <p className="text-foreground">{selectedTicket.assignedTo}</p>
                </div>
              </div>
              
              <div>
                <Label>Subject</Label>
                <p className="text-foreground font-medium">{selectedTicket.subject}</p>
              </div>
              
              <div>
                <Label>Description</Label>
                <p className="text-foreground">{selectedTicket.description}</p>
              </div>

              <div className="border-t pt-4">
                <Label>Thread History</Label>
                <div className="mt-2 space-y-2">
                  <div className="bg-accent p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Ticket opened by {selectedTicket.submittedBy}</p>
                    <p className="text-sm mt-1">{selectedTicket.description}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="reply">Add Reply</Label>
                <Textarea id="reply" placeholder="Type your response..." rows={4} />
              </div>

              <div>
                <Label htmlFor="attachment">Attach File</Label>
                <Input id="attachment" type="file" />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedTicket(null)}>Cancel</Button>
                <Button onClick={handleReply}>Send Reply</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
