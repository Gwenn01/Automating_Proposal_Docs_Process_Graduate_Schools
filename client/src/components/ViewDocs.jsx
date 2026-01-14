import React from 'react';
import { List } from 'lucide-react';

const ViewDocs = () => {
  const documents = [
    { id: 1, name: "Docs1", reviewer: "Peterjames Angelo Marteja", status: "Initial Review", color: "bg-yellow-400" },
    { id: 2, name: "Docs1", reviewer: "Peterjames Angelo Marteja", status: "Completed", color: "bg-green-500" },
    { id: 3, name: "Docs1", reviewer: "Peterjames Angelo Marteja", status: "Final Review", color: "bg-yellow-400" },
    { id: 4, name: "Docs1", reviewer: "Peterjames Angelo Marteja", status: "Completed", color: "bg-green-500" },
    { id: 5, name: "Docs1", reviewer: "Peterjames Angelo Marteja", status: "Rejected", color: "bg-red-600" },
  ];

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
              <th className="pb-4 px-4">Name</th>
              <th className="pb-4 px-4">Review</th>
              <th className="pb-4 px-4 text-center">Status</th>
              <th className="pb-4 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="text-gray-700 text-sm">
                <td className="py-4 px-4">{doc.name}</td>
                <td className="py-4 px-4">{doc.reviewer}</td>
                <td className="py-4 px-4 text-center">
                  <span className={`${doc.color} text-white px-4 py-1.5 rounded-full text-[11px] font-bold inline-block min-w-[100px]`}>
                    {doc.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <button className="flex items-center gap-1 justify-center mx-auto text-green-600 hover:text-green-800 font-bold text-[11px] uppercase tracking-wider">
                    <List className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDocs;