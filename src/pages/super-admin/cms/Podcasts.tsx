import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const mockPodcasts = [
  { id: 1, name: 'Education Excellence', podcastFor: 'Hostel', type: 'YouTube', link: 'https://youtube.com/...', description: 'Discussion on modern education' },
  { id: 2, name: 'Student Success Stories', podcastFor: 'Institution', type: 'Vimeo', link: 'https://vimeo.com/...', description: 'Inspiring student journeys' },
  { id: 3, name: 'Cultural Heritage', podcastFor: 'Boarding', type: 'Skyscape', link: 'https://skyscape.com/...', description: 'Jain cultural values' },
];

export default function Podcasts() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = () => {
    toast.success('Podcast saved successfully!');
    setIsDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Podcasts Management</h1>
          <p className="text-muted-foreground">Manage multimedia content and podcasts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Podcast
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Podcast</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="podcastName">Podcast Name</Label>
                <Input id="podcastName" placeholder="Enter podcast name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="podcastFor">Podcast For</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hostel">Hostel</SelectItem>
                      <SelectItem value="institution">Institution</SelectItem>
                      <SelectItem value="boarding">Boarding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="podcastType">Podcast Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="vimeo">Vimeo</SelectItem>
                      <SelectItem value="skyscape">Skyscape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="podcastLink">Podcast Link</Label>
                <Input id="podcastLink" placeholder="https://..." />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter podcast description" rows={3} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Podcasts ({mockPodcasts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Podcast For</TableHead>
                <TableHead>Podcast Type</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPodcasts.map((podcast, index) => (
                <TableRow key={podcast.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{podcast.name}</TableCell>
                  <TableCell>{podcast.podcastFor}</TableCell>
                  <TableCell>{podcast.type}</TableCell>
                  <TableCell className="text-primary underline cursor-pointer">{podcast.link}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
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
