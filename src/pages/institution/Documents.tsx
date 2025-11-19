import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download, Eye } from "lucide-react";

const mockDocuments = [
  { id: 1, name: 'Affiliation Certificate', type: 'PDF', size: '2.4 MB', date: '2024-01-15' },
  { id: 2, name: 'Registration Documents', type: 'PDF', size: '1.8 MB', date: '2024-01-10' },
  { id: 3, name: 'Annual Report 2023', type: 'PDF', size: '5.2 MB', date: '2024-02-01' },
  { id: 4, name: 'Compliance Certificate', type: 'PDF', size: '1.2 MB', date: '2024-02-15' },
];

export default function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground">Manage institution documents and certificates</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-base mt-2">{doc.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{doc.type} • {doc.size}</p>
              <p className="text-xs text-muted-foreground">Uploaded: {doc.date}</p>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 gap-1">
                <Eye className="h-3 w-3" />
                View
              </Button>
              <Button size="sm" variant="outline" className="flex-1 gap-1">
                <Download className="h-3 w-3" />
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
