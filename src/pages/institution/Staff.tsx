import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Edit } from "lucide-react";

const mockStaff = [
  { id: 1, name: 'Dr. Rajesh Kumar', designation: 'Principal', department: 'Administration', phone: '+91 98765 43214', status: 'Active' },
  { id: 2, name: 'Prof. Meera Desai', designation: 'Professor', department: 'Science', phone: '+91 98765 43215', status: 'Active' },
  { id: 3, name: 'Mr. Suresh Patel', designation: 'Teacher', department: 'Mathematics', phone: '+91 98765 43216', status: 'Active' },
  { id: 4, name: 'Ms. Anjali Sharma', designation: 'Teacher', department: 'English', phone: '+91 98765 43217', status: 'Active' },
];

export default function Staff() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground">Manage teaching and non-teaching staff</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Staff
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Staff Members ({mockStaff.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStaff.map((staff, index) => (
                <TableRow key={staff.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{staff.name}</TableCell>
                  <TableCell>{staff.designation}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{staff.department}</Badge>
                  </TableCell>
                  <TableCell>{staff.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-success/10 text-success border-success">
                      {staff.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
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
