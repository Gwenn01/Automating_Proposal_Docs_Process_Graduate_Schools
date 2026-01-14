import React from "react";
import { X } from "lucide-react";

const ReviewerModal = ({ isOpen, onClose, onViewDocument }) => {
  if (!isOpen) return null;

  const reviewers = [
    { id: 1, name: "Arnel Gwen Nuqui", avatar: "https://via.placeholder.com/32", badge: 3 },
    { id: 2, name: "Peterjames Angelo Marteja", avatar: "https://via.placeholder.com/32", badge: 0 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8 relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black">
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold text-gray-800 mb-8">Reviewer</h3>

        <div className="space-y-4">
          {reviewers.map((rev, index) => (
            <div key={rev.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-full">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-700">{index + 1}.</span>
                <span className="text-sm font-semibold text-gray-700">{rev.name}</span>
                
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onViewDocument(rev)}
                  className="bg-[#00923f] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-green-700 transition-colors"
                >
                  View
                </button>
                {/* {rev.badge > 0 && (
                  <span className="bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {rev.badge}
                  </span>
                )} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewerModal;