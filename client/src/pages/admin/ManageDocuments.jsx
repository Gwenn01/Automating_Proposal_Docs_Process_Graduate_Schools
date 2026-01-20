import React, { useState } from 'react';
import { 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  FileText, 
  Calendar,
  ShieldCheck
} from 'lucide-react';
import EditModal from '../../components/Admin/EditModal';

const ManageDocuments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const documents = [
    { id: 1, name: "Dr. Ricardo Cruz", title: "Design of a Smart Monitoring System for Academic Environments", submissionDate: "December 12, 2025", status: "Completed" },
    { id: 2, name: "Kian Fontillas", title: "Solar-Powered Irrigation System with IoT Integration", submissionDate: "December 10, 2025", status: "Under Review" },
    { id: 3, name: "Peter Jamed", title: "Automated Waste Management for PRMSU Campus", submissionDate: "December 10, 2025", status: "Revision" },
    { id: 4, name: "Maria Clara", title: "AI-Powered Plagiarism Detection for Academic Writing", submissionDate: "December 15, 2025", status: "Completed" },
    { id: 5, name: "Mahn Doe", title: "Sustainable Energy Hub Monitoring System", submissionDate: "December 26, 2025", status: "Rejected" },
    { id: 6, name: "John Doe", title: "Development of a Gesture-Based Interface for Remote Learning", submissionDate: "January 05, 2026", status: "Under Review" },
    { id: 7, name: "Jane Foster", title: "Automated Cyber Security Analysis for Higher Education Institutions", submissionDate: "January 08, 2026", status: "Revision" },
    { id: 8, name: "Mark Anthony", title: "Evaluation of Coastal Erosion in Zambales: A Geospatial Study", submissionDate: "January 12, 2026", status: "Completed" },
    { id: 9, name: "Sarah Lopez", title: "Smart Traffic Management System using Machine Learning", submissionDate: "January 14, 2026", status: "Under Review" },
    { id: 10, name: "Engr. Leo Santos", title: "Structural Integrity Analysis of Multi-Story School Buildings", submissionDate: "January 15, 2026", status: "Rejected" },
    { id: 11, name: "Elena Gilbert", title: "Psychological Impact of Hybrid Learning on Student Performance", submissionDate: "January 18, 2026", status: "Under Review" },
    { id: 12, name: "Damon Salvatore", title: "Blockchain-Based Student Records Management System", submissionDate: "January 19, 2026", status: "Completed" },
    { id: 13, name: "Bonnie Bennett", title: "Natural Language Processing for Indigenous Languages Preservation", submissionDate: "January 20, 2026", status: "Revision" },
    { id: 14, name: "Stefan Marcos", title: "Optimized Water Distribution Network for Rural Communities", submissionDate: "January 22, 2026", status: "Under Review" },
    { id: 15, name: "Caroline Forbes", title: "Nutrition and Health Status of Elementary Students in Iba", submissionDate: "January 25, 2026", status: "Completed" },
 ];

 const handleEditClick = (doc) => {
    setSelectedDoc(doc);
    setIsEditModalOpen(true);
 }

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    /* Pinantay ang padding at background style sa Manage Accounts */
    <div className="p-8 lg:p-10 space-y-10 bg-[#fbfcfb] h-auto animate-in fade-in duration-500">
      
      {/* Header Section - Pixel Matched Typography */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">
            Manage Documents
          </h1>
          <p className="text-slate-500 text-sm font-semibold">
            Audit, track, and manage all intellectual property submissions.
          </p>
        </div>
      </div>

      {/* Main Content Container - Soft-UI matching Manage Accounts */}
      <div className="bg-white p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 overflow-hidden relative">

        {/* Action Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 relative z-10">
            <div className="relative w-full max-w-md group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                    <Search className="text-slate-400 group-focus-within:text-[#1cb35a] transition-all duration-300" size={18} />
                </div>
                <input 
                    type="text" 
                    placeholder="Search by author or title..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 h-14 rounded-[20px] border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-[#1cb35a]/10 focus:border-[#1cb35a]/30 transition-all outline-none text-sm font-semibold text-slate-700 placeholder:text-slate-400/80 shadow-sm"
                />
            </div>
        </div>

        {/* Table Section - Professional & Modern Layout */}
        <div className="overflow-x-auto pb-4 custom-scrollbar">
            <table className="w-full border-separate border-spacing-y-[18px]">
                <thead>
                    <tr className="text-slate-400 uppercase text-[11px] tracking-[0.2em] font-black">
                        <th className="pb-2 px-8 text-center font-bold">Ref. ID</th>
                        <th className="pb-2 px-6 text-left font-bold">Document Details</th>
                        <th className="pb-2 px-6 text-center font-bold">Status</th>
                        <th className="pb-2 px-6 text-center font-bold">Registry Date</th>
                        <th className="pb-2 px-6 text-center font-bold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDocuments.map((doc) => (
                        <tr key={doc.id} className="group">
                            
                            {/* ID Column - Enhanced Serial Registry Style */}
                            <td className="py-7 px-8 bg-white first:rounded-l-[24px] border-y border-l border-slate-100/50 shadow-[0_4px_15px_rgba(0,0,0,0.02)] group-hover:border-emerald-100 group-hover:bg-emerald-50/40 transition-all duration-500 relative overflow-hidden">
                                
                                {/* Subtle Vertical Accent Line on Hover */}
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center" />

                                <div className="flex flex-col items-center justify-center gap-1">
                                    {/* The Badge */}
                                    <div className="relative group/id">
                                        <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <span className="relative z-10 flex items-center justify-center min-w-[54px] h-[28px] bg-slate-50 text-slate-500 group-hover:text-emerald-700 group-hover:bg-white text-[11px] font-black tracking-tighter rounded-full border border-slate-100 group-hover:border-emerald-200 transition-all duration-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] group-hover:shadow-md">
                                            <span className="opacity-40 text-[9px] mr-0.5 mt-0.5">#</span>
                                            {doc.id.toString().padStart(3, '0')}
                                        </span>
                                    </div>
                                    
                                    {/* Sub-label for "official" feel */}
                                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                                        Serial No.
                                    </span>
                                </div>
                            </td>

                            {/* Author & Title Details - Premium Editorial Style */}
                            <td className="py-7 px-6 bg-white border-y border-slate-100/50 shadow-[0_4px_15px_rgba(0,0,0,0.02)] group-hover:border-emerald-100 group-hover:bg-emerald-50/40 transition-all duration-500">
                              <div className="flex items-center gap-6">
                                
                                {/* Icon Container with Glassmorphism & Motion */}
                                <div className="relative flex-shrink-0 group/icon">
                                  <div className="w-14 h-14 rounded-[20px] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center border border-slate-200/60 group-hover/icon:border-emerald-200 group-hover/icon:bg-white group-hover/icon:rotate-[10deg] group-hover/icon:scale-110 transition-all duration-500 shadow-sm relative overflow-hidden">
                                    {/* Subtle background pattern inside icon box */}
                                    <div className="absolute inset-0 opacity-0 group-hover/icon:opacity-10 transition-opacity bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:4px_4px]" />
                                    
                                    <FileText size={22} className="text-slate-400 group-hover:text-emerald-500 transition-colors duration-500 relative z-10" />
                                  </div>

                                  {/* Verified Status Pulse Ring */}
                                  <div className="absolute -top-1 -right-1 flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
                                    <div className="relative inline-flex items-center justify-center rounded-full h-4 w-4 bg-white shadow-sm border border-emerald-100">
                                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                    </div>
                                  </div>
                                </div>

                                {/* Text Content - Better Hierarchy */}
                                <div className="flex flex-col max-w-[480px]">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[15px] font-black text-slate-800 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                                      {doc.name}
                                    </span>
                                    {/* Subtle "Author" Label that appears on hover */}
                                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0 text-[9px] font-black bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded uppercase tracking-wider">
                                      Author
                                    </span>
                                  </div>
                                  
                                  <div className="relative">
                                    <p className="text-[12.5px] font-semibold text-slate-500 leading-[1.6] line-clamp-2 group-hover:text-slate-600 transition-colors italic decoration-emerald-500/30">
                                      "{doc.title}"
                                    </p>
                                  </div>

                                  {/* Minimalist Meta Info */}
                                  <div className="flex items-center gap-3 mt-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="flex items-center gap-1">
                                      <div className="w-1 h-1 rounded-full bg-slate-300" />
                                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Academic Research</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Status Badge - Glassmorphism & Adaptive Glow Style */}
                            <td className="py-7 px-6 bg-white border-y border-slate-100/50 shadow-[0_4px_15px_rgba(0,0,0,0.02)] group-hover:border-emerald-100 group-hover:bg-emerald-50/40 transition-all duration-500 text-center">
                              <div className="flex flex-col items-center justify-center gap-2">
                                <div className={`
                                  relative inline-flex items-center px-4 py-2 rounded-xl transition-all duration-500 min-w-[145px] justify-center overflow-hidden whitespace-nowrap
                                  ${doc.status === 'Completed' ? 'bg-emerald-500/5 text-emerald-600 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/30' :
                                    doc.status === 'Under Review' ? 'bg-blue-500/5 text-blue-600 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30' :
                                    doc.status === 'Revision' ? 'bg-amber-500/5 text-amber-600 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-amber-500/30' :
                                    'bg-rose-500/5 text-rose-600 border border-rose-500/20 group-hover:bg-rose-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-rose-500/30'}
                                `}>
                                  {/* Dynamic Animated Glow Ring behind the text */}
                                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-500`} />
                                  
                                  {/* Pulse Dot Indicator */}
                                  <span className="relative flex h-2 w-2 mr-2.5 flex-shrink-0">
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                      doc.status === 'Completed' ? 'bg-emerald-400 group-hover:bg-white' :
                                      doc.status === 'Under Review' ? 'bg-blue-400 group-hover:bg-white' :
                                      doc.status === 'Revision' ? 'bg-amber-400 group-hover:bg-white' :
                                      'bg-rose-400 group-hover:bg-white'
                                    }`}></span>
                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${
                                      doc.status === 'Completed' ? 'bg-emerald-500 group-hover:bg-white' :
                                      doc.status === 'Under Review' ? 'bg-blue-500 group-hover:bg-white' :
                                      doc.status === 'Revision' ? 'bg-amber-500 group-hover:bg-white' :
                                      'bg-rose-500 group-hover:bg-white'
                                    }`}></span>
                                  </span>

                                  {/* Status Text - Optimized Tracking for "Under Review" */}
                                  <span className={`relative text-[10px] font-black uppercase ${
                                    doc.status === 'Under Review' ? 'tracking-wider' : 'tracking-[0.15em]'
                                  }`}>
                                    {doc.status}
                                  </span>
                                </div>

                                {/* Secondary "Progress" label for extra detail */}
                                <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500">
                                  Workflow State
                                </span>
                              </div>
                            </td>

                            {/* Registry Date - Sleek Single-Line Timestamp */}
                            <td className="py-7 px-6 bg-white border-y border-slate-100/50 shadow-[0_4px_15px_rgba(0,0,0,0.02)] group-hover:border-emerald-100 group-hover:bg-emerald-50/40 transition-all duration-500 text-center">
                                <div className="inline-flex flex-col items-center group/date">
                                    
                                    {/* Main Date Display - Unified Row */}
                                    <div className="flex items-center gap-3 bg-slate-50 group-hover:bg-white px-4 py-2.5 rounded-xl border border-slate-100 group-hover:border-emerald-200 group-hover:shadow-sm transition-all duration-500">
                                        <div className="flex-shrink-0 flex items-center justify-center">
                                            <Calendar size={15} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                        </div>
                                        
                                        <div className="flex items-center whitespace-nowrap gap-1.5">
                                            <span className="text-[12px] font-black text-slate-700 group-hover:text-slate-900 transition-colors tracking-tight">
                                                {doc.submissionDate}
                                            </span>
                                            {/* Subtle separator dot only on hover */}
                                            <span className="w-1 h-1 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>

                                    {/* Floating Metadata - Appears on Hover */}
                                    <div className="mt-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                                        <ShieldCheck size={10} className="text-emerald-500" />
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">
                                            System Timestamped
                                        </span>
                                    </div>
                                </div>
                            </td>

                            {/* Actions Column - Premium Floating Buttons with Glow Backgrounds */}
                            <td className="py-7 px-6 bg-white last:rounded-r-[32px] border-y border-r border-slate-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:border-emerald-100 group-hover:bg-emerald-50/40 transition-all duration-500">
                              <div className="flex items-center justify-center gap-4">
                                
                                {/* View Button - Premium Green Hover */}
                                <button className="group/view relative p-3.5 bg-slate-50 text-slate-400 rounded-2xl transition-all duration-500 hover:-translate-y-1.5 active:scale-95 overflow-hidden border border-slate-100 hover:border-emerald-200">
                                  {/* Dynamic Background Layer */}
                                  <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover/view:opacity-100 transition-all duration-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
                                  
                                  {/* Icon Layer */}
                                  <Eye size={18} strokeWidth={2.5} className="relative z-10 transition-colors duration-500 group-hover/view:text-white" />
                                </button>

                                {/* Edit Button - Premium Blue Hover */}
                                <button 
                                  onClick={() => handleEditClick(doc)} 
                                  className="group/edit relative p-3.5 bg-slate-50 text-slate-400 rounded-2xl transition-all duration-500 hover:-translate-y-1.5 active:scale-95 overflow-hidden border border-slate-100 hover:border-blue-200"
                                >
                                  <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover/edit:opacity-100 transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]" />
                                  
                                  <Edit3 size={18} strokeWidth={2.5} className="relative z-10 transition-colors duration-500 group-hover/edit:text-white" />
                                </button>

                                {/* Delete Button - Premium Rose Hover */}
                                <button className="group/delete relative p-3.5 bg-slate-50 text-slate-400 rounded-2xl transition-all duration-500 hover:-translate-y-1.5 active:scale-95 overflow-hidden border border-slate-100 hover:border-rose-200">
                                  <div className="absolute inset-0 bg-rose-500 opacity-0 group-hover/delete:opacity-100 transition-all duration-500 shadow-[0_0_20px_rgba(244,63,94,0.4)]" />
                                  
                                  <Trash2 size={18} strokeWidth={2.5} className="relative z-10 transition-colors duration-500 group-hover/delete:text-white" />
                                </button>

                              </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Premium Empty State */}
        {filteredDocuments.length === 0 && (
            <div className="py-24 text-center bg-slate-50/50 rounded-[32px] border-2 border-dashed border-slate-100 mt-4">
                <div className="inline-flex p-5 rounded-full bg-white shadow-sm border border-slate-100 mb-4">
                    <Search className="text-slate-300" size={28} />
                </div>
                <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Registry entry not found</p>
                <p className="text-slate-300 text-xs mt-2 font-medium italic">Try adjusting your search filters</p>
            </div>
        )}
      </div>

      <EditModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={selectedDoc}
      />
    </div>
  );
};

export default ManageDocuments;