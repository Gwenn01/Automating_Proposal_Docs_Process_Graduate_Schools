import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import FileUpload from '../components/FileUpload';
import ViewDocs from '../components/ViewDocs'; // Import the new component

const Home = () => {
  // Set default view to "View Docs" to match your current screenshot
  const [active, setActive] = useState("View Docs");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      <Sidebar 
        active={active} 
        setActive={setActive} 
        isOpen={isOpen} 
        toggleSidebar={() => setIsOpen(!isOpen)} 
      />
      
      <main className="flex-1 flex flex-col overflow-y-auto">
        {active === "Upload Docs" && <FileUpload />}
        {active === "View Docs" && <ViewDocs />}
        {active === "Dashboard" && (
          <div className="p-10 text-2xl font-bold">Dashboard Overview</div>
        )}
      </main>
    </div>
  );
};

export default Home;