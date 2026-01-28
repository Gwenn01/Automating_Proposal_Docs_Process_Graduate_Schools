import { useState, useEffect } from "react";
import { Edit, Trash2, Search, UserPlus, MoreHorizontal } from "lucide-react";
import EditModal from "../../components/Admin/EditModal";
import DeleteConfirmationModal from "../../components/Admin/DeleteConfirmationModal";
import AddAccountModal from "../../components/Admin/AddAccountModal";
import axios from "axios";

const ManageAccount = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return;

    setProgress(0);
    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 10;
      setProgress(Math.min(value, 95)); // stop at 95% visually
    }, 300);

    return () => clearInterval(interval);
  }, [loading]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting user:", selectedUser.id);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:5000/api/get-all-accounts",
        );
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter logic
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="w-full h-full bg-white inset-0 z-[60] flex items-center justify-center backdrop-blur-md animate-fade-in">
        <div
          
          className="relative bg-white px-14 py-10 flex flex-col items-center animate-pop-out w-[450px]"
        >
          {/* Floating Spinner */}
          {/* <div className="relative animate-float mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 animate-spin" />
            <div className="absolute inset-2 bg-white rounded-full" />
          </div> */}

          <p className="text-lg font-semibold shimmer-text mb-2 text-center">
          Synchronizing Records
          </p>

          <p className="text-xs w-full text-gray-500 mb-4 text-center">
            Preparing the latest user and reviewer data
          </p>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500 font-medium">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    );
}



  if (error) return <p>{error}</p>;

  return (
    <div className="relative min-h-screen p-8 lg:p-10 bg-[#fbfcfb] animate-in fade-in duration-700">
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
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1cb35a] transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 h-14 rounded-2xl border-none bg-slate-50 focus:ring-2 focus:ring-[#1cb35a]/20 transition-all outline-none text-sm font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium shadow-sm"
            />
          </div>

          {/* Add Button - Ultra-Premium Modern Style */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="group relative flex items-center justify-center gap-3 bg-[#00923f] text-white px-8 py-4 rounded-[22px] font-black transition-all duration-500 hover:-translate-y-1 active:scale-95 w-full md:w-auto overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,146,63,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(0,146,63,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00a34a] via-[#00923f] to-[#1cb35a] transition-all duration-500 group-hover:scale-110" />

            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </div>

            <div className="relative z-10 p-1.5 bg-white/15 rounded-xl group-hover:bg-white/25 transition-all duration-300">
              <UserPlus
                size={16}
                strokeWidth={3}
                className="group-hover:rotate-12 transition-transform duration-300"
              />
            </div>

            {/* 4. Button Text */}
            <span className="relative z-10 text-[11px] uppercase tracking-[0.2em] whitespace-nowrap drop-shadow-sm">
              Create Account
            </span>

            {/* 5. Subtle Glow Layer - Nag-a-activate sa hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 transition-opacity duration-500" />

            {/* 6. Inner Highlight Border */}
            <div className="absolute inset-0 rounded-[22px] border border-white/20 pointer-events-none" />
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
                <tr
                  key={user.id}
                  className="group transition-all duration-300 hover:translate-x-1"
                >
                  {/* ID Column - Modern Badge Style */}
                  <td className="py-5 px-8 group-hover:bg-white first:rounded-l-[32px] border-y border-l border-transparent group-hover:border-slate-100 transition-all duration-300 relative overflow-hidden">
                    {/* Monospace ID with Badge Effect */}
                    <div className="flex items-center">
                      <span className="relative z-10 font-mono text-[11px] font-black tracking-tighter px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-green-50 group-hover:text-green-600 transition-colors duration-300">
                        #{user.id.toString().padStart(2, "0")}
                      </span>

                      {/* Subtle Vertical Indicator on Hover */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-green-500 group-hover:h-1/2 transition-all duration-500 rounded-r-full" />
                    </div>
                  </td>

                  {/* User Details - Enhanced Identity Style */}
                  <td className="py-5 px-6 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      {/* Avatar Circle with Initials */}
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-200 group-hover:from-green-50 group-hover:to-green-100 group-hover:border-green-200 transition-all duration-500">
                          <span className="text-[12px] font-black text-slate-500 group-hover:text-green-600 tracking-tighter">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        </div>
                        {/* Online Status Dot (Optional Aesthetic) */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full group-hover:ring-4 group-hover:ring-green-500/20 transition-all" />
                      </div>

                      {/* Text Details */}
                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-slate-800 text-[14px] tracking-tight leading-none mb-1 group-hover:text-green-700 transition-colors">
                          {user.name}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-green-400 transition-colors" />
                          <span className="text-[11px] text-slate-400 font-bold tracking-tight truncate max-w-[180px]">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role Badge - Modern Glossy Style */}
                  <td className="py-5 px-6 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 transition-all duration-300">
                    <div className="flex items-center">
                      <span
                        className={`
                                                inline-flex items-center px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500
                                                ${
                                                  user.role === "implementor"
                                                    ? "bg-emerald-50/50 text-emerald-700 ring-2 ring-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_8px_20px_-6px_rgba(16,185,129,0.4)]"
                                                    : "bg-amber-50/50 text-amber-700 ring-2 ring-amber-500/10 group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-[0_8px_20px_-6px_rgba(245,158,11,0.4)]"
                                                }
                                            `}
                      >
                        {/* Pulsing Indicator Icon */}
                        <div className="relative mr-2.5 flex items-center justify-center">
                          <span
                            className={`absolute w-2 h-2 rounded-full animate-ping opacity-75 ${
                              user.role === "implementor"
                                ? "bg-emerald-400"
                                : "bg-amber-400"
                            }`}
                          />
                          <span
                            className={`relative w-1.5 h-1.5 rounded-full ${
                              user.role === "implementor"
                                ? "bg-emerald-500 group-hover:bg-white"
                                : "bg-amber-500 group-hover:bg-white"
                            } transition-colors duration-300`}
                          />
                        </div>

                        {user.role}
                      </span>
                    </div>
                  </td>

                  {/* Actions - Modern Soft-UI Style */}
                  <td className="py-5 px-6 group-hover:bg-white last:rounded-r-[32px] border-y border-r border-transparent group-hover:border-slate-100 transition-all duration-300">
                    <div className="flex items-center justify-center gap-2">
                      {/* Edit Action */}
                      <button
                        onClick={() => handleEditClick(user)}
                        title="Edit User"
                        className="group/edit relative p-2.5 bg-slate-100/50 text-slate-500 rounded-xl hover:bg-emerald-500 hover:text-white hover:shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)] transition-all duration-300 active:scale-90"
                      >
                        <Edit
                          size={18}
                          strokeWidth={2.5}
                          className="transition-transform duration-300 group-hover/edit:rotate-12 group-hover/edit:scale-110"
                        />
                      </button>

                      {/* Delete Action */}
                      <button
                        onClick={() => handleDeleteClick(user)}
                        title="Delete Account"
                        className="group/delete relative p-2.5 bg-slate-100/50 text-slate-500 rounded-xl hover:bg-red-500 hover:text-white hover:shadow-[0_8px_20px_-6px_rgba(239,68,68,0.5)] transition-all duration-300 active:scale-90"
                      >
                        <Trash2
                          size={18}
                          strokeWidth={2.5}
                          className="transition-transform duration-300 group-hover/delete:translate-y-[-1px] group-hover/delete:scale-110"
                        />
                      </button>

                      {/* Separator Line (Optional Decorative) */}
                      <div className="w-[1px] h-4 bg-slate-200 mx-1 group-hover:bg-slate-100 transition-colors" />
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
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
              No accounts found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddAccountModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={selectedUser}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        data={selectedUser}
      />
    </div>
  );
};

export default ManageAccount;
