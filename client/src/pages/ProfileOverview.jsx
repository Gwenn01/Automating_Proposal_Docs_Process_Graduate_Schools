import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, MapPin, Briefcase, GraduationCap, LogOut, Edit3, Shield, Calendar } from "lucide-react";
import EditProfileModal from "../components/EditProfileModal";

const ProfileOverview = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {fetched, setFetched} = useState(false);

  useEffect(() => {
    if (fetched) return; // skip if already fetched

    const fetchProfile = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) throw new Error("No user logged in");

        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser?.user_id || parsedUser?.id;
        const res = await axios.get(`http://127.0.0.1:5000/api/get-profile/${userId}`);
        const data = Array.isArray(res.data) ? res.data[0] : res.data;

        if (data) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
        setFetched(true);
      }
    };

    fetchProfile();
  }, [fetched, setFetched]);

  const handleUpdateUser = (updatedData) => {
    setUser(updatedData);
    localStorage.setItem("user", JSON.stringify(updatedData));
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    alert("Logging out...");
    // localStorage.removeItem("user");
    // localStorage.removeItem("userId");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-medium text-slate-400">
        Loading Profile...
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-10 rounded-[2rem] shadow-2xl border border-slate-100 text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <User className="text-emerald-500 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">No Profile Found</h2>
          <p className="text-slate-500 mb-8 font-medium">
            Please sign in to access your professional dashboard.
          </p>
          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95">
            Go to Login
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userData={user}
          onSave={handleUpdateUser}
        />

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200/60 overflow-hidden">
          {/* Banner */}
          <div className="h-44 md:h-60 bg-emerald-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700" />
            <div className="absolute top-[-10%] right-[-5%] w-[70%] h-[120%] rounded-full bg-emerald-400/20 blur-[80px]" />
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17L3 10l7-7 7 7-7 7zm10 10l7-7 7 7-7 7-7-7z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/40 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />
          </div>

          {/* Profile Content */}
          <div className="px-8 md:px-16 pb-12">
            <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-20 md:-mt-28 mb-12 px-4 md:px-0">
              {/* Avatar */}
              <div className="relative z-10">
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full border-[8px] border-white bg-white shadow-2xl shadow-slate-200/50 overflow-hidden flex items-center justify-center group transition-transform duration-500 hover:scale-[1.02]">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white text-6xl font-black tracking-tighter">
                      {getInitials(user.fullname || user.name)}
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-full border border-black/5 pointer-events-none"></div>
                </div>
                <div className="absolute bottom-4 right-4 w-9 h-9 bg-emerald-500 border-[5px] border-white rounded-full shadow-lg flex items-center justify-center">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                </div>
              </div>

              {/* Identity Section */}
              <div className="mt-8 md:mt-0 md:ml-10 flex-1 text-center md:text-left md:pb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.15em]">
                    Online Now
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 tracking-tight leading-none mb-4">
                  {user.fullname || user.name || "User Name"}
                </h1>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 text-slate-500 font-semibold tracking-wide uppercase text-xs">
                  <span className="flex items-center gap-2 group cursor-default">
                    <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-emerald-100 transition-colors">
                      <Briefcase size={14} className="group-hover:text-emerald-600" />
                    </div>
                    {user.position || "Implementor"}
                  </span>

                  <span className="hidden md:block h-4 w-[1px] bg-slate-200"></span>

                  <span className="flex items-center gap-2 group cursor-default">
                    <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-blue-100 transition-colors">
                      <MapPin size={14} className="group-hover:text-blue-600" />
                    </div>
                    {user.campus ? `${user.campus} Campus` : "PRMSU"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 md:mt-0 flex items-center gap-4 md:pb-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 active:scale-95 text-sm"
                >
                  <Edit3 size={18} strokeWidth={2.5} />
                  <span>Edit Profile</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-[52px] h-[52px] bg-white border border-slate-200 text-red-500 rounded-2xl hover:bg-red-50 hover:border-red-100 hover:-translate-y-1 transition-all duration-300 shadow-sm group"
                  title="Logout"
                >
                  <LogOut size={20} className="group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 pt-12 border-t border-slate-100">
              <DetailSectionPersonal user={user} />
              <DetailSectionAcademic user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Detail Components
const DetailSectionPersonal = ({ user }) => (
  <div className="relative group">
    <div className="flex items-center gap-3 mb-8">
      <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100/50">
        <User size={20} strokeWidth={2.5} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900 leading-none">Personal Profile</h3>
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-1 font-bold">
          Identity & Contact
        </p>
      </div>
    </div>
    <div className="grid gap-4">
      <DetailItem icon={<Mail className="text-emerald-500" />} label="Email Address" value={user.email || "No email provided"} />
      <DetailItem icon={<User className="text-emerald-500" />} label="Full Name" value={user.fullname || user.name} />
      <DetailItem icon={<Shield className="text-emerald-500" />} label="Account Status" isBadge value={user.role || "User"} />
    </div>
  </div>
);

const DetailSectionAcademic = ({ user }) => (
  <div className="relative group">
    <div className="flex items-center gap-3 mb-8">
      <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100/50">
        <GraduationCap size={20} strokeWidth={2.5} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900 leading-none">Academic Profile</h3>
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-1 font-bold">
          University & Department
        </p>
      </div>
    </div>
    <div className="grid gap-4">
      <DetailItem icon={<Briefcase className="text-blue-500" />} label="Department" value={user.department || "General Education"} />
      <DetailItem icon={<MapPin className="text-blue-500" />} label="Primary Campus" value={user.campus || "Main Campus"} isCapitalize />
      <DetailItem icon={<Calendar className="text-blue-500" />} label="Official Start Date" value={new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} />
    </div>
  </div>
);

const DetailItem = ({ label, value, icon, isBadge, isCapitalize }) => (
  <div className="flex items-center p-4 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-md hover:shadow-slate-100/50 transition-all duration-300 group/item">
    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white shadow-sm border border-slate-100 group-hover/item:scale-110 transition-transform duration-300">
      {React.cloneElement(icon, { size: 18, strokeWidth: 2.5 })}
    </div>
    <div className="ml-4 flex flex-col">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-0.5">{label}</span>
      {isBadge ? (
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-black text-emerald-700 uppercase tracking-tighter">{value}</span>
        </div>
      ) : (
        <span className={`text-[15px] font-bold text-slate-800 ${isCapitalize ? "capitalize" : ""}`}>{value}</span>
      )}
    </div>
  </div>
);

export default ProfileOverview;
