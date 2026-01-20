import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, userData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl p-10 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Warning Icon Container */}
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mb-6 shadow-sm border border-red-100">
            <AlertTriangle size={40} strokeWidth={2.5} />
          </div>

          <h2 className="text-2xl font-black text-gray-800 mb-2 tracking-tight">
            Confirm Deletion
          </h2>
          
          <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8">
            Are you sure you want to delete <span className="font-bold text-gray-800">{userData?.name}</span>? 
            This action cannot be undone and all associated data will be lost.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col w-full gap-3">
            <button 
              onClick={onConfirm}
              className="w-full bg-red-500 text-white py-4 rounded-2xl font-black text-sm hover:bg-red-600 transition-all active:scale-[0.98] shadow-lg shadow-red-100"
            >
              Yes, Delete Account
            </button>
            
            <button 
              onClick={onClose}
              className="w-full bg-gray-50 text-gray-500 py-4 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all active:scale-[0.98]"
            >
              No, Keep it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;