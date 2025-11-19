import { useState, useEffect } from 'react';
import { Home, Building, FileText, DollarSign, MessageSquare, UserCheck, Shield, Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Scholarship {
  id: string;
  name: string;
  description: string | null;
  eligibility_criteria: string | null;
  amount: number | null;
  application_deadline: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export default function Scholarships() {
  const { user } = useAuth();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    eligibility_criteria: '',
    amount: '',
    application_deadline: '',
    status: 'active',
  });

  const sidebarItems = [
    { label: 'Dashboard', path: '/dashboard/hostel-admin', icon: <Home className="h-5 w-5" /> },
    { label: 'Hostels', path: '/hostels', icon: <Building className="h-5 w-5" /> },
    { label: 'Scholarships', path: '/scholarships', icon: <FileText className="h-5 w-5" /> },
    { label: 'Funding Status', path: '/funding', icon: <DollarSign className="h-5 w-5" /> },
    { label: 'Reports', path: '/reports', icon: <FileText className="h-5 w-5" /> },
    { label: 'CMS', path: '/cms', icon: <MessageSquare className="h-5 w-5" /> },
    { label: 'CRM', path: '/crm', icon: <UserCheck className="h-5 w-5" /> },
    { label: 'Settings', path: '/settings', icon: <Shield className="h-5 w-5" /> },
  ];

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScholarships(data || []);
    } catch (error: any) {
      console.error('Error fetching scholarships:', error);
      toast.error('Failed to load scholarships');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const scholarshipData = {
        name: formData.name,
        description: formData.description || null,
        eligibility_criteria: formData.eligibility_criteria || null,
        amount: formData.amount ? parseFloat(formData.amount) : null,
        application_deadline: formData.application_deadline || null,
        status: formData.status,
      };

      if (editingScholarship) {
        // Update existing scholarship
        const { error } = await supabase
          .from('scholarships')
          .update(scholarshipData)
          .eq('id', editingScholarship.id);

        if (error) throw error;
        toast.success('Scholarship updated successfully!');
      } else {
        // Create new scholarship
        const { error } = await supabase
          .from('scholarships')
          .insert([scholarshipData]);

        if (error) throw error;
        toast.success('Scholarship created successfully!');
      }

      fetchScholarships();
      handleCloseDialog();
    } catch (error: any) {
      console.error('Error saving scholarship:', error);
      toast.error(editingScholarship ? 'Failed to update scholarship' : 'Failed to create scholarship');
    }
  };

  const handleEdit = (scholarship: Scholarship) => {
    setEditingScholarship(scholarship);
    setFormData({
      name: scholarship.name,
      description: scholarship.description || '',
      eligibility_criteria: scholarship.eligibility_criteria || '',
      amount: scholarship.amount?.toString() || '',
      application_deadline: scholarship.application_deadline || '',
      status: scholarship.status || 'active',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scholarship?')) return;

    try {
      const { error } = await supabase
        .from('scholarships')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Scholarship deleted successfully!');
      fetchScholarships();
    } catch (error: any) {
      console.error('Error deleting scholarship:', error);
      toast.error('Failed to delete scholarship');
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingScholarship(null);
    setFormData({
      name: '',
      description: '',
      eligibility_criteria: '',
      amount: '',
      application_deadline: '',
      status: 'active',
    });
  };

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || scholarship.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: scholarships.length,
    active: scholarships.filter(s => s.status === 'active').length,
    inactive: scholarships.filter(s => s.status === 'inactive').length,
    totalAmount: scholarships.reduce((sum, s) => sum + (s.amount || 0), 0),
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      currentPath="/scholarships"
      userName={user?.email || "Admin"}
      userPhone=""
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Scholarships</h2>
            <p className="text-muted-foreground">Manage scholarship programs</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" onClick={() => setEditingScholarship(null)}>
                <Plus className="h-4 w-4" />
                Add Scholarship
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Scholarship Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Merit-Based Scholarship"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter scholarship description"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="eligibility">Eligibility Criteria</Label>
                  <Textarea
                    id="eligibility"
                    value={formData.eligibility_criteria}
                    onChange={(e) => setFormData({ ...formData, eligibility_criteria: e.target.value })}
                    placeholder="Enter eligibility criteria"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="e.g., 50000"
                      min="0"
                      step="1000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deadline">Application Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.application_deadline}
                      onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingScholarship ? 'Update' : 'Create'} Scholarship
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Scholarships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{stats.active}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Inactive Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-muted-foreground">{stats.inactive}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-maroon">₹{(stats.totalAmount / 100000).toFixed(1)}L</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Scholarships Table */}
        <Card>
          <CardHeader>
            <CardTitle>Scholarship Programs ({filteredScholarships.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading scholarships...</p>
              </div>
            ) : filteredScholarships.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No scholarships found</p>
                <p className="text-sm text-muted-foreground">Click "Add Scholarship" to create your first scholarship program</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr. No</TableHead>
                    <TableHead>Scholarship Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Eligibility</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScholarships.map((scholarship, index) => (
                    <TableRow key={scholarship.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{scholarship.name}</TableCell>
                      <TableCell>
                        {scholarship.amount ? `₹${scholarship.amount.toLocaleString('en-IN')}` : 'N/A'}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {scholarship.eligibility_criteria || 'Not specified'}
                      </TableCell>
                      <TableCell>
                        {scholarship.application_deadline 
                          ? new Date(scholarship.application_deadline).toLocaleDateString('en-IN')
                          : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={scholarship.status === 'active' ? 'default' : 'secondary'}
                          className={
                            scholarship.status === 'active' 
                              ? 'bg-success/10 text-success border-success' 
                              : 'bg-muted text-muted-foreground'
                          }
                        >
                          {scholarship.status || 'N/A'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(scholarship)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(scholarship.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
