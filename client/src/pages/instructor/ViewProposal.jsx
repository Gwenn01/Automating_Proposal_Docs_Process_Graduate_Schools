import React, { useEffect, useState } from "react";
import { List, Loader2, Eye, ChevronLeft, ChevronRight, Bell } from "lucide-react";
import axios from "axios";

import ReviewerModal from "../../components/instructor/ReviewerModal";
import DocumentReviewModal from "../../components/instructor/DocumentReviewModal";
import DocumentViewerModal from "../../components/instructor/DocumentViewerModal";
import { useProposals } from "../../context/ProposalContext";


const ViewProposal = () => {
  const [documents, setDocuments] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);     // page skeleton
  const [actionLoading, setActionLoading] = useState(false); // view / review

  const [user, setUser] = useState(null);

  const [showReviewerModal, setShowReviewerModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showViewerModal, setShowViewerModal] = useState(false);

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedReviewer, setSelectedReviewer] = useState(null);
  //const { documents, loading } = useProposals();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: "New proposal assigned to you", time: "2 mins ago" },
    { id: 2, message: "Proposal review deadline tomorrow", time: "1 day ago" },
  ];


  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!actionLoading) return;

    setProgress(0);
    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 10;
      setProgress(Math.min(value, 95)); // stop at 95% visually
    }, 300);

    return () => clearInterval(interval);
  }, [actionLoading]);


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // ================= FETCH USER =================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ================= FETCH PROPOSALS + REVIEWS =================
useEffect(() => {
  if (!user?.user_id) return;

  axios
    .get(`http://127.0.0.1:5000/api/my-proposals/${user.user_id}`)
    .then((res) => {
      const documents = res.data.proposals.map((row) => ({
        proposal_id: row.proposal_id,
        title: row.title,
        file_path: row.file_path,
        status: row.status,
        submitted_at: row.submitted_at || row.submission_date || null,
        reviews: row.reviews, // ✅ STRING ONLY
      }));

      setDocuments(documents);
      setPageLoading(false);
    })
    .catch(() => setPageLoading(false));
}, [user]);


  const fetchCoverPage = async (proposalId) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/api/my-coverpage-proposals/${proposalId}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching cover page:", error);
      return null;
    }
  };

  const fetchProposalContent = async (proposalId) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/api/my-content-proposals/${proposalId}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching proposal content:", error);
      return null;
    }
  };

  // ================= STATUS LABEL STYLE =================
