import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import FileUpload from '../components/FileUpload';

const Home = () => {
  const [active, setActive] = useState("Upload Docs");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar 
        active={active} 
        setActive={setActive} 
        isOpen={isOpen} 
        toggleSidebar={() => setIsOpen(!isOpen)} 
      />
      
      <main className="flex-1 flex flex-col overflow-y-auto">
        {active === "Upload Docs" ? <FileUpload /> : (
          <div className="p-10">Content for {active}</div>
        )}
      </main>
    </div>
  );
};

export default Home;