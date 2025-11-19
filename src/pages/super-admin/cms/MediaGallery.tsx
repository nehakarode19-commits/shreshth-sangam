import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function MediaGallery() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Media Gallery</h1>
        <Button className="gap-2"><Plus className="h-4 w-4" />Add Media</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Gallery Items</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square bg-muted rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
