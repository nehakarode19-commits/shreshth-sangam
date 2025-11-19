import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, Heart, Shield, Home, FileText, TrendingUp, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const monthlyData = [
  { month: 'Jan', requests: 45 },
  { month: 'Feb', requests: 52 },
  { month: 'Mar', requests: 48 },
  { month: 'Apr', requests: 61 },
  { month: 'May', requests: 55 },
  { month: 'Jun', requests: 67 },
  { month: 'Jul', requests: 72 },
  { month: 'Aug', requests: 68 },
  { month: 'Sep', requests: 74 },
  { month: 'Oct', requests: 81 },
  { month: 'Nov', requests: 76 },
  { month: 'Dec', requests: 85 },
];

const fundingData = [
  { name: 'Boarding', value: 60, color: 'hsl(var(--primary))' },
  { name: 'Hostels', value: 20, color: 'hsl(var(--accent))' },
  { name: 'Institutions', value: 10, color: 'hsl(var(--success))' },
  { name: 'Others', value: 10, color: 'hsl(var(--muted))' },
];

const hostelsByState = [
  { name: 'Swetamber Murtipujak Jain Boarding', location: 'Ahmedabad', count: '1.2K' },
  { name: 'Shri Jain Swetambar Murtipujak Bhavan', location: 'Ahmedabad', count: '1.2K' },
  { name: 'Digambar Jain Boarding School', location: 'Mumbai', count: '980' },
  { name: 'Shwetamber Jain Hostel', location: 'Pune', count: '850' },
  { name: 'Jain Students Accommodation', location: 'Bangalore', count: '720' },
];

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  const kpiCards = [
    { title: 'Active Institutions', value: '200+', icon: Building, color: 'text-primary', path: '/super-admin/institutions' },
    { title: 'Student Applications', value: '1000+', icon: Users, color: 'text-primary', path: '/super-admin/institutions' },
    { title: 'Donors', value: '50+', icon: Heart, color: 'text-primary', path: '/super-admin/user-management' },
    { title: 'Trustees', value: '40+', icon: Shield, color: 'text-primary', path: '/super-admin/user-management' },
    { title: 'Hostel Requests', value: '10+', icon: Home, color: 'text-primary', path: '/super-admin/institutions' },
    { title: 'Student Requests', value: '20+', icon: FileText, color: 'text-primary', path: '/super-admin/institutions' },
    { title: 'Institution Requests', value: '20+', icon: TrendingUp, color: 'text-primary', path: '/super-admin/institutions' },
    { title: 'Boarding Requests', value: '2000+', icon: CheckCircle, color: 'text-primary', path: '/super-admin/institutions' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">Complete overview and control of the Jain Boarding Federation</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 border-primary/20"
              onClick={() => navigate(card.path)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{card.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Institution Requests Chart */}
        <Card>
          <CardHeader>
            <CardTitle>New Institution Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Funding Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Funding Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fundingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fundingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Hostels by State */}
      <Card>
        <CardHeader>
          <CardTitle>Hostels by State</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hostelsByState.map((hostel, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => navigate('/super-admin/institutions')}
              >
                <div>
                  <p className="font-medium text-foreground">{hostel.name}</p>
                  <p className="text-sm text-muted-foreground">{hostel.location}</p>
                </div>
                <div className="text-lg font-bold text-primary">{hostel.count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
