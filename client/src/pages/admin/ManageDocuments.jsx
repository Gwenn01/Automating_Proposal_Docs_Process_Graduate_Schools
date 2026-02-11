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
import NotificationBell from "../../components/NotificationBell";

const ManageDocuments = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);

    useEffect(() => {
      // Get user from localStorage
      const storedUser = localStorage.getItem("user");
  
      if (!storedUser) {
        console.log("No user found, would redirect to login");
        setLoading(false);
        return;
      }
  
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    let interval;

    const fetchDocuments = async () => {
      try {
        interval = setInterval(() => {
          setProgress((prev) => (prev < 90 ? prev + 5 : prev));
        }, 300);

        const res = await axios.get("http://127.0.0.1:5000/api/get-all-docs");
        setDocuments(res.data);

        setProgress(100);
      } catch (err) {
        console.error(err);
        setError("Failed to load documents");
      } finally {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400); // smooth exit
      }
    };

    fetchDocuments();

    return () => clearInterval(interval);
  }, []);

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

    // fetch notifications
    useEffect(() => {
      if (!user) return;
  
      const fetchNotifications = async () => {
        try {
          const response = await fetch(
            "http://127.0.0.1:5000/api/get-notifications",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: user.user_id,
              }),
            },
          );
  
          if (!response.ok) {
            throw new Error("Failed to fetch notifications");
          }
  
          const data = await response.json();
          setNotifications(data);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };
  
      fetchNotifications();
    }, [user]); // X

    const unreadCount = notifications.filter((n) => n.is_read === 0).length;

  const handleRead = async (id) => {
    if (!user) return;

    // Avoid duplicate requests
    const target = notifications.find((n) => n.id === id);
    if (!target || target.is_read === 1) return;

    // Optimistic UI update
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, is_read: 1 } : notif)),
    );

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/update-read-notifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.user_id,
            notification_id: id,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update notification");
      }
    } catch (error) {
      console.error(error);

      // Rollback UI if request fails
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, is_read: 0 } : notif,
        ),
      );
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-white inset-0 z-[60] flex items-center justify-center backdrop-blur-md animate-fade-in">
        <div className="relative bg-white px-14 py-10 flex flex-col items-center animate-pop-out w-[450px] rounded-2xl">
          <p className="text-lg font-semibold shimmer-text mb-2 text-center">
            Indexing Registry
          </p>

          <p className="text-xs w-full text-gray-500 mb-4 text-center">
            Preparing official records and submission statuses.
          </p>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500 font-medium">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
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

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const STATUS_MAP = {
    for_review: { label: "For Review", color: "blue" },
    under_review: { label: "Under Review", color: "indigo" },
    for_revision: { label: "For Revision", color: "amber" },
    for_approval: { label: "For Approval", color: "purple" },
    approved: { label: "Approved", color: "emerald" },
    rejected: { label: "Rejected", color: "rose" },
  };

  return (
    <div className="p-8 lg:p-10 space-y-10 bg-[#fbfcfb] h-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight leading-tight">
            Manage Documents
          </h1>
          <p className="text-gray-500 text-sm">
            Audit, track, and manage all intellectual property submissions.
          </p>
        </div>

        <div className="flex items-center justify-center gap-5">
          <div className="">
            <div className="relative w-full max-w-2xl">
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
                className="w-full pl-12 pr-4 h-14 rounded-[20px] border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-[#1cb35a]/10 focus:border-[#1cb35a]/30 transition-all outline-none text-sm font-semibold text-slate-700 placeholder:text-slate-400/80 shadow-sm"
              />
            </div>
          </div>

          {/* Notification Bell */}
            <NotificationBell
              notifications={notifications}
              unreadCount={unreadCount}
              show={showNotif}
              onToggle={() => setShowNotif((prev) => !prev)}
              onClose={() => setShowNotif(false)}
              onRead={handleRead}
            />
        </div>


      </div>

      {/* Main Content Container - Soft-UI matching Manage Accounts */}
      <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 overflow-hidden relative">
        {/* Action Row */}


        {/* Table Section - Professional & Modern Layout */}
        <div className="overflow-x-auto pb-4 custom-scrollbar">
          <table className="w-full border-separate border-spacing-y-4 table-fixed">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] tracking-[0.2em] font-black">
                {/* Defined widths for absolute consistency */}
                <th className="w-[45%] pb-2 px-8 text-left">
                  Document Details
                </th>
                <th className="w-[18%] pb-2 px-6 text-center">Status</th>
                <th className="w-[17%] pb-2 px-6 text-center">Registry Date</th>
                <th className="w-[20%] pb-2 px-6 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="group">
                  {/* COLUMN 1: DOCUMENT DETAILS - Premium Glass Edition */}
                  <td className="w-[45%] py-6 px-8 relative overflow-hidden bg-white/70 backdrop-blur-xl first:rounded-l-[32px] border-y border-l border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.03)] group-hover:bg-white/90 transition-all duration-700 ease-in-out">
                    {/* Subsurface Light Effect - Only visible on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 flex items-center gap-6">
                      {/* Enhanced Squircle Icon Container */}
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-[24px] bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500">
                          <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <FileText
                            size={24}
                            strokeWidth={1.2}
                            className="text-slate-400 group-hover:text-emerald-600 transition-colors duration-500"
                          />
                        </div>

                        {/* Floating Status Ring */}
                        <div className="absolute -top-1 -right-1 flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
                          <div className="relative inline-flex rounded-full h-5 w-5 bg-white border border-slate-100 items-center justify-center shadow-sm">
                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                          </div>
                        </div>
                      </div>

                      {/* Typography - Editorial Layout */}
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[15px] font-black text-slate-900 truncate tracking-tight group-hover:text-emerald-950 transition-colors">
                            {doc.name}
                          </span>
                          <span className="opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500 text-[8px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-md uppercase tracking-widest shadow-lg shadow-emerald-200/50">
                            Official
                          </span>
                        </div>

                        <div className="relative">
                          <p className="text-[13px] font-medium text-slate-500 truncate leading-relaxed group-hover:text-slate-700 transition-colors">
                            <span className="text-emerald-500/40 font-serif italic mr-0.5 text-base">
                              “
                            </span>
                            {doc.title}
                            <span className="text-emerald-500/40 font-serif italic ml-0.5 text-base">
                              ”
                            </span>
                          </p>
                        </div>

                        {/* Meta Footer - Centered & Refined */}
                        <div className="flex items-center gap-3 mt-3">
                          {/* Proposal Tag - Forced Centering */}
                          <div className="flex items-center justify-center px-2 py-1 rounded-md bg-slate-100 group-hover:bg-emerald-100 transition-colors duration-300">
                            <span className="text-[9px] font-black text-slate-400 group-hover:text-emerald-700 uppercase tracking-[0.1em] leading-none">
                              Proposal
                            </span>
                          </div>

                          {/* Separator */}
                          <div className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-emerald-300 transition-colors" />

                          {/* Institutional Label */}
                          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest group-hover:text-slate-500 transition-colors duration-300 leading-none">
                            Institutional File
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* COLUMN 2: STATUS BADGE - Premium Jewel Style */}
                  <td className="w-[18%] py-5 px-4 bg-white/70 backdrop-blur-xl border-y border-white/40 group-hover:bg-white/90 transition-all duration-700 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      {(() => {
                        const config = STATUS_MAP[doc.status] || {
                          label: doc.status,
                          color: "slate",
                        };

                        // Premium Color Mapping with Translucent Glows
                        const colors = {
                          emerald:
                            "text-emerald-600 bg-emerald-500/5 border-emerald-500/20 group-hover:bg-emerald-600 group-hover:text-white shadow-[0_2px_10px_rgba(16,185,129,0.1)]",
                          amber:
                            "text-amber-600 bg-amber-500/5 border-amber-500/20 group-hover:bg-amber-500 group-hover:text-white shadow-[0_2px_10px_rgba(245,158,11,0.1)]",
                          rose: "text-rose-600 bg-rose-500/5 border-rose-500/20 group-hover:bg-rose-500 group-hover:text-white shadow-[0_2px_10px_rgba(244,63,94,0.1)]",
                          blue: "text-blue-600 bg-blue-500/5 border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white shadow-[0_2px_10px_rgba(59,130,246,0.1)]",
                          slate:
                            "text-slate-600 bg-slate-500/5 border-slate-500/20 group-hover:bg-slate-500 group-hover:text-white shadow-[0_2px_10px_rgba(100,116,139,0.1)]",
                        };

                        const activeColor =
                          colors[config.color] || colors.slate;

                        return (
                          <div
                            className={`
                            relative overflow-hidden
                            inline-flex items-center justify-center 
                            px-4 py-2 rounded-xl border
                            min-w-[130px] 
                            transition-all duration-500 ease-out
                            ${activeColor}
                          `}
                          >
                            {/* Internal Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Status Pulse Dot */}
                            <div className="relative flex h-2 w-2 mr-2.5">
                              <span
                                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 bg-current`}
                              ></span>
                              <span
                                className={`relative inline-flex rounded-full h-2 w-2 bg-current border border-white/20`}
                              ></span>
                            </div>

                            <span className="relative text-[10px] font-black uppercase tracking-[0.12em] leading-none">
                              {config.label}
                            </span>
                          </div>
                        );
                      })()}

                      {/* Metadata Label - Perfectly Centered */}
                      <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] group-hover:text-emerald-600/60 transition-colors duration-500">
                        Workflow State
                      </span>
                    </div>
                  </td>

                  {/* COLUMN 3: REGISTRY DATE - High-Fidelity Timestamp */}
                  <td className="w-[17%] py-5 px-4 bg-white/70 backdrop-blur-xl border-y border-white/40 group-hover:bg-white/90 transition-all duration-700 text-center">
                    <div className="inline-flex flex-col items-center justify-center gap-2.5">
                      {/* Minimalist Date Capsule */}
                      <div className="group/date relative flex items-center gap-2.5 px-4 py-2 bg-slate-50/50 rounded-xl border border-slate-100 group-hover:border-emerald-200/60 group-hover:bg-white group-hover:shadow-[0_4px_12px_rgba(16,185,129,0.05)] transition-all duration-500">
                        {/* Soft Icon Glow */}
                        <div className="flex-shrink-0 flex items-center justify-center">
                          <Calendar
                            size={14}
                            strokeWidth={2.2}
                            className="text-slate-400 group-hover:text-emerald-500 transition-colors duration-500"
                          />
                        </div>

                        {/* Date Text */}
                        <span className="text-[11px] font-black text-slate-700 tracking-tight leading-none group-hover:text-slate-900 transition-colors">
                          {formatDate(doc.submissionDate)}
                        </span>

                        {/* Hover Background Shine */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/date:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                      </div>

                      {/* Verification Badge - Editorial Style */}
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500 delay-75">
                        <div className="flex items-center justify-center w-3 h-3 rounded-full bg-emerald-100/50">
                          <ShieldCheck size={9} className="text-emerald-600" />
                        </div>
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">
                          Registry Verified
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* COLUMN 4: ACTIONS - Premium Command Center */}
                  <td className="w-[20%] py-5 px-6 bg-white/70 backdrop-blur-xl last:rounded-r-[32px] border-y border-r border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.03)] group-hover:bg-white/90 transition-all duration-700">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="flex items-center justify-center gap-3">
                        {/* View Docs Button with Dynamic Quote */}
                        <div className="group/action relative flex flex-col items-center">
                          {/* The Quote Tooltip - Appears on hover or focus-within */}
                          <div className="absolute -top-10 scale-90 opacity-0 group-hover/action:opacity-100 group-hover/action:scale-100 group-focus-within/action:opacity-100 group-focus-within/action:scale-100 transition-all duration-300 pointer-events-none">
                            <div className="bg-slate-900 text-white text-[9px] font-black px-2.5 py-1.5 rounded-lg shadow-xl uppercase tracking-[0.15em] whitespace-nowrap relative">
                              View Docs
                              {/* Tooltip Arrow */}
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                            </div>
                          </div>

                          <button className="p-3 bg-white text-slate-400 rounded-xl border border-slate-100 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:text-emerald-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 active:scale-95">
                            <FileText size={18} strokeWidth={2} />
                          </button>
                        </div>

                        {/* Quick View Button with Dynamic Quote */}
                        <div className="group/action relative flex flex-col items-center">
                          {/* The Quote Tooltip */}
                          <div className="absolute -top-10 scale-90 opacity-0 group-hover/action:opacity-100 group-hover/action:scale-100 group-focus-within/action:opacity-100 group-focus-within/action:scale-100 transition-all duration-300 pointer-events-none">
                            <div className="bg-indigo-600 text-white text-[9px] font-black px-2.5 py-1.5 rounded-lg shadow-xl uppercase tracking-[0.15em] whitespace-nowrap relative">
                              View Reviews
                              {/* Tooltip Arrow */}
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-600 rotate-45" />
                            </div>
                          </div>

                          <button className="p-3 bg-white text-slate-400 rounded-xl border border-slate-100 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:text-indigo-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 active:scale-95">
                            <Eye size={18} strokeWidth={2} />
                          </button>
                        </div>
                      </div>

                      {/* Decision Tier stays clean to avoid clutter */}
                      {doc.status === "for_approval" && (
                        <div className="w-full max-w-[160px] flex flex-col gap-2 animate-in fade-in slide-in-from-top-3 duration-500">
                          <div className="flex items-center gap-2">
                            <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-emerald-700 transition-all focus:ring-2 focus:ring-emerald-500/40">
                              Approve
                            </button>
                            <button className="flex-1 py-2 bg-white text-rose-500 rounded-lg border border-rose-100 text-[9px] font-black uppercase tracking-wider hover:bg-rose-50 transition-all focus:ring-2 focus:ring-rose-500/20">
                              Reject
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
