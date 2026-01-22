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

const AssignModal = ({ isOpen, onClose, data, onUpdate }) => {
  const [assignSearch, setAssignSearch] = useState("");
  const [reviewers, setReviewers] = useState([]);
  const [selectedReviewers, setSelectedReviewers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isReassign = !!data?.reviewer;

  useEffect(() => {
    if (isOpen) {
      const fetchReviewers = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:5000/api/get-all-reviewer",
          );
          setReviewers(response.data);

          if (data?.reviewer) {
            const currentNames = data.reviewer.split(", ");
            const preSelected = response.data
              .filter((r) => currentNames.includes(r.name))
              .map((r) => r.id);
            setSelectedReviewers(preSelected);
          }
        } catch (error) {
          console.error("Error fetching reviewers:", error);
        }
      };
      fetchReviewers();
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const toggleReviewer = (id) => {
    setSelectedReviewers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);

    console.log("DEBUG: Raw data from props:", data);
    console.log("DEBUG: Current selected IDs:", selectedReviewers);

    try {
      const payload = {
        proposal_id: parseInt(data.id, 10),
        reviewers: selectedReviewers.map((id) => ({
          reviewer_id: id,
        })),
      };

      console.log(
        "DEBUG: Final Payload being sent to Flask:",
        JSON.stringify(payload, null, 2),
      );

      const response = await axios.post(
        "http://127.0.0.1:5000/api/assign-reviewer",
        payload,
      );

      console.log("DEBUG: Server Response:", response.data);

      if (response.status === 200 || response.status === 201) {
        const selectedNames = reviewers
          .filter((r) => selectedReviewers.includes(r.id))
          .map((r) => r.name)
          .join(", ");

        onUpdate(data.id, selectedNames);
        onClose();
      }
    } catch (error) {
      console.group("DEBUG: API Error Details");
      if (error.response) {
        console.error("Status Code:", error.response.status);
        console.error("Response Data:", error.response.data);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received. Check if Flask is running.");
      } else {
        console.error("Error Message:", error.message);
      }
      console.groupEnd();

      const backendMessage =
        error.response?.data?.message || "Invalid Data Error";
      alert(`Update Failed: ${backendMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredReviewers = reviewers.filter((r) =>
    r.name.toLowerCase().includes(assignSearch.toLowerCase()),
  );

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-[480px] rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div
          className={`h-1.5 w-full transition-colors duration-500 ${isReassign ? "bg-blue-500" : "bg-green-500"}`}
        />

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                {isReassign ? (
                  <RefreshCcw size={20} className="text-blue-500" />
                ) : (
                  <UserPlus size={20} className="text-green-500" />
                )}
                {isReassign ? "Reassign Reviewer" : "Assign Reviewer"}
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {isReassign
                  ? "Update the existing assignment"
                  : "Select an expert for this proposal"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 relative overflow-hidden">
            <Info
              size={40}
              className={`absolute -right-2 -bottom-2 opacity-5 ${isReassign ? "text-blue-600" : "text-green-600"}`}
            />
            <div className="flex items-center gap-2 mb-1 relative z-10">
              <Info
                size={12}
                className={isReassign ? "text-blue-600" : "text-green-600"}
              />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Target Document
              </span>
            </div>
            <p className="text-[13px] font-bold text-slate-600 line-clamp-1 italic relative z-10">
              "{data?.title}"
            </p>
          </div>

          <div className="relative mb-4">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by name..."
              value={assignSearch}
              onChange={(e) => setAssignSearch(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-slate-200 transition-all font-bold text-slate-700 text-sm"
            />
          </div>

          <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredReviewers.map((reviewer) => {
              const isSelected = selectedReviewers.includes(reviewer.id);
              return (
                <button
                  key={reviewer.id}
                  disabled={isSubmitting}
                  onClick={() => toggleReviewer(reviewer.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 border-2 ${
                    isSelected
                      ? reviewer.is_assign
                        ? "border-blue-500 bg-blue-50/50"
                        : "border-green-500 bg-green-50/50"
                      : "border-transparent bg-slate-50/50 hover:bg-white hover:border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? reviewer.is_assign
                            ? "bg-blue-500 text-white"
                            : "bg-green-500 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      <User size={16} />
                    </div>
                    <div className="text-left">
                      <p
                        className={`text-sm font-black ${isSelected ? (reviewer.is_assign ? "text-blue-700" : "text-green-700") : "text-slate-700"}`}
                      >
                        {reviewer.name}
                      </p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">
                        {reviewer.dept}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <Check
                      size={16}
                      className={
                        reviewer.is_assign ? "text-blue-600" : "text-green-600"
                      }
                      strokeWidth={4}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3.5 text-slate-400 font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 rounded-2xl transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className={`flex-[2] text-white py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                isReassign
                  ? "bg-blue-600 shadow-blue-100 hover:bg-blue-700"
                  : "bg-green-600 shadow-green-100 hover:bg-green-700"
              } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AssignModal;
