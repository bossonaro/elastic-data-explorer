import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, FileSpreadsheet } from "lucide-react";
import { mockElasticsearchIndices, generateFullIndexData } from "@/data/mockElasticsearchData";
import { exportToCSV, exportToXLS, exportToXLSX } from "@/utils/exportUtils";
import { toast } from "@/components/ui/use-toast";

interface DataPreviewProps {
  selectedIndex: string;
}

const DataPreview = ({ selectedIndex }: DataPreviewProps) => {
  const indexData = mockElasticsearchIndices.find(idx => idx.name === selectedIndex);

  if (!selectedIndex) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Select an Index</h3>
            <p className="text-muted-foreground text-sm">
              Choose an Elasticsearch index from the sidebar to view its data structure and download options.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (!indexData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center border-destructive/50">
          <h3 className="text-lg font-medium text-destructive">Index Not Found</h3>
          <p className="text-muted-foreground text-sm mt-2">
            The selected index could not be found in the Elasticsearch cluster.
          </p>
        </Card>
      </div>
    );
  }

  const handleDownload = (format: 'csv' | 'xls' | 'xlsx') => {
    const fullData = generateFullIndexData(selectedIndex, 1000);
    
    try {
      switch (format) {
        case 'csv':
          exportToCSV(fullData, selectedIndex);
          break;
        case 'xls':
          exportToXLS(fullData, selectedIndex);
          break;
        case 'xlsx':
          exportToXLSX(fullData, selectedIndex);
          break;
      }
      
      toast({
        title: "Download Started",
        description: `Exporting ${selectedIndex} data as ${format.toUpperCase()}...`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Index Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">{indexData.name}</h1>
        <p className="text-muted-foreground">
          Index contains {indexData.fields.length} fields with sample data preview below
        </p>
      </div>

      {/* Data Preview Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSpreadsheet className="h-5 w-5" />
            <span>Data Structure & Sample</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {indexData.fields.map((field) => (
                    <TableHead key={field} className="font-medium">
                      {field}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {indexData.sampleData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    {indexData.fields.map((field) => (
                      <TableCell key={field} className="font-mono text-sm">
                        {typeof row[field] === 'object' 
                          ? JSON.stringify(row[field]) 
                          : String(row[field] || '-')
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Download the complete dataset (1000+ records) in your preferred format:
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => handleDownload('csv')}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <FileText className="h-4 w-4 mr-2" />
                Download CSV
              </Button>
              
              <Button 
                onClick={() => handleDownload('xls')}
                variant="secondary"
                className="hover:bg-secondary/80"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Download XLS
              </Button>
              
              <Button 
                onClick={() => handleDownload('xlsx')}
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Download XLSX
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataPreview;