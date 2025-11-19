import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

const mockBlogs = [
  { id: 1, blogFor: 'Hostel', address: 'Ahmedabad', title: 'Best Practices in Hostel Management', date: '2024-11-10' },
  { id: 2, blogFor: 'Institution', address: 'Mumbai', title: 'Excellence in Education', date: '2024-11-12' },
];

export default function Blogs() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blogs Management</h1>
        <Button className="gap-2"><Plus className="h-4 w-4" />Add Blog</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>All Blogs</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blog For</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Blog Title</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBlogs.map(blog => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.blogFor}</TableCell>
                  <TableCell>{blog.address}</TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                      <Button size="sm" variant="outline"><Trash2 className="h-4 w-4" /></Button>
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
