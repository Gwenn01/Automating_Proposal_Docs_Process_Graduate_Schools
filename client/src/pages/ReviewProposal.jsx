import React from 'react';
import { Search, Grid, Table, MoreVertical, Eye, FileText, Users } from 'lucide-react';

// --- Mock Data for Proposals ---
// In a real app, this would be fetched from an API
const proposals = [
  {
    id: 1,
    status: 'Pending Evaluation',
    title: 'Peterjames Angelo O. Mataga',
    description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...",
    date: 'January 15, 2024',
  },
  {
    id: 2,
    status: 'Reviewer Completed',
    title: 'Proposal for New Campus Initiative',
    description: 'A detailed proposal for a new initiative aimed at improving campus life and student engagement. Requires funding approval.',
    date: 'January 16, 2024',
  },
  {
    id: 3,
    status: 'Reviewer Completed',
    title: 'Research Grant Application: AI in Education',
    description: 'Application for a research grant to study the impact of artificial intelligence tools in secondary education classrooms.',
    date: 'January 16, 2024',
  },
  {
    id: 4,
    status: 'Reviewer Completed',
    title: 'Community Outreach Program',
    description: 'Proposal to establish a student-led community outreach program partnering with local non-profits.',
    date: 'January 18, 2024',
  },
  {
    id: 5,
    status: 'Reviewer Completed',
    title: 'Annual Science Fair Budget',
    description: 'Budget proposal and logistical plan for the upcoming annual university science fair.',
    date: 'January 18, 2024',
  },
];

const ReviewProposal = () => {
  // Helper function to get status badge styles
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending Evaluation':
        return 'bg-[#FFF7ED] text-[#EA580C]'; // Orange
      case 'Reviewer Completed':
        return 'bg-[#ECFDF5] text-[#059669]'; // Green
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex-1 p-10 bg-white min-h-screen font-sans">
      {/* --- Header Section --- */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[32px] font-bold text-gray-900">Review Proposal</h1>
        
        {/* User Profile (Mock) */}
        {/* This would typically be part of a top navigation bar component */}
        <div className="flex items-center space-x-3 bg-white p-1.5 rounded-full shadow-sm border border-gray-200">
          {/* Placeholder for User Image */}
          <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
            <img src="https://i.pravatar.cc/150?img=68" alt="User" className="w-full h-full object-cover" />
          </div>
          <span className="font-semibold text-gray-700 pr-2">Arnel Gwen Nuqui</span>
        </div>
      </div>

      {/* --- Controls Section: Search, Filters, View Toggle --- */}
      <div className="flex flex-col xl:flex-row justify-between items-center mb-8 space-y-6 xl:space-y-0">
        {/* Search Bar */}
        <div className="relative w-full xl:w-96">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-200 outline-none shadow-sm bg-white text-gray-600"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Filters & View Toggle */}
        <div className="flex flex-wrap items-center gap-6 w-full xl:w-auto justify-between xl:justify-end">
          {/* Filter Tabs */}
          <div className="flex space-x-8 text-sm font-bold text-gray-500">
            <button className="text-green-600 border-b-2 border-green-600 pb-1">All (5)</button>
            <button className="hover:text-gray-700 pb-1 transition-colors">Completed (5)</button>
            <button className="hover:text-gray-700 pb-1 transition-colors">Pending Evaluation (0)</button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl">
            <button className="p-2.5 bg-white rounded-lg shadow-sm text-green-600">
              <Grid className="w-5 h-5" />
            </button>
            <button className="p-2.5 text-gray-400 hover:text-gray-600 transition-colors">
              <Table className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Proposal Cards Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {proposals.map((proposal) => (
          // --- Individual Card ---
          <div key={proposal.id} className="bg-white rounded-[32px] p-7 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between h-full">
            <div>
              {/* Card Header: Status & Menu */}
              <div className="flex justify-between items-start mb-5">
                <span className={`px-4 py-2.5 rounded-full text-xs font-extrabold tracking-wide ${getStatusStyle(proposal.status)}`}>
                  {proposal.status}
                </span>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                  <MoreVertical className="w-6 h-6" />
                </button>
              </div>

              {/* Card Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1 leading-tight" title={proposal.title}>
                {proposal.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                {proposal.description}
              </p>
            </div>

            {/* Card Footer: Date & Actions */}
            <div>
              <p className="text-gray-400 text-xs font-bold mb-5">{proposal.date}</p>
              
              <div className="flex space-x-3">
                {/* View Button */}
                <button className="flex-1 flex items-center justify-center space-x-2 bg-[#16A34A] text-white py-3 rounded-2xl font-bold text-sm hover:bg-[#15803d] transition-colors">
                  <Eye className="w-[18px] h-[18px]" />
                  <span>View</span>
                </button>
                
                {/* Review Button */}
                <button className="flex-1 flex items-center justify-center space-x-2 bg-[#DC2626] text-white py-3 rounded-2xl font-bold text-sm hover:bg-[#b91c1c] transition-colors">
                  <FileText className="w-[18px] h-[18px]" />
                  <span>Review</span>
                </button>
                
                {/* View Others Button */}
                <button className="flex-none flex items-center justify-center bg-gray-900 text-white p-3 rounded-2xl hover:bg-gray-700 transition-colors" title="View Others">
                  <Users className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>
          </div>
        ))}     
      </div>
    </div>
  );
};

export default ReviewProposal;