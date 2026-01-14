import React from "react";
import { Upload, Eye, Home } from "lucide-react";
import { prmsuLogo } from "../assets";

const Sidebar = ({ active, setActive, isOpen, toggleSidebar }) => {
  const menuItems = [
    { label: "Dashboard", icon: Home },
    { label: "Upload Docs", icon: Upload }, // Updated icon to match Figma
    { label: "View Docs", icon: Eye },
  ];

  return (
    <div
      className={`fixed md:static top-0 left-0 h-full bg-[#00923f] shadow-xl transform transition-transform duration-300 z-40
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      md:translate-x-0 md:w-72 w-72 flex flex-col`}
    >
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-white p-1 rounded-full w-12 h-12 flex items-center justify-center">
           <img src={prmsuLogo} alt="logo" className="w-10 h-10 object-contain" />
        </div>
        <div>
          <h1 className="text-white font-bold text-sm leading-tight">G.A.D Extension Office</h1>
          <p className="text-gray-200 text-[10px]">Instructor Panel</p>
        </div>
      </div>

      {/* Menu */}
      <ul className="flex-1 px-4 mt-10 space-y-4">
        {menuItems.map(({ label, icon: Icon }) => (
          <li
            key={label}
            onClick={() => {
              setActive(label);
              if(toggleSidebar) toggleSidebar();
            }}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer transition-all ${
              active === label
                ? "bg-[#1cb35a] text-white shadow-md"
                : "text-white/80 hover:bg-white/10 text-white"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-semibold">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;