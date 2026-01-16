import React, { useEffect, useState } from "react";
import { List, Loader2, Eye } from "lucide-react"; // Added Eye icon
import axios from "axios";

import ReviewerModal from "../../components/ReviewerModal";
import DocumentReviewModal from "../../components/DocumentReviewModal";
import DocumentViewerModal from "../../components/DocumentViewerModal";

const ViewProposal = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [showReviewerModal, setShowReviewerModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showViewerModal, setShowViewerModal] = useState(false);

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedReviewer, setSelectedReviewer] = useState(null);

  // ================= FETCH USER =================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ================= FETCH PROPOSALS + REVIEWS =================
  useEffect(() => {
    if (!user?.user_id) return;

    axios
      .get(`http://127.0.0.1:5000/api/my-proposals-review/${user.user_id}`)
      .then((res) => {
        const grouped = {};

        res.data.proposals.forEach((row) => {
          if (!grouped[row.proposal_id]) {
            grouped[row.proposal_id] = {
              proposal_id: row.proposal_id,
              title: row.title,
              file_path: row.file_path,
              status: row.status,
              submission_date: row.submission_date,
              reviews: [],
            };
          }

          if (row.review_id) {
            grouped[row.proposal_id].reviews.push({
              review_id: row.review_id,
              comments: row.comments,
              decision: row.decision,
              review_date: row.review_date,
              reviewer: {
                id: row.reviewer_id,
                name: row.reviewer_name,
                email: row.reviewer_email,
                role: row.reviewer_role,
              },
            });
          }
        });

        setDocuments(Object.values(grouped));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // ================= STATUS LABEL STYLE =================
  const getStatusStyle = (status) => {
    // Matching the specific colors from the image
    switch (status) {
      case "submitted":
        return { label: "Initial Review", className: "bg-[#FFC107] text-white" }; // Yellow/Gold
      case "under_review":
        return { label: "Under Review", className: "bg-[#FFC107] text-white" }; // Yellow/Gold (Or Orange if preferred)
      case "final_review": // Assuming you might have this status
        return { label: "Final Review", className: "bg-[#FBBF24] text-white" };
      case "approved":
        return { label: "Completed", className: "bg-[#22C55E] text-white" }; // Green
      case "rejected":
        return { label: "Rejected", className: "bg-[#EF4444] text-white" }; // Red
      case "for_revision":
         return { label: "For Revision", className: "bg-[#F97316] text-white" }; // Orange
      default:
        return { label: status, className: "bg-gray-400 text-white" };
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-screen bg-white">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
        <p className="mt-4 text-gray-500 font-medium">Loading documents...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white p-10 min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-black">View Proposal</h2>

      {/* Table Container */}
      <div className="bg-[#F8F9FA] rounded-[30px] p-8">
        <table className="w-full border-separate border-spacing-y-6">
          <thead>
            <tr className="text-left text-black font-medium text-base">
              <th className="px-4 py-2 font-normal">Title</th>
              <th className="px-4 py-2 font-normal text-center">Status</th>
              <th className="px-4 py-2 font-normal text-center">View</th>
              <th className="px-4 py-2 font-normal text-center">Actions</th>
              <th className="px-4 py-2 font-normal text-center">Reviews</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((doc) => {
              const status = getStatusStyle(doc.status);
              
              // Mocking "X out 4" logic based on existing reviews vs hypothetical total
              // If you don't have a "total required reviewers" field, we can just show received count
              const reviewCountText = `${doc.reviews.length} received`; 

              return (
                <tr key={doc.proposal_id} className="text-sm">
                  {/* Title Column */}
                  <td className="px-4 py-2 align-middle max-w-md">
                    <p className="text-gray-800 font-normal leading-relaxed">
                      {doc.title}
                    </p>
                  </td>

                  {/* Status Column */}
                  <td className="px-4 py-2 text-center align-middle">
                    <span
                      className={`px-6 py-2 rounded-full text-xs font-bold inline-block min-w-[120px] ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  {/* View Column (Blue/Purple Button) */}
                  <td className="px-4 py-2 text-center align-middle">
                    <button
                      onClick={() => {
                        setSelectedDoc(doc);
                        setShowViewerModal(true);
                      }}
                      className="inline-flex items-center gap-2 bg-[#EEF2FF] text-[#4F46E5] px-5 py-2 rounded-full text-xs font-bold hover:bg-[#E0E7FF] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>

                  {/* Actions Column (Green Button) */}
                  <td className="px-4 py-2 text-center align-middle">
                    <button
                      onClick={() => {
                        setSelectedDoc(doc);
                        setShowReviewerModal(true);
                      }}
                      className="inline-flex items-center gap-2 bg-[#DCFCE7] text-[#166534] px-5 py-2 rounded-full text-xs font-bold hover:bg-[#bbf7d0] transition-colors"
                    >
                      <List className="w-4 h-4" />
                      Reviewer
                    </button>
                  </td>

                  {/* Reviews Count Column */}
                  <td className="px-4 py-2 text-center align-middle">
                    <span className="text-[#22C55E] font-bold text-xs">
                       {/* Hardcoding "out of 4" visually as per request if generic, 
                           or strictly dynamic if preferred. Using dynamic below: */}
                       {doc.reviews.length > 0 ? `${doc.reviews.length} Submitted` : "0 Submitted"}
                    </span>
                  </td>
                </tr>
              );
            })}
            
            {documents.length === 0 && (
                <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                        No proposals found.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODALS ================= */}

      {/* Reviewer Modal */}
      <ReviewerModal
        isOpen={showReviewerModal}
        reviewers={selectedDoc?.reviews || []}
        onClose={() => setShowReviewerModal(false)}
        onViewDocument={(review) => {
          setSelectedReviewer(review);
          setShowDocModal(true);
        }}
      />

      {/* Review Document Modal */}
      <DocumentReviewModal
        isOpen={showDocModal}
        documentUrl={selectedDoc?.file_path}
        review={selectedReviewer}
        onClose={() => setShowDocModal(false)}
      />

      {/* File Viewer Modal */}
      <DocumentViewerModal
        isOpen={showViewerModal}
        documentUrl={selectedDoc?.file_path}
        onClose={() => setShowViewerModal(false)}
      />
    </div>
  );
};

export default ViewProposal;