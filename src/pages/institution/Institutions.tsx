import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockInstitutions = [
  { id: 1, name: 'Jain Vidyalaya', type: 'School', city: 'Ahmedabad', state: 'Gujarat', students: 450, status: 'Active' },
  { id: 2, name: 'Shri Jain College', type: 'College', city: 'Mumbai', state: 'Maharashtra', students: 1200, status: 'Active' },
  { id: 3, name: 'Jain Engineering Institute', type: 'Engineering', city: 'Pune', state: 'Maharashtra', students: 800, status: 'Active' },
];

export default function Institutions() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Institutions</h1>
          <p className="text-muted-foreground">Manage your educational institutions</p>
        </div>
        <Button className="gap-2" onClick={() => navigate('/institution-admin/institutions/add')}>
          <Plus className="h-4 w-4" />
          Add Institution
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search institutions..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gujarat">Gujarat</SelectItem>
              <SelectItem value="maharashtra">Maharashtra</SelectItem>
              <SelectItem value="rajasthan">Rajasthan</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="school">School</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Institutions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Institutions ({mockInstitutions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInstitutions.map((inst, index) => (
                <TableRow key={inst.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{inst.name}</TableCell>
                  <TableCell>{inst.type}</TableCell>
                  <TableCell>{inst.city}, {inst.state}</TableCell>
                  <TableCell>{inst.students}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-success/10 text-success border-success">
                      {inst.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => navigate(`/institution-admin/institutions/${inst.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => navigate(`/institution-admin/institutions/${inst.id}/edit`)}>
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
