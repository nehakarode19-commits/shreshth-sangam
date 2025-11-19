import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockPress = [
  { id: 1, title: 'Federation Expands Nationwide', date: '2024-11-15', type: 'News', link: 'https://...' },
];

export default function PressCoverage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Press Coverage</h1>
        <Button className="gap-2"><Plus className="h-4 w-4" />Add Press</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>All Press Coverage</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Media Type</TableHead>
                <TableHead>Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPress.map(press => (
                <TableRow key={press.id}>
                  <TableCell>{press.title}</TableCell>
                  <TableCell>{press.date}</TableCell>
                  <TableCell>{press.type}</TableCell>
                  <TableCell className="text-primary underline">{press.link}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
