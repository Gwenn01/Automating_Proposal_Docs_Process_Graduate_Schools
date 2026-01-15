import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { AssignToReview, ManageAccount, ManageDocuments, Overview, ViewReview } from "./admin";
import ReviewDocuments from "./ReviewDocuments";
import { CreateProposal, EditProposal, ViewProposal } from "./instructor";

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
        {/*Instructor*/}
        {active === "Create Proposal" && <CreateProposal />}
        {active === "View Proposal" && <ViewProposal />}
        {active === "Edit Proposal" && <EditProposal />}

        {/*Admin*/}
        {active === "Overview" && <Overview />}
        {active === "Manage Account" && <ManageAccount />}
        {active === "Manage Documents" && <ManageDocuments />}
        {active === "Assign to Review" && <AssignToReview />}
        {active === "View Review" && <ViewReview />}

        {/*Reviewer*/}

        {active === "Review Documents" && <ReviewDocuments />}

      </main>
    </div>
  );
};

export default Home;
