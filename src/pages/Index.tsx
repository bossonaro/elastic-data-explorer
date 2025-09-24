import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DataPreview from "@/components/DataPreview";

const Index = () => {
  const [selectedIndex, setSelectedIndex] = useState<string>("");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        selectedIndex={selectedIndex} 
        onIndexSelect={setSelectedIndex} 
      />
      <DataPreview selectedIndex={selectedIndex} />
    </div>
  );
};

export default Index;
