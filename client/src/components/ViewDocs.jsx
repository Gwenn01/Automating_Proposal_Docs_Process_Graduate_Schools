import React from 'react';
import { List } from 'lucide-react';
import { useEffect, useState } from "react";
import axios from "axios";

const ViewDocs = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
   /* ================= FETCH USER ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log("LOGGED IN USER:", parsedUser);
    }
  }, []);

   useEffect(() => {
    if (!user?.user_id) return;

    axios
      .get(`http://127.0.0.1:5000/api/my-proposals/${user.user_id}`)
      .then((res) => {
        setDocuments(res.data.proposals);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <p>Loading documents...</p>;
  }


  const getStatusStyle = (status) => {
  switch (status) {
    case "submitted":
      return { label: "Initial Review", color: "bg-yellow-400" };
    case "under_review":
      return { label: "Under Review", color: "bg-blue-400" };
    case "for_revision":
      return { label: "For Revision", color: "bg-orange-400" };
    case "approved":
      return { label: "Completed", color: "bg-green-500" };
    default:
      return { label: status, color: "bg-gray-400" };
  }
};

  return (
    <div className="flex-1 bg-white p-10">
      {/* User Profile Header */}
      <div className="flex justify-end items-center gap-3 mb-16">
        <span className="font-semibold text-gray-700">Arnel Gwen Nuqui</span>
        <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border border-gray-200">
          <img src="https://via.placeholder.com/40" alt="profile" />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-gray-50 rounded-[30px] p-8 shadow-sm border border-gray-100">
        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-gray-500 text-sm font-medium">
              <th className="pb-4 px-4">title</th>
              <th className="pb-4 px-4">file</th>
              <th className="pb-4 px-4 text-center">Status</th>
              <th className="pb-4 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => {
              const statusInfo = getStatusStyle(doc.status);
              const filename = doc.file_path.split("/").pop();

              return (
                <tr key={doc.proposal_id} className="text-gray-700 text-sm">
                  {/* TITLE */}
                  <td className="py-4 px-4">{doc.title}</td>

                  {/* FILE */}
                  <td className="py-4 px-4 text-blue-600 underline">
                    {filename}
                  </td>

                  {/* STATUS */}
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`${statusInfo.color} text-white px-4 py-1.5 rounded-full text-[11px] font-bold inline-block min-w-[100px]`}
                    >
                      {statusInfo.label}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="py-4 px-4 text-center">
                    <a
                      href={`http://127.0.0.1:5000/api/view-proposal/${filename}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 justify-center mx-auto text-green-600 hover:text-green-800 font-bold text-[11px] uppercase tracking-wider"
                    >
                      <List className="w-4 h-4" />
                      View
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDocs;