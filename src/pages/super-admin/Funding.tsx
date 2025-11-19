import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const fundingDistribution = [
  { name: 'Boarding', value: 60, amount: 120000, color: 'hsl(var(--primary))' },
  { name: 'Hostels', value: 20, amount: 40000, color: 'hsl(var(--accent))' },
  { name: 'Institutions', value: 10, amount: 20000, color: 'hsl(var(--success))' },
  { name: 'Others', value: 10, amount: 20000, color: 'hsl(var(--muted))' },
];

const monthlyTrend = [
  { month: 'Jan', amount: 15000 },
  { month: 'Feb', amount: 18000 },
  { month: 'Mar', amount: 16000 },
  { month: 'Apr', amount: 22000 },
  { month: 'May', amount: 20000 },
  { month: 'Jun', amount: 25000 },
];

const fundingRequests = [
  { id: 1, hostel: 'Swetamber Murtipujak Jain Boarding', purpose: 'Infrastructure Development', amount: 500000, status: 'approved' },
  { id: 2, name: 'Digambar Jain Boarding School', purpose: 'Library Renovation', amount: 200000, status: 'pending' },
  { id: 3, hostel: 'Shwetamber Jain Hostel', purpose: 'Sports Facility', amount: 300000, status: 'approved' },
  { id: 4, hostel: 'Jain Students Accommodation', purpose: 'Dining Hall Upgrade', amount: 150000, status: 'rejected' },
];

export default function Funding() {
  const totalFunding = fundingDistribution.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Funding Status</h1>
        <p className="text-muted-foreground">Monitor funding distribution and requests</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {fundingDistribution.map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹{item.amount.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">{item.value}% of total</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Funding Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fundingDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fundingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Funding Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Funding Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Funding Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No</TableHead>
                <TableHead>Institution/Hostel</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fundingRequests.map((request, index) => (
                <TableRow key={request.id} className="cursor-pointer hover:bg-accent">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{request.hostel || request.name}</TableCell>
                  <TableCell>{request.purpose}</TableCell>
                  <TableCell>₹{request.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={request.status === 'approved' ? 'default' : request.status === 'pending' ? 'secondary' : 'destructive'}
                      className={request.status === 'approved' ? 'bg-primary' : ''}
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
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
