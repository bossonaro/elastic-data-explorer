import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Database, Search } from "lucide-react";
import { mockElasticsearchIndices } from "@/data/mockElasticsearchData";

interface SidebarProps {
  selectedIndex: string;
  onIndexSelect: (index: string) => void;
}

const Sidebar = ({ selectedIndex, onIndexSelect }: SidebarProps) => {
  return (
    <div className="w-1/5 min-h-screen bg-card border-r border-border p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Database className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Elasticsearch</h2>
            <p className="text-sm text-muted-foreground">Data Explorer</p>
          </div>
        </div>

        {/* Index Selection */}
        <Card className="p-4 bg-secondary/30">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <span>Select Index</span>
            </div>
            
            <Select value={selectedIndex} onValueChange={onIndexSelect}>
              <SelectTrigger className="w-full bg-background border-border">
                <SelectValue placeholder="Choose an index..." />
              </SelectTrigger>
              <SelectContent>
                {mockElasticsearchIndices.map((index) => (
                  <SelectItem key={index.name} value={index.name}>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{index.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Index Info */}
        {selectedIndex && (
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="space-y-2">
              <h3 className="font-medium text-primary">Active Index</h3>
              <p className="text-sm text-foreground font-mono bg-background/50 px-2 py-1 rounded">
                {selectedIndex}
              </p>
              <p className="text-xs text-muted-foreground">
                {mockElasticsearchIndices.find(idx => idx.name === selectedIndex)?.fields.length || 0} fields
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Sidebar;