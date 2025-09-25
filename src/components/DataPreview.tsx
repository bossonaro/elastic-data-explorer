import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, FileSpreadsheet, Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { mockElasticsearchIndices, generateFullIndexData } from "@/data/mockElasticsearchData";
import { exportToCSV, exportToXLS, exportToXLSX } from "@/utils/exportUtils";
import { toast } from "@/components/ui/use-toast";
import { useState, useRef } from "react";

interface DataPreviewProps {
  selectedIndex: string;
}

const DataPreview = ({ selectedIndex }: DataPreviewProps) => {
  const indexData = mockElasticsearchIndices.find(idx => idx.name === selectedIndex);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Import states
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');
  const [validationMessage, setValidationMessage] = useState<string>('');

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

  // Import handlers
  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(csv|xls|xlsx)$/i)) {
      toast({
        title: "Invalid File Type",
        description: "Please select a CSV, XLS, or XLSX file.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
    setUploadStatus('idle');
    setValidationMessage('');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setValidationMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImportFile = async () => {
    if (!selectedFile || !indexData) return;

    setUploadStatus('validating');
    setValidationMessage('Validating file structure...');

    try {
      // TODO: BACKEND IMPLEMENTATION REQUIRED
      // 1. Read and parse the uploaded file (CSV, XLS, XLSX)
      // 2. Extract headers/fields from the file
      // 3. Compare fields with indexData.fields to ensure exact match
      // 4. If validation passes, prepare data for Elasticsearch upsert
      // 5. Call your backend API to perform the upsert operation
      // 6. Handle success/error responses
      
      /* 
      Example implementation structure:
      
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('indexName', selectedIndex);
      formData.append('expectedFields', JSON.stringify(indexData.fields));
      
      const response = await fetch('/api/import-data', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        setUploadStatus('success');
        setValidationMessage(`Successfully imported ${result.recordsCount} records`);
      } else {
        setUploadStatus('error');
        setValidationMessage(result.error || 'Import failed');
      }
      */
      
      // Temporary mock response for UI demonstration
      setTimeout(() => {
        setUploadStatus('success');
        setValidationMessage(`File validated successfully. Ready for import to ${selectedIndex} index.`);
      }, 2000);

    } catch (error) {
      setUploadStatus('error');
      setValidationMessage('An error occurred during file validation.');
      
      toast({
        title: "Import Failed",
        description: "There was an error processing the file. Please try again.",
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
          <div className="w-full max-w-full">
            <div className="rounded-lg border overflow-x-auto max-h-96">
              <Table className="table-fixed w-max min-w-full">
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    {indexData.fields.map((field) => (
                      <TableHead key={field} className="font-medium whitespace-nowrap px-4 py-2 w-40 max-w-40 truncate">
                        <div className="truncate" title={field}>
                          {field}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indexData.sampleData.map((row, index) => (
                    <TableRow key={index} className="hover:bg-muted/30">
                      {indexData.fields.map((field) => (
                        <TableCell key={field} className="font-mono text-sm px-4 py-2 w-40 max-w-40">
                          <div className="truncate" title={typeof row[field] === 'object' ? JSON.stringify(row[field]) : String(row[field] || '-')}>
                            {typeof row[field] === 'object' 
                              ? JSON.stringify(row[field]) 
                              : String(row[field] || '-')
                            }
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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

      {/* Import Data Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Import Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload a file to import data into the <strong>{selectedIndex}</strong> index. 
              Fields must match exactly: <span className="font-mono text-xs">{indexData?.fields.join(', ')}</span>
            </p>
            
            {/* File Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer
                ${isDragOver 
                  ? 'border-primary bg-primary/5 shadow-glow' 
                  : selectedFile 
                    ? 'border-primary/50 bg-primary/5' 
                    : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30'
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleFileInputClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={handleFileInputChange}
                className="hidden"
              />
              
              {!selectedFile ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Drop files here or click to browse</p>
                    <p className="text-sm text-muted-foreground">
                      Supports CSV, XLS, and XLSX files
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-3">
                    <FileSpreadsheet className="h-8 w-8 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelectedFile();
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Upload Status */}
            {uploadStatus !== 'idle' && (
              <div className={`flex items-center space-x-2 p-3 rounded-lg ${
                uploadStatus === 'success' ? 'bg-green-50 border border-green-200' :
                uploadStatus === 'error' ? 'bg-red-50 border border-red-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                {uploadStatus === 'validating' && (
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                )}
                {uploadStatus === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                {uploadStatus === 'error' && <AlertCircle className="h-4 w-4 text-red-600" />}
                <span className={`text-sm font-medium ${
                  uploadStatus === 'success' ? 'text-green-800' :
                  uploadStatus === 'error' ? 'text-red-800' :
                  'text-blue-800'
                }`}>
                  {validationMessage}
                </span>
              </div>
            )}
            
            {/* Import Button */}
            <div className="flex space-x-3">
              <Button 
                onClick={handleImportFile}
                disabled={!selectedFile || uploadStatus === 'validating'}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                {uploadStatus === 'validating' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Validating...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Import to {selectedIndex}
                  </>
                )}
              </Button>
              
              {selectedFile && (
                <Button 
                  variant="outline"
                  onClick={removeSelectedFile}
                  className="border-muted-foreground/30"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataPreview;