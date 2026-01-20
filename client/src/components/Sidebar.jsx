import React from "react";
import {
  Upload,
  Eye,
  Home,
  FileCheck,
  Users,
  Files,
  UserCheck,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { prmsuLogo } from "../assets";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Sidebar = ({ active, setActive, isOpen, toggleSidebar, role }) => {
  const navigate = useNavigate();

  const menuByRole = {
    implementor: [
      { label: "Create Proposal", icon: Upload },
      { label: "View Proposal", icon: Eye },
      { label: "Edit Proposal", icon: Eye },
    ],

    reviewer: [
      { label: "Review Proposal", icon: FileCheck },
    ],

    admin: [
      { label: "Overview", icon: Home },
      { label: "Assign to Review", icon: UserCheck },
      { label: "Manage Account", icon: Users },
      { label: "Manage Documents", icon: Files },
      { label: "View Review", icon: ClipboardList },
    ],
  };

  const menuItems = menuByRole[role] || [];

  /* ================= LOGOUT ================= */
const handleLogout = () => {
  logout();
  navigate("/", { replace: true });
};

  return (
    <div
      className={`fixed md:static top-0 left-0 h-full bg-[#00923f] shadow-xl transform transition-transform duration-300 z-40
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      md:translate-x-0 md:w-72 w-72 flex flex-col`}
    >
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-white p-1 rounded-full w-16 h-16 flex items-center justify-center">
          <img
            src={prmsuLogo}
            alt="logo"
            className="w-14 h-14 object-contain rounded-full"
          />
        </div>
        <div>
          <h1 className="text-white font-bold text-sm leading-tight">
            G.A.D Extension Office
          </h1>
          <p className="text-gray-200 text-[10px] capitalize">
            {role} Panel
          </p>
        </div>
      </div>

      {/* Menu */}
      <ul className="flex-1 px-4 mt-10 space-y-4">
        {menuItems.map(({ label, icon: Icon }) => (
          <li
            key={label}
            onClick={() => {
              setActive(label);
              if (toggleSidebar) toggleSidebar();
            }}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer transition-all ${
              active === label
                ? "bg-[#1cb35a] text-white shadow-md"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-semibold">{label}</span>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <div className="px-4 pb-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-6 py-3 rounded-xl text-white/90 hover:bg-red-500/20 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
