import React, { useState } from 'react';
import { AlertCircle, X, Loader2 } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, onClose, data, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleConfirmDeletion = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: data.id }),
      });

      const result = await response.json();

      if (response.ok) {
        // Trigger success callback (e.g., refresh list, show toast)
        onSuccess?.(result);
        onClose();
      } else {
        alert(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Deletion error:", error);
      alert("Failed to connect to the server.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
      <div 
        className="fixed inset-0 bg-slate-950/20 backdrop-blur-md transition-all duration-500" 
        onClick={!isDeleting ? onClose : undefined}
      />

      <div className="relative bg-white/90 backdrop-blur-xl w-full max-w-md rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-white/40 p-8 animate-in fade-in zoom-in-95 duration-300 ease-out">
        
        {!isDeleting && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
          >
            <X size={18} />
          </button>
        )}

        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-shrink-0 w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-100/50">
              <AlertCircle size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Delete Account</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mt-0.5">
                Final Confirmation
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50/50 rounded-2xl p-5 mb-8 border border-slate-100">
             <p className="text-slate-600 text-sm leading-relaxed">
              You are removing <span className="font-semibold text-slate-900">{data?.name}</span>. 
              This will permanently erase all associated data from the production database.
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              disabled={isDeleting}
              onClick={onClose}
              className="flex-1 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition-all"
            >
              Cancel
            </button>
            <button 
              disabled={isDeleting}
              onClick={handleConfirmDeletion}
              className="flex-1 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                'Delete Record'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;