import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Trash2,
  FileText,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import axios from "axios";

const ManageDocuments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/get-all-docs");
        setDocuments(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load documents");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

   if (loading) {
    return (
      <>
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
          <div
            className="relative bg-white backdrop-blur-xl px-14 py-10 rounded-2xl shadow-2xl flex flex-col items-center animate-pop-out"
          >
            {/* Gradient Ring Loader */}
            <div className="relative animate-float mb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 animate-spin" />
              <div className="absolute inset-2 bg-white rounded-full" />
            </div>

            {/* Text */}
            <p className="text-lg font-semibold shimmer-text loading-dots mb-2">
              Indexing Registry
            </p>

            <p className="text-sm text-gray-500">
              Preparing official records and submission statuses.
            </p>
          </div>
        </div>
      </>
    );
  }
  if (error) return <p>{error}</p>;

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatDate = (dateString) => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const STATUS_MAP = {
    for_review: { label: "For Review", color: "blue" },
    under_review: { label: "Under Review", color: "indigo" },
    for_revisions: { label: "For Revisions", color: "amber" },
    for_approval: { label: "For Approval", color: "purple" },
    approved: { label: "Approved", color: "emerald" },
    rejected: { label: "Rejected", color: "rose" },
  };

  return (
    <div className="p-8 lg:p-10 space-y-10 bg-[#fbfcfb] h-auto animate-in fade-in duration-500">

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
              <Search
                className="text-slate-400 group-focus-within:text-[#1cb35a] transition-all duration-300"
                size={18}
              />
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
                <th className="pb-2 px-6 text-left font-bold">
                  Document Details
                </th>
                <th className="pb-2 px-6 text-center font-bold">Status</th>
                <th className="pb-2 px-6 text-center font-bold">
                  Registry Date
                </th>
                <th className="pb-2 px-6 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="group">
                  {/* Author & Title Details - Premium Editorial Style */}
                  <td className="py-7 px-6 bg-white border-y border-slate-100/50 shadow-[0_4px_15px_rgba(0,0,0,0.02)] group-hover:border-emerald-100 group-hover:bg-emerald-50/40 transition-all duration-500">
                    <div className="flex items-center gap-6">
                      {/* Icon Container with Glassmorphism & Motion */}
                      <div className="relative flex-shrink-0 group/icon">
                        <div className="w-14 h-14 rounded-[20px] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center border border-slate-200/60 group-hover/icon:border-emerald-200 group-hover/icon:bg-white group-hover/icon:rotate-[10deg] group-hover/icon:scale-110 transition-all duration-500 shadow-sm relative overflow-hidden">
                          {/* Subtle background pattern inside icon box */}
                          <div className="absolute inset-0 opacity-0 group-hover/icon:opacity-10 transition-opacity bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:4px_4px]" />

                          <FileText
                            size={22}
                            className="text-slate-400 group-hover:text-emerald-500 transition-colors duration-500 relative z-10"
                          />
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
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                              Academic Research
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status Badge - Updated for 6 Statuses */}
                  <td className="py-7 px-6 bg-white border-y border-slate-100/50 shadow-[0_4px_15px_rgba(0,0,0,0.02)] group-hover:border-emerald-100 group-hover:bg-emerald-50/40 transition-all duration-500 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      {(() => {
                        const config = STATUS_MAP[doc.status] || { label: doc.status, color: "slate" };
                        const colorClass = {
                          blue: "bg-blue-500/5 text-blue-600 border-blue-500/20 group-hover:bg-blue-500",
                          indigo: "bg-indigo-500/5 text-indigo-600 border-indigo-500/20 group-hover:bg-indigo-500",
                          amber: "bg-amber-500/5 text-amber-600 border-amber-500/20 group-hover:bg-amber-500",
                          purple: "bg-purple-500/5 text-purple-600 border-purple-500/20 group-hover:bg-purple-500",
                          emerald: "bg-emerald-500/5 text-emerald-600 border-emerald-500/20 group-hover:bg-emerald-500",
                          rose: "bg-rose-500/5 text-rose-600 border-rose-500/20 group-hover:bg-rose-500",
                          slate: "bg-slate-500/5 text-slate-600 border-slate-500/20 group-hover:bg-slate-500",
                        }[config.color];

                        const dotClass = {
                          blue: "bg-blue-500",
                          indigo: "bg-indigo-500",
                          amber: "bg-amber-500",
                          purple: "bg-purple-500",
                          emerald: "bg-emerald-500",
                          rose: "bg-rose-500",
                          slate: "bg-slate-500",
                        }[config.color];

                        return (
                          <div className={`relative inline-flex items-center px-4 py-2 rounded-xl transition-all duration-500 min-w-[145px] justify-center overflow-hidden border group-hover:text-white ${colorClass}`}>
                            {/* Pulse Dot */}
                            <span className="relative flex h-2 w-2 mr-2.5 flex-shrink-0">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 group-hover:bg-white ${dotClass}`}></span>
                              <span className={`relative inline-flex rounded-full h-2 w-2 group-hover:bg-white ${dotClass}`}></span>
                            </span>

                            <span className="relative text-[10px] font-black uppercase tracking-wider">
                              {config.label}
                            </span>
                          </div>
                        );
                      })()}

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
                          <Calendar
                            size={15}
                            className="text-slate-400 group-hover:text-emerald-500 transition-colors"
                          />
                        </div>

                        <div className="flex items-center whitespace-nowrap gap-1.5">
                          <span className="text-[12px] font-black text-slate-700 group-hover:text-slate-900 transition-colors tracking-tight">
                            {formatDate(doc.submissionDate)}
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

                  {/* Actions Column - Multi-tier Modern Layout */}
                  <td className="py-6 px-6 bg-white last:rounded-r-[32px] border-y border-r border-slate-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:border-emerald-100/50 group-hover:bg-emerald-50/30 transition-all duration-700">
                    <div className="flex flex-col items-center justify-center gap-3">
                      
                      {/* Tier 1: Standard Actions (Always Horizontal) */}
                      <div className="flex items-center justify-center gap-3">
                        {/* View Document */}
                        <div className="group/action relative">
                          <button className="p-3 bg-slate-50 text-slate-400 rounded-xl transition-all duration-300 hover:bg-blue-600 hover:text-white hover:-translate-y-1 shadow-sm border border-slate-100 active:scale-95">
                            <FileText size={18} strokeWidth={2.5} />
                          </button>
                          <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2.5 py-1.5 rounded-lg opacity-0 group-hover/action:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 uppercase tracking-widest shadow-xl">
                            View Docs
                          </span>
                        </div>

                        {/* View Review */}
                        <div className="group/action relative">
                          <button className="p-3 bg-slate-50 text-slate-400 rounded-xl transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:-translate-y-1 shadow-sm border border-slate-100 active:scale-95">
                            <Eye size={18} strokeWidth={2.5} />
                          </button>
                          <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2.5 py-1.5 rounded-lg opacity-0 group-hover/action:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 uppercase tracking-widest shadow-xl">
                            View Review
                          </span>
                        </div>
                      </div>

                      {/* Tier 2: Decision Actions (Appears Below for 'for_approval') */}
                      {doc.status === "for_approval" && (
                        <div className="flex flex-col w-full gap-2 animate-in fade-in slide-in-from-top-2 duration-500">
                          {/* Subtle Horizontal Divider */}
                          <div className="flex items-center gap-2 px-2">
                              <div className="h-[1px] flex-1 bg-slate-100" />
                              <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">Decision</span>
                              <div className="h-[1px] flex-1 bg-slate-100" />
                          </div>

                          <div className="flex items-center justify-center gap-2">
                              {/* Approve Button */}
                              <button 
                                  onClick={() => console.log("Approved", doc.id)}
                                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 hover:bg-emerald-500 hover:text-white transition-all duration-300 group/btn"
                              >
                                  <ShieldCheck size={14} strokeWidth={3} />
                                  <span className="text-[10px] font-black uppercase tracking-tight">Approve</span>
                              </button>

                              {/* Reject Button */}
                              <button 
                                  onClick={() => console.log("Rejected", doc.id)}
                                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-rose-50 text-rose-600 rounded-lg border border-rose-100 hover:bg-rose-500 hover:text-white transition-all duration-300 group/btn"
                              >
                                  <Trash2 size={14} strokeWidth={3} />
                                  <span className="text-[10px] font-black uppercase tracking-tight">Reject</span>
                              </button>
                          </div>
                        </div>
                      )}
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
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
              Registry entry not found
            </p>
            <p className="text-slate-300 text-xs mt-2 font-medium italic">
              Try adjusting your search filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageDocuments;
