import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  X,
  Search,
  Check,
  User,
  Info,
  RefreshCcw,
  UserPlus,
  Loader2,
} from "lucide-react";
import axios from "axios";

const AssignModal = ({ isOpen, onClose, data, onUpdate, mode }) => {
  const [assignSearch, setAssignSearch] = useState("");
  const [reviewers, setReviewers] = useState([]);
  const [selectedReviewers, setSelectedReviewers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isReassignMode = mode === "reassign";

  useEffect(() => {
    if (isOpen && data) {
      const fetchReviewers = async () => {
        const docId = data?.proposal_id;
        if (!docId) return;

        try {
          const response = await axios.post(
            "http://127.0.0.1:5000/api/get-all-reviewer",
            { proposal_id: docId }
          );

          let reviewersList = Array.isArray(response.data) ? response.data : [];

          // In reassign mode, only show currently assigned reviewers
          if (isReassignMode) {
            reviewersList = reviewersList.filter((r) => r.is_assign === 1);
          }

          setReviewers(reviewersList);

          // Auto-select currently assigned reviewers who haven't reviewed yet
          const assignedIDs = reviewersList
            .filter((r) => r.is_assign === 1 && r.is_reviewed === 0)
            .map((r) => r.id);

          setSelectedReviewers(assignedIDs);
        } catch (error) {
          console.error("Error fetching reviewers:", error);
        }
      };
      fetchReviewers();
    }
  }, [isOpen, data, isReassignMode]);

  if (!isOpen) return null;

  const toggleReviewer = (id) => {
    const reviewer = reviewers.find((r) => r.id === id);
    const isOriginal = reviewer?.is_assign === 1;
    const hasReviewed = reviewer?.is_reviewed === 1;

    // Prevent selecting already reviewed in any mode
    if (!isReassignMode && isOriginal) return;
    if (hasReviewed) return;

    setSelectedReviewers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    const proposalId = data.proposal_id || data.id;

    try {
      // Filter selected reviewers
      const originalAssignedIDs = reviewers
        .filter((r) => r.is_assign === 1 && r.is_reviewed === 0)
        .map((r) => r.id);

      const reviewersToSend = isReassignMode
        ? selectedReviewers
        : selectedReviewers.filter((id) => !originalAssignedIDs.includes(id));

      if (reviewersToSend.length === 0 && !isReassignMode) {
        alert("Please select at least one reviewer to assign.");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        proposal_id: proposalId,
        reviewers: reviewersToSend.map((id) => ({ reviewer_id: id })),
      };

      const endpoint = isReassignMode
        ? "/api/reassign-reviewer"
        : "/api/assign-reviewer";

      await axios.post(`http://127.0.0.1:5000${endpoint}`, payload);

      const selectedNames = reviewers
        .filter((r) => selectedReviewers.includes(r.id))
        .map((r) => r.name)
        .join(", ");

      onUpdate(proposalId, selectedNames || "No Reviewers");
      onClose();
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message || "Failed to update reviewers";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter reviewers by search
  const filteredReviewers = (Array.isArray(reviewers) ? reviewers : []).filter((reviewer) =>
    reviewer.name.toLowerCase().includes(assignSearch.toLowerCase())
  );

  const originalAssignedIDs = reviewers
    .filter((r) => r.is_assign === 1 && r.is_reviewed === 0)
    .map((r) => r.id);
  const hasNewSelection = selectedReviewers.some((id) => !originalAssignedIDs.includes(id));
  const isButtonDisabled =
    isSubmitting || (mode === "assign" && !hasNewSelection) || (isReassignMode && selectedReviewers.length === 0);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-[480px] rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className={`h-1.5 w-full transition-colors duration-500 ${isReassignMode ? "bg-blue-500" : "bg-emerald-500"}`} />

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                {isReassignMode ? (
                  <RefreshCcw size={20} className="text-blue-500" />
                ) : (
                  <UserPlus size={20} className="text-emerald-500" />
                )}
                {isReassignMode ? "Reassign Reviewer" : "Assign Reviewer"}
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {isReassignMode ? "Update the existing assignment" : "Select an expert for this proposal"}
              </p>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>

          {/* Target Document */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 relative overflow-hidden">
            <Info size={40} className={`absolute -right-2 -bottom-2 opacity-5 ${isReassignMode ? "text-blue-600" : "text-emerald-600"}`} />
            <div className="flex items-center gap-2 mb-1">
              <Info size={12} className={isReassignMode ? "text-blue-600" : "text-emerald-600"} />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Target Document</span>
            </div>
            <p className="text-[13px] font-bold text-slate-600 line-clamp-1 italic">"{data?.title}"</p>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by name..."
              value={assignSearch}
              onChange={(e) => setAssignSearch(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-slate-200 font-bold text-slate-700 text-sm"
            />
          </div>

          {/* Reviewers List */}
          <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredReviewers.map((reviewer) => {
              const isSelected = selectedReviewers.includes(reviewer.id);
              const isOriginal = reviewer.is_assign === 1;
              const hasReviewed = reviewer.is_reviewed === 1;
              const isLocked = !isReassignMode && (isOriginal || hasReviewed);

              const activeTheme = isReassignMode ? "blue" : "emerald";
              const currentStyle = isSelected
                ? `border-${activeTheme}-500 bg-${activeTheme}-50/50 text-${activeTheme}-700`
                : "border-transparent bg-slate-50/50 hover:bg-white hover:border-slate-100 text-slate-700";

              return (
                <button
                  key={reviewer.id}
                  disabled={isSubmitting || isLocked}
                  onClick={() => toggleReviewer(reviewer.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 border-2 ${currentStyle} ${isLocked ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? `bg-${activeTheme}-500 text-white` : "bg-slate-200 text-slate-500"}`}>
                      <User size={16} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black">
                        {reviewer.name}
                        {isOriginal && !hasReviewed && (
                          <span className={`ml-2 text-[8px] px-1.5 py-0.5 rounded-full uppercase ${isReassignMode ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"}`}>
                            {isReassignMode ? "Current" : "Assigned"}
                          </span>
                        )}
                        {hasReviewed && (
                          <span className="ml-2 text-[8px] px-1.5 py-0.5 rounded-full uppercase bg-red-100 text-red-600">
                            Reviewed
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  {isSelected && <Check size={16} className={`text-${activeTheme}-600`} strokeWidth={4} />}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3.5 text-slate-400 font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 rounded-2xl transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isButtonDisabled}
              className={`flex-[2] text-white py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${isReassignMode ? "bg-blue-600 shadow-blue-100 hover:bg-blue-700" : "bg-emerald-600 shadow-emerald-100 hover:bg-emerald-700"} disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale-[0.5]`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span className="ml-2">Processing...</span>
                </>
              ) : isReassignMode ? (
                "Update Assignment"
              ) : mode === "assign" && hasNewSelection ? (
                "Add Selected Reviewers"
              ) : (
                "Confirm Assignment"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AssignModal;
