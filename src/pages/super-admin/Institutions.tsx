import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Eye, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockInstitutions = [
  { id: 1, name: 'Swetamber Murtipujak Jain Boarding', address: '123 Main St, Ahmedabad', trustee: 'Shri Ramesh Patel', rooms: 50, status: 'approved' },
  { id: 2, name: 'Shri Jain Swetambar Murtipujak Bhavan', address: '456 Park Ave, Ahmedabad', trustee: 'Smt. Anjali Shah', rooms: 40, status: 'approved' },
  { id: 3, name: 'Digambar Jain Boarding School', address: '789 School Rd, Mumbai', trustee: 'Shri Vijay Kumar', rooms: 60, status: 'pending' },
  { id: 4, name: 'Shwetamber Jain Hostel', address: '321 College St, Pune', trustee: 'Shri Mahesh Jain', rooms: 35, status: 'approved' },
  { id: 5, name: 'Jain Students Accommodation', address: '654 Hostel Lane, Bangalore', trustee: 'Smt. Priya Mehta', rooms: 45, status: 'rejected' },
];

export default function Institutions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');

  const filteredInstitutions = mockInstitutions.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inst.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inst.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Institution Management</h1>
          <p className="text-muted-foreground">Manage all institutions, hostels, and boarding schools</p>
        </div>
        <Button 
          className="gap-2"
          onClick={() => navigate('/super-admin/institutions/add')}
        >
          <Plus className="h-4 w-4" />
          Add Institution
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search institutions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="gujarat">Gujarat</SelectItem>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Institutions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Institutions ({filteredInstitutions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Trustee</TableHead>
                <TableHead>Rooms</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstitutions.map((inst, index) => (
                <TableRow key={inst.id} className="cursor-pointer hover:bg-accent">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{inst.name}</TableCell>
                  <TableCell>{inst.address}</TableCell>
                  <TableCell>{inst.trustee}</TableCell>
                  <TableCell>{inst.rooms}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={inst.status === 'approved' ? 'default' : inst.status === 'pending' ? 'secondary' : 'destructive'}
                      className={inst.status === 'approved' ? 'bg-primary' : ''}
                    >
                      {inst.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/super-admin/institutions/${inst.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/super-admin/institutions/${inst.id}/edit`)}
                      >
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
