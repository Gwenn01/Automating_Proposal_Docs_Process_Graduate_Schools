import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { X, Search, Check, User, Info } from 'lucide-react';

const AssignModal = ({ isOpen, onClose, data, onUpdate }) => {
  const [assignSearch, setAssignSearch] = useState("");

  const reviewers = [
    { id: 101, name: "Kian Fontillas", role: "Senior Reviewer", dept: "IT" },
    { id: 102, name: "Peter James", role: "Technical Expert", dept: "Engineering" },
    { id: 103, name: "Arnel Gwen Nuqui", role: "Project Lead", dept: "CS" },
    { id: 104, name: "John Doe", role: "Academic Supervisor", dept: "Education" },
  ];

  const [selectedReviewers, setSelectedReviewers] = useState(() => {
    if (data?.reviewer) {
      const currentNames = data.reviewer.split(', ');
      return reviewers
        .filter(r => currentNames.includes(r.name))
        .map(r => r.id);
    }
    return [];
  });

  if (!isOpen) return null;

  const toggleReviewer = (id) => {
    setSelectedReviewers(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const handleConfirm = () => {
    const selectedNames = reviewers
      .filter(r => selectedReviewers.includes(r.id))
      .map(r => r.name)
      .join(", ");
    
    onUpdate(data.id, selectedNames);
  };

  const filteredReviewers = reviewers.filter(r => 
    r.name.toLowerCase().includes(assignSearch.toLowerCase())
  );

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" onClick={onClose} />

      <div className="relative bg-white w-full max-w-[480px] rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="h-1.5 w-full bg-green-500" />
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Assign Reviewer</h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Info size={12} className="text-green-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Selected Proposal</span>
            </div>
            <p className="text-[13px] font-bold text-slate-600 line-clamp-1 italic">"{data?.title}"</p>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by name..."
              value={assignSearch}
              onChange={(e) => setAssignSearch(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500/20 transition-all font-bold text-slate-700 text-sm"
            />
          </div>

          <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredReviewers.map((reviewer) => {
              const isSelected = selectedReviewers.includes(reviewer.id);
              return (
                <button
                  key={reviewer.id}
                  onClick={() => toggleReviewer(reviewer.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 border-2 ${
                    isSelected ? 'border-green-500 bg-green-50/50' : 'border-transparent bg-slate-50/50 hover:bg-white hover:border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      <User size={16} />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-black ${isSelected ? 'text-green-700' : 'text-slate-700'}`}>{reviewer.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">{reviewer.dept}</p>
                    </div>
                  </div>
                  {isSelected && <Check size={16} className="text-green-600" strokeWidth={4} />}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex gap-3">
            <button onClick={onClose} className="flex-1 py-3.5 text-slate-400 font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 rounded-2xl transition-all">
              Cancel
            </button>
            <button 
              disabled={selectedReviewers.length === 0}
              onClick={handleConfirm}
              className="flex-[2] bg-green-600 disabled:bg-slate-100 disabled:text-slate-300 text-white py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
            >
              Confirm Assignment
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AssignModal;