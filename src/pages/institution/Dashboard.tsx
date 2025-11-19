import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Building, Briefcase, Calendar, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const enrollmentData = [
  { month: 'Jan', students: 450 },
  { month: 'Feb', students: 480 },
  { month: 'Mar', students: 520 },
  { month: 'Apr', students: 550 },
  { month: 'May', students: 580 },
  { month: 'Jun', students: 620 },
];

const departmentData = [
  { name: 'Science', value: 35, color: '#8B0000' },
  { name: 'Arts', value: 25, color: '#FF6B6B' },
  { name: 'Commerce', value: 20, color: '#FFA500' },
  { name: 'Engineering', value: 20, color: '#4ECDC4' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Institution Dashboard</h1>
        <p className="text-muted-foreground">Overview of your institution's performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">1,245</div>
            <p className="text-xs text-success mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-maroon/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Staff Count</CardTitle>
            <Briefcase className="h-5 w-5 text-maroon" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-maroon">156</div>
            <p className="text-xs text-muted-foreground mt-1">Teaching & Non-teaching</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-saffron/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Departments</CardTitle>
            <Building className="h-5 w-5 text-saffron" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-saffron">24</div>
            <p className="text-xs text-muted-foreground mt-1">Active departments</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-success/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance</CardTitle>
            <GraduationCap className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">98%</div>
            <p className="text-xs text-muted-foreground mt-1">All standards met</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Events This Month</CardTitle>
            <Calendar className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">8</div>
            <p className="text-xs text-muted-foreground mt-1">Upcoming & ongoing</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-teal/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Funding Received</CardTitle>
            <DollarSign className="h-5 w-5 text-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal">₹45L</div>
            <p className="text-xs text-muted-foreground mt-1">This fiscal year</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollment Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
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
    </div>
  );
}
