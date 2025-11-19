import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const mockScholarships = [
  { id: 1, name: 'Merit Scholarship 2024', eligibility: 'Above 80%', amount: 50000, status: 'active', institutions: 'All' },
  { id: 2, name: 'Need-Based Support', eligibility: 'Income < 3 Lakhs', amount: 30000, status: 'active', institutions: 'Selected' },
  { id: 3, name: 'Sports Excellence', eligibility: 'State Level', amount: 40000, status: 'active', institutions: 'All' },
  { id: 4, name: 'Cultural Award', eligibility: 'National Level', amount: 35000, status: 'inactive', institutions: 'Selected' },
];

export default function Scholarships() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [scholarships] = useState(mockScholarships);

  const handleAddScholarship = () => {
    toast.success('Scholarship added successfully!');
    setIsDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Scholarships Management</h1>
          <p className="text-muted-foreground">Manage scholarship programs and eligibility</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Scholarship
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Scholarship</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Scholarship Name</Label>
                <Input id="name" placeholder="Enter scholarship name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eligibility">Eligibility Criteria</Label>
                  <Input id="eligibility" placeholder="E.g., Above 80%" />
                </div>
                <div>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input id="amount" type="number" placeholder="50000" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter scholarship details" rows={3} />
              </div>
              <div>
                <Label htmlFor="institutions">Applicable Institutions</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select institutions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Institutions</SelectItem>
                    <SelectItem value="selected">Selected Institutions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddScholarship}>Save Scholarship</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Scholarships ({scholarships.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No</TableHead>
                <TableHead>Scholarship Name</TableHead>
                <TableHead>Eligibility</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Applicable To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scholarships.map((scholarship, index) => (
                <TableRow key={scholarship.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{scholarship.name}</TableCell>
                  <TableCell>{scholarship.eligibility}</TableCell>
                  <TableCell>₹{scholarship.amount.toLocaleString()}</TableCell>
                  <TableCell>{scholarship.institutions}</TableCell>
                  <TableCell>
                    <Badge variant={scholarship.status === 'active' ? 'default' : 'secondary'}>
                      {scholarship.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
