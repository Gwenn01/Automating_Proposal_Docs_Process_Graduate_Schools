import React, { useEffect, useState } from "react";
import { List, Loader2 } from "lucide-react";
import axios from "axios";
import ReviewerModal from "./ReviewerModal";
import DocumentReviewModal from "./DocumentReviewModal";
import DocumentViewerModal from "./DocumentViewerModal";

const ViewDocs = () => {
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

  useEffect(() => {
    if (!user?.user_id) return;

    axios
      .get(`http://127.0.0.1:5000/api/my-proposals/${user.user_id}`)
      .then((res) => {
        setDocuments(res.data.proposals);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // Get status style for each document
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
      case "rejected":
        return { label: "Rejected", color: "bg-red-600" };
      default:
        return { label: status, color: "bg-gray-400" };
    }
  };

  // Show loading state while fetching
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
        <p className="mt-4 text-gray-500 font-medium">
          Loading documents...
        </p>
      </div>
    );
  }

  // Open document viewer modal
  const handleOpenViewer = (doc) => {
    setSelectedDoc(doc);
    setShowViewerModal(true);
  };

  // Open document review modal
  const handleOpenDocument = (doc) => {
    setSelectedDoc(doc);
    setShowDocModal(true);
  };

  return (
    <div className="flex-1 bg-white p-10">
      <h2 className="text-2xl font-bold mb-8">My Proposal Documents</h2>

      <div className="bg-[#F3F4F6] rounded-[40px] p-10">
        <table className="w-full border-separate border-spacing-y-6">
          <thead>
            <tr className="text-sm font-semibold text-gray-600">
              <th className="px-6">Title</th>
              <th className="px-6">File</th>
              <th className="px-6 text-center">Status</th>
              <th className="px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((doc) => {
              const status = getStatusStyle(doc.status);
              const filename = doc.file_path.split("/").pop();

              return (
                <tr key={doc.proposal_id} className="text-[13px] font-medium">
                  <td className="px-6">{doc.title}</td>

                  {/* Clickable file */}
                  <td className="px-6">
                    <button
                      onClick={() => handleOpenViewer(doc)}
                      className="text-gray-500 text-sm hover:text-green-600 underline underline-offset-2 transition-colors"
                    >
                      {filename}
                    </button>
                  </td>

                  <td className="px-6 py-1 text-center">
                    <span
                      className={`${status.color} text-white px-6 py-2 rounded-full text-sm font-bold`}
                    >
                      {status.label}
                    </span>
                  </td>

                  <td className="px-6 text-center">
                    <button
                      onClick={() => {
                        setSelectedDoc(doc);
                        setShowReviewerModal(true);
                      }}
                      className="flex items-center gap-1 mx-auto text-green-600 font-bold"
                    >
                      <List className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Reviewer Modal */}
      <ReviewerModal
        isOpen={showReviewerModal}
        onClose={() => {
          setShowReviewerModal(false);
          setSelectedReviewer(null);
        }}
        onViewDocument={(reviewer) => {
          setSelectedReviewer(reviewer);
          setShowDocModal(true);
        }}
      />

      {/* Document Review Modal */}
      <DocumentReviewModal
        isOpen={showDocModal}
        documentUrl={selectedDoc?.file_path}
        onClose={() => setShowDocModal(false)}
      />

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={showViewerModal}
        documentUrl={selectedDoc?.file_path}
        onClose={() => setShowViewerModal(false)}
      />
    </div>
  );
};

export default ViewDocs;
