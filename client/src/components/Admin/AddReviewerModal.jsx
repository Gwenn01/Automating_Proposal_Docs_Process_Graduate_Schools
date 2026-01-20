import React, { useState } from 'react';
import { X, UserPlus, Eye, EyeOff } from 'lucide-react';

const AddReviewerModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
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

        <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-green-50 text-[#00923f] rounded-2xl">
                <UserPlus size={28} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                Add Reviewer
            </h2>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Full Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Full Name
            </label>
            <input 
              type="text" 
              placeholder="e.g. Juan Dela Cruz"
              className="w-full bg-[#f3f4f6] border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#00923f] transition-all text-gray-700 font-medium placeholder:text-gray-400"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="juan@prmsu.edu.ph"
              className="w-full bg-[#f3f4f6] border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#00923f] transition-all text-gray-700 font-medium placeholder:text-gray-400"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2 text-left">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Password
            </label>
            <div className="relative">
                <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full bg-[#f3f4f6] border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#00923f] transition-all text-gray-700 font-medium placeholder:text-gray-400"
                />
                <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <button 
              className="w-full bg-[#00923f] text-white py-4 rounded-2xl font-black text-sm hover:bg-[#007a35] transition-all active:scale-95 shadow-lg shadow-green-100 uppercase tracking-widest"
              onClick={onClose}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewerModal;