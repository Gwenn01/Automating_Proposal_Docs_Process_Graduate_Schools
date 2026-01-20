import { useState } from 'react';
import { Edit, Trash2, Search, UserPlus } from 'lucide-react';
import EditModal from '../../components/Admin/EditModal';
import DeleteConfirmationModal from '../../components/Admin/DeleteConfirmationModal';
import AddReviewerModal from '../../components/Admin/AddReviewerModal';

const ManageAccount = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    }

    const confirmDelete = () => {
        console.log("Deleting user:", selectedUser.id);
        setIsDeleteModalOpen(false);
    }

    const users = [
        { id: 1, name: "Kian Fontillas", email: "fontillaskian@gmail.com", role: "Implementor" },
        { id: 2, name: "Kian Fontillas", email: "fontillaskian@gmail.com", role: "Reviewer" },
        { id: 3, name: "Kian Fontillas", email: "fontillaskian@gmail.com", role: "Implementor" },
        { id: 4, name: "Kian Fontillas", email: "fontillaskian@gmail.com", role: "Implementor" },
        { id: 5, name: "Peter James", email: "peterjames@gmail.com", role: "Reviewer" },
        { id: 6, name: "Kian Fontillas", email: "fontillaskian@gmail.com", role: "Implementor" },
    ];

    // Filter logic
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 lg:p-10 space-y-10 bg-[#fbfcfb] h-auto animate-in fade-in duration-500">
            
            {/* Header Section - Identical to Overview */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">
                        Manage Accounts
                    </h1>
                    <p className="text-gray-500 text-sm font-medium">
                        View and manage all registered users in the system.
                    </p>
                </div>
            </div>

            {/* Main Content Card - Matching Chart Card Style */}
            <div className="bg-white p-8 rounded-[32px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 overflow-hidden">
                
                {/* Action Row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                    
                    {/* Search Bar - Modern Soft Style */}
                    <div className="relative w-full max-w-md group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1cb35a] transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name or email..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 h-14 rounded-2xl border-none bg-slate-50 focus:ring-2 focus:ring-[#1cb35a]/20 transition-all outline-none text-sm font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium shadow-sm"
                        />
                    </div>

                    {/* Add Button - High End Style */}
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center justify-center gap-2 bg-[#00923f] text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-green-100 hover:bg-[#1cb35a] hover:-translate-y-0.5 transition-all active:scale-95 text-xs uppercase tracking-widest whitespace-nowrap w-full md:w-auto"
                    >
                        <UserPlus size={18} strokeWidth={3} />
                        Add Reviewer Account
                    </button>
                </div>

                {/* Table Section */}
                <div className="overflow-x-hidden">
                    <table className="w-full border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-slate-400 uppercase text-[10px] tracking-[0.2em] font-black">
                                <th className="pb-2 px-8 text-left">ID</th>
                                <th className="pb-2 px-6 text-left">User Details</th>
                                <th className="pb-2 px-6 text-left">Role</th>
                                <th className="pb-2 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="group transition-all duration-300 hover:translate-x-1">
                                    {/* ID Column */}
                                    <td className="py-5 px-8 font-black text-slate-400 bg-slate-50/50 group-hover:bg-white first:rounded-l-[24px] border-y border-l border-transparent group-hover:border-slate-100 group-hover:shadow-sm transition-all">
                                        #{user.id.toString().padStart(2, '0')}
                                    </td>

                                    {/* User Details */}
                                    <td className="py-5 px-6 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 group-hover:shadow-sm transition-all">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-800 text-sm tracking-tight leading-tight">
                                                {user.name}
                                            </span>
                                            <span className="text-[11px] text-slate-400 font-bold tracking-tight">
                                                {user.email}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Role Badge */}
                                    <td className="py-5 px-6 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 group-hover:shadow-sm transition-all">
                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                                            user.role === 'Implementor' 
                                                ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100' 
                                                : 'bg-amber-50 text-amber-600 ring-1 ring-amber-100'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                                user.role === 'Implementor' ? 'bg-emerald-500' : 'bg-amber-500'
                                            }`} />
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="py-5 px-6 bg-slate-50/50 group-hover:bg-white last:rounded-r-[24px] border-y border-r border-transparent group-hover:border-slate-100 group-hover:shadow-sm transition-all text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <button onClick={() => handleEditClick(user)} className="p-2.5 bg-white text-slate-400 rounded-xl hover:bg-[#1cb35a] hover:text-white transition-all duration-200 shadow-sm border border-slate-100 group/edit">
                                                <Edit size={16} strokeWidth={2.5} className="group-hover/edit:scale-110 transition-transform" />
                                            </button>
                                            <button onClick={() => handleDeleteClick(user)} className="p-2.5 bg-white text-slate-400 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm border border-slate-100 group/delete">
                                                <Trash2 size={16} strokeWidth={2.5} className="group-hover/delete:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Optional Empty State */}
                {filteredUsers.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No accounts found matching your search.</p>
                    </div>
                )}
            </div>

            {/* Modals */}
            <AddReviewerModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} userData={selectedUser} />
            <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} userData={selectedUser} />
        </div>
    );
};

export default ManageAccount;