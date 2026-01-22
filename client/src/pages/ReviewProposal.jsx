import React, { useState, useMemo } from 'react';
import { Search, Grid, Table, MoreVertical, Eye, FileText, Users, X } from 'lucide-react';

// --- Mock Data for Proposals ---
const proposalsData = [
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
  {
    id: 6,
    status: 'Pending Evaluation',
    title: 'Student Wellness Center Expansion',
    description: 'Comprehensive proposal for expanding the student wellness center facilities and services to accommodate growing student needs.',
    date: 'January 19, 2024',
  },
];

const ReviewProposal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProposal, setSelectedProposal] = useState(null);

  // Filter and search logic
  const filteredProposals = useMemo(() => {
    let filtered = proposalsData;

    // Apply status filter
    if (activeFilter === 'completed') {
      filtered = filtered.filter(p => p.status === 'Reviewer Completed');
    } else if (activeFilter === 'pending') {
      filtered = filtered.filter(p => p.status === 'Pending Evaluation');
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeFilter]);

  // Count proposals by status
  const counts = useMemo(() => {
    return {
      all: proposalsData.length,
      completed: proposalsData.filter(p => p.status === 'Reviewer Completed').length,
      pending: proposalsData.filter(p => p.status === 'Pending Evaluation').length,
    };
  }, []);

  // Helper function to get status badge styles
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending Evaluation':
        return 'bg-[#FFF7ED] text-[#EA580C]';
      case 'Reviewer Completed':
        return 'bg-[#ECFDF5] text-[#059669]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleView = (proposal) => {
    setSelectedProposal(proposal);
  };

  const handleReview = (proposal) => {
    alert(`Opening review form for: ${proposal.title}`);
  };

  const handleViewOthers = (proposal) => {
    alert(`Viewing other reviewers for: ${proposal.title}`);
  };

  return (
    <div className="flex-1 p-10 bg-white min-h-screen font-sans">
      {/* --- Header Section --- */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[32px] font-bold text-gray-900">Review Proposal</h1>
        
        {/* User Profile */}
        <div className="flex items-center space-x-3 bg-white p-1.5 rounded-full shadow-sm border border-gray-200">
          <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
            <img src="https://i.pravatar.cc/150?img=68" alt="User" className="w-full h-full object-cover" />
          </div>
          <span className="font-semibold text-gray-700 pr-2">Arnel Gwen Nuqui</span>
        </div>
      </div>

      {/* --- Controls Section --- */}
      <div className="flex flex-col xl:flex-row justify-between items-center mb-8 space-y-6 xl:space-y-0">
        {/* Search Bar */}
        <div className="relative w-full xl:w-96">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-200 outline-none shadow-sm bg-white text-gray-600"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters & View Toggle */}
        <div className="flex flex-wrap items-center gap-6 w-full xl:w-auto justify-between xl:justify-end">
          {/* Filter Tabs */}
          <div className="flex space-x-8 text-sm font-bold text-gray-500">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`pb-1 transition-colors ${activeFilter === 'all' ? 'text-green-600 border-b-2 border-green-600' : 'hover:text-gray-700'}`}
            >
              All ({counts.all})
            </button>
            <button 
              onClick={() => setActiveFilter('completed')}
              className={`pb-1 transition-colors ${activeFilter === 'completed' ? 'text-green-600 border-b-2 border-green-600' : 'hover:text-gray-700'}`}
            >
              Completed ({counts.completed})
            </button>
            <button 
              onClick={() => setActiveFilter('pending')}
              className={`pb-1 transition-colors ${activeFilter === 'pending' ? 'text-green-600 border-b-2 border-green-600' : 'hover:text-gray-700'}`}
            >
              Pending Evaluation ({counts.pending})
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`p-2.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Table className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* No Results Message */}
      {filteredProposals.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No proposals found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter</p>
        </div>
      )}

      {/* --- Grid View --- */}
      {viewMode === 'grid' && filteredProposals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProposals.map((proposal) => (
            <div key={proposal.id} className="bg-white rounded-[32px] p-7 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-5">
                  <span className={`px-4 py-2.5 rounded-full text-xs font-extrabold tracking-wide ${getStatusStyle(proposal.status)}`}>
                    {proposal.status}
                  </span>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <MoreVertical className="w-6 h-6" />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1 leading-tight" title={proposal.title}>
                  {proposal.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                  {proposal.description}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs font-bold mb-5">{proposal.date}</p>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleView(proposal)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-[#16A34A] text-white py-3 rounded-2xl font-bold text-sm hover:bg-[#15803d] transition-colors"
                  >
                    <Eye className="w-[18px] h-[18px]" />
                    <span>View</span>
                  </button>
                  
                  <button 
                    onClick={() => handleReview(proposal)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-[#DC2626] text-white py-3 rounded-2xl font-bold text-sm hover:bg-[#b91c1c] transition-colors"
                  >
                    <FileText className="w-[18px] h-[18px]" />
                    <span>Review</span>
                  </button>
                  
                  <button 
                    onClick={() => handleViewOthers(proposal)}
                    className="flex-none flex items-center justify-center bg-gray-900 text-white p-3 rounded-2xl hover:bg-gray-700 transition-colors" 
                    title="View Others"
                  >
                    <Users className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}     
        </div>
      )}

      {/* --- Table View --- */}
      {viewMode === 'table' && filteredProposals.length > 0 && (
        <div className="bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-8 py-5 text-sm font-bold text-gray-600">Status</th>
                <th className="text-left px-8 py-5 text-sm font-bold text-gray-600">Title</th>
                <th className="text-left px-8 py-5 text-sm font-bold text-gray-600">Description</th>
                <th className="text-left px-8 py-5 text-sm font-bold text-gray-600">Date</th>
                <th className="text-left px-8 py-5 text-sm font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProposals.map((proposal) => (
                <tr key={proposal.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-extrabold tracking-wide ${getStatusStyle(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm font-semibold text-gray-900 max-w-xs">
                    {proposal.title}
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-500 max-w-md">
                    <div className="line-clamp-2">{proposal.description}</div>
                  </td>
                  <td className="px-8 py-5 text-xs font-bold text-gray-400 whitespace-nowrap">
                    {proposal.date}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleView(proposal)}
                        className="p-2 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803d] transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleReview(proposal)}
                        className="p-2 bg-[#DC2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors"
                        title="Review"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleViewOthers(proposal)}
                        className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        title="View Others"
                      >
                        <Users className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- Proposal Detail Modal --- */}
      {selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedProposal(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <span className={`px-4 py-2.5 rounded-full text-xs font-extrabold tracking-wide ${getStatusStyle(selectedProposal.status)}`}>
                {selectedProposal.status}
              </span>
              <button 
                onClick={() => setSelectedProposal(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedProposal.title}</h2>
            <p className="text-gray-500 text-sm mb-6">{selectedProposal.date}</p>
            <p className="text-gray-700 leading-relaxed mb-8">{selectedProposal.description}</p>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => handleReview(selectedProposal)}
                className="flex-1 flex items-center justify-center space-x-2 bg-[#DC2626] text-white py-3 rounded-2xl font-bold text-sm hover:bg-[#b91c1c] transition-colors"
              >
                <FileText className="w-[18px] h-[18px]" />
                <span>Review</span>
              </button>
              <button 
                onClick={() => handleViewOthers(selectedProposal)}
                className="flex items-center justify-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-gray-700 transition-colors"
              >
                <Users className="w-[18px] h-[18px]" />
                <span>View Others</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewProposal;