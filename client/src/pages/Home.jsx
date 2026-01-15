import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import FileUpload from "../components/FileUpload";
import ViewDocs from "../components/ViewDocs";

const Home = () => {
  const [active, setActive] = useState("View Docs");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ DEFINE THIS FUNCTION
  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  /* ================= FETCH USER ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log("LOGGED IN USER:", parsedUser);
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      <Sidebar
        role={user?.role}   // instructor | reviewer | administrator
        active={active}
        setActive={setActive}
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
      />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {active === "Upload Docs" && <FileUpload />}
        {active === "View Docs" && <ViewDocs />}

        {active === "Overview" && (
          <div className="p-10 text-2xl font-bold">Admin Overview</div>
        )}

        {active === "Review Docs" && (
          <div className="p-10 text-2xl font-bold">Reviewer Panel</div>
        )}
      </main>
    </div>
  );
};

export default Home;
