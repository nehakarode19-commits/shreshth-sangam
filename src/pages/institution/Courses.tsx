import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";

const mockCourses = [
  { id: 1, name: 'Mathematics Advanced', code: 'MATH-401', department: 'Science', students: 45, duration: '1 Year' },
  { id: 2, name: 'Physics Honors', code: 'PHY-301', department: 'Science', students: 38, duration: '1 Year' },
  { id: 3, name: 'Computer Science', code: 'CS-501', department: 'Technology', students: 52, duration: '1 Year' },
  { id: 4, name: 'English Literature', code: 'ENG-201', department: 'Arts', students: 42, duration: '1 Year' },
];

export default function Courses() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground">Manage academic courses and curriculum</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Courses ({mockCourses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No</TableHead>
                <TableHead>Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCourses.map((course, index) => (
                <TableRow key={course.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.department}</Badge>
                  </TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
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