const getStatusStyle = (status) => {
  switch (status) {
    case "submitted":
      return { label: "Initial Review", className: "bg-[#FFC107] text-white" };

    case "for_review":
      return { label: "For Review", className: "bg-[#38BDF8] text-white" }; // blue

    case "under_review":
      return { label: "Under Review", className: "bg-[#FFC107] text-white" };

    case "final_review":
      return { label: "Final Review", className: "bg-[#FBBF24] text-white" };

    case "for_approval":
      return { label: "For Approval", className: "bg-[#6366F1] text-white" }; // indigo

    case "approved":
      return { label: "Completed", className: "bg-[#22C55E] text-white" };

    case "for_revision":
      return { label: "For Revision", className: "bg-[#F97316] text-white" };

    case "rejected":
      return { label: "Rejected", className: "bg-[#EF4444] text-white" };

    default:
      return { label: status, className: "bg-gray-400 text-white" };
  }
};


  // ================= PAGINATION LOGIC =================
  const totalPages = Math.ceil(documents.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentDocuments = documents.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


  // Reset to page 1 when documents change
  useEffect(() => {
    setCurrentPage(1);
  }, [documents.length]);

  // ================= LOADING =================


if (pageLoading) {
  return (
    <div className="flex-1 bg-white p-10 min-h-screen animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-10">
        <div className="h-8 w-56 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 w-72 bg-gray-200 rounded"></div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {Array.from({ length: 5 }).map((_, i) => (
                <th key={i} className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="border-b">
                {Array.from({ length: 5 }).map((_, j) => (
                  <td key={j} className="px-6 py-5">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


  return (
    <div className="flex-1 bg-white p-10 min-h-screen">
{actionLoading && (
  <div className="absolute inset-0 bg-white/80 z-[60] flex items-center justify-center backdrop-blur-sm">
    <div className="relative bg-white px-14 py-10 flex flex-col items-center w-[380px] shadow-xl rounded-xl">
      <p className="text-lg font-semibold mb-1">Loading proposal</p>
      <p className="text-sm text-gray-500 mb-4">Preparing your document…</p>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-gray-500 font-medium">
        {Math.round(progress)}%
      </p>
    </div>
  </div>
)}

      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">View Proposals</h2>
          <p className="text-sm text-gray-500 mt-1">
            Track status, reviews, and proposal progress
          </p>
        </div>

          <div className="relative">
    <button
      onClick={() => setShowNotifications(!showNotifications)}
      className="relative p-3 rounded-full hover:bg-gray-100 transition"
    >
      <p className="flex font-sans gap-2 text-gray-500 font-semibold">Notifications <Bell className="w-6 h-6 text-gray-700" /></p>
      

      {/* Badge */}
      {notifications.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {notifications.length}
        </span>
      )}
    </button>

    {/* Dropdown */}
    {showNotifications && (
      <div className="absolute right-0 mt-3 w-80 bg-white border border-black rounded-2xl shadow-lg z-50 px-2">
        <div className="px-4 py-3 border-b font-bold text-gray-700">
          Notifications
        </div>

        {notifications.length === 0 ? (
          <p className="px-4 py-6 text-sm text-gray-400 text-center">
            No new notifications
          </p>
        ) : (
          <ul className="max-h-72 overflow-y-auto">
            {notifications.map((notif) => (
              <li
                key={notif.id}
                className="px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
              >
                <p className="text-sm text-gray-700">{notif.message}</p>
                <span className="text-xs text-gray-400">{notif.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    )}
  </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300">
            <tr className="text-left text-gray-700 font-semibold text-sm uppercase tracking-wider">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">View</th>
              <th className="px-6 py-4 text-center">Actions</th>
              <th className="px-6 py-4 text-center">Reviews</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {currentDocuments.map((doc, index) => {
              const status = getStatusStyle(doc.status);
              const reviewCountText = `${doc.reviews.length} received`;

              return (
                <tr 
                  key={doc.proposal_id} 
                  className="hover:bg-gray-50/50 transition-colors duration-150 group border"
                >
                  {/* Title Column */}
                  <td className="px-6 py-5 align-middle">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {index + 1 + startIndex}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-medium text-base leading-relaxed group-hover:text-blue-600 transition-colors line-clamp-2">
                          {doc.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Submitted:{" "}
                          {doc.submitted_at
                            ? new Date(doc.submitted_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-5 text-center align-middle">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center justify-center min-w-[140px] shadow-sm ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  {/* View Column */}
                  <td className="px-6 py-5 text-center align-middle">
                    <button
                      onClick={async () => {
                        setActionLoading(true);

                        const cover = await fetchCoverPage(doc.proposal_id);
                        const content = await fetchProposalContent(doc.proposal_id);

                        setSelectedDoc({
                          ...doc,
                          cover_page: cover,
                          full_content: content,
                        });

                        setShowViewerModal(true);
                        setActionLoading(false);
                      }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-[#4F46E5] px-5 py-2.5 rounded-lg text-xs font-semibold hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-5 text-center align-middle">
                    <button
                      onClick={async () => {
                        setActionLoading(true);

                        const cover = await fetchCoverPage(doc.proposal_id);
                        const content = await fetchProposalContent(doc.proposal_id);

                        setSelectedDoc({
                          ...doc,
                          cover_page: cover,
                          full_content: content,
                        });

                        setShowReviewerModal(true);
                        setActionLoading(false);
                      }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 text-[#166534] px-5 py-2.5 rounded-lg text-xs font-semibold hover:from-green-100 hover:to-emerald-100 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                    >
                      <List className="w-4 h-4" />
                      Reviewer
                    </button>
                  </td>

                  {/* Reviews Count Column */}
                  <td className="px-2 py-5 text-center align-middle">
                    <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold text-xs">
                        {doc.reviews}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}

            {currentDocuments.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-16">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Eye className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No proposals found</p>
                    <p className="text-sm text-gray-400">Create your first proposal to get started</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {documents.length > 0 && (
        <div className="mt-6 flex items-center justify-between px-8">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, documents.length)} of{" "}
            {documents.length} proposals
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#E0E7FF]"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2 px-4">
              <span className="text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#E0E7FF]"
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= MODALS ================= */}

      {/* Reviewer Modal */}
      <ReviewerModal
        isOpen={showReviewerModal}
        proposalData={selectedDoc}
        onClose={() => setShowReviewerModal(false)}
        
      />

      {/* Review Document Modal */}
      <DocumentViewerModal
        isOpen={showViewerModal}
        proposalData={selectedDoc}
        onClose={() => setShowViewerModal(false)}
      />


    </div>
  );
};

export default ViewProposal;