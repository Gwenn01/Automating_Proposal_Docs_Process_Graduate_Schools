import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

const EditModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const isDocument = data && Object.prototype.hasOwnProperty.call(data, 'title');

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl p-10 md:p-14 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Dynamic Header */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12 tracking-tight">
          {isDocument ? 'Edit Document' : 'Edit User'}
        </h2>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          {/* SHARED FIELD: Name / Author */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-sm font-black text-gray-400 uppercase tracking-widest min-w-30">
              {isDocument ? 'Author:' : 'Full Name:'}
            </label>
            <input 
              type="text" 
              defaultValue={data?.name}
              disabled={isDocument} // Disabled kung document para title lang ang ma-edit
              className={`flex-1 rounded-2xl py-4 px-6 outline-none transition-all font-bold text-gray-700 ${
                isDocument ? 'bg-gray-50 border border-gray-100' : 'bg-[#f3f4f6] focus:ring-2 focus:ring-[#00923f]'
              }`}
            />
          </div>

          {/* DYNAMIC FIELD: Title (for Documents) */}
          {isDocument && (
            <div className="flex flex-col md:flex-row gap-4">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest min-w-30 pt-4">
                Title:
              </label>
              <textarea 
                rows="4"
                defaultValue={data?.title}
                className="flex-1 bg-[#f3f4f6] border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#00923f] transition-all text-gray-700 font-bold resize-none leading-relaxed"
              />
            </div>
          )}

          {/* DYNAMIC FIELD: Email (for Users) */}
          {!isDocument && (
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest min-w-30">
                Email:
              </label>
              <input 
                type="email" 
                defaultValue={data?.email}
                className="flex-1 bg-[#f3f4f6] border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#00923f] transition-all text-gray-700 font-bold"
              />
            </div>
          )}

          {/* DYNAMIC FIELD: Role (for Users) */}
          {!isDocument && (
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest min-w-30">
                Role:
              </label>
              <select 
                defaultValue={data?.role}
                className="flex-1 bg-[#f3f4f6] border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#00923f] transition-all text-gray-700 font-black appearance-none cursor-pointer"
              >
                <option value="Instructor">Instructor</option>
                <option value="Reviewer">Reviewer</option>
              </select>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-6 flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button 
              className="bg-[#00923f] text-white px-10 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#007a35] transition-all active:scale-95 shadow-lg shadow-green-100 flex items-center gap-2"
              onClick={onClose}
            >
              <CheckCircle2 size={18} />
              Confirm Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;