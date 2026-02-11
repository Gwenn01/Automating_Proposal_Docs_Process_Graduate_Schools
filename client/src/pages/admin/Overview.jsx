import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  UserCheck,
  FileText,
  Clock,
  Search,
  RefreshCcw,
  FileCheck,
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

/* ================= CONFIG ================= */

const STATIC_CARD_LOOKUP = {
  "Total Implementors": { icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  "Total Reviewers": { icon: UserCheck, color: "text-blue-600", bg: "bg-blue-50" },
  "Total Documents": { icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
};

const STATUS_LOOKUP = {
  "For Reviews": { icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
  "Under Reviews": { icon: Search, color: "text-indigo-600", bg: "bg-indigo-50" },
  "Revisions": { icon: RefreshCcw, color: "text-amber-600", bg: "bg-amber-50" },
  "For Approval": { icon: FileCheck, color: "text-purple-600", bg: "bg-purple-50" },
  "Completed": { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  "Rejected": { icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
};

const PIE_COLORS = ["#16a34a", "#4ade80"];

/* ================= MAIN COMPONENT ================= */

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [staticCards, setStaticCards] = useState([]);
  const [statusCycle, setStatusCycle] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin-overview"
        );

        setStaticCards(res.data.static_cards);
        setStatusCycle(res.data.status_cycle);
        setPieData(res.data.pie_data.filter((i) => i.name !== "Total"));
        setBarData(res.data.bar_data);
      } catch {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= STATES ================= */

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="text-sm text-slate-500 font-semibold uppercase tracking-widest">
          Loading Dashboard...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="text-red-500 font-semibold">{error}</span>
      </div>
    );

  const totalUsers = pieData.reduce((acc, curr) => acc + curr.value, 0);

  /* ================= RENDER ================= */

  return (
    <div className="relative h-auto p-8 lg:p-10 bg-[#fbfcfb] animate-in fade-in duration-700">
      
      {/* HEADER SECTION - Matched to Manage Accounts */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">
            Overview Dashboard
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Monitoring proposal metrics and workflow status.
          </p>
        </div>
      </div>

      {/* ================= TOP SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-stretch">
        
        {/* LEFT: STATS GRID (Bento Style) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {staticCards.map((card, i) => (
            <StatCard key={i} card={card} />
          ))}
          
          {/* Optional: Add a small "Quick Action" or "System Status" card here to fill the 4th slot of the grid if you have 3 cards */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-[#00923f] to-[#1cb35a] p-8 rounded-[32px] shadow-lg flex flex-col justify-between">
            <div className="relative z-10">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70">System Status</span>
              <h3 className="text-xl font-black text-white mt-1">Operational</h3>
            </div>
            <div className="relative z-10 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[11px] font-bold text-white/90">All nodes synced</span>
            </div>
            {/* Abstract Background Pattern */}
            <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>

        {/* RIGHT: PREMIUM PIE CHART CARD */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[32px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 flex flex-col justify-between relative overflow-hidden h-full min-h-[420px]">
          
          {/* Header Section */}
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 block mb-1">
              Platform Analytics
            </span>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">User Distribution</h2>
          </div>

          {/* Chart Container */}
          <div className="flex-grow relative flex items-center justify-center min-h-[240px]">
            {/* Center Label: Total Count - Main Focus */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Total</span>
              <span className="text-4xl font-black text-slate-800 tracking-tighter">
                {totalUsers}
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Users</span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={75}
                  outerRadius={95}
                  paddingAngle={10}
                  stroke="none"
                  startAngle={90}
                  endAngle={450}
                  cornerRadius={40} // Modern rounded edges for each segment
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                      className="hover:opacity-90 transition-all duration-300 cursor-pointer outline-none"
                    />
                  ))}
                </Pie>
                
                {/* Glassmorphic Tooltip */}
                <Tooltip 
                  cursor={false}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/50 animate-in fade-in zoom-in duration-200">
                          <div className="flex items-center gap-2.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: payload[0].payload.fill || PIE_COLORS[0] }} />
                            <span className="text-[11px] font-black text-slate-600 uppercase tracking-tight">{data.name}</span>
                          </div>
                          <div className="mt-1 ml-5">
                            <span className="text-lg font-black text-slate-800">{data.value}</span>
                            <span className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Accounts</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend: Sleek Vertical or Row Layout */}
          <div className="mt-4 pt-6 border-t border-slate-50">
            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
              {pieData.map((entry, i) => (
                <div key={i} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-125" 
                      style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} 
                    />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-800 transition-colors">
                      {entry.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-black text-slate-700">
                    {Math.round((entry.value / totalUsers) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Apple-style Blur */}
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-slate-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
        </div>
      </div>

      {/* ================= SECOND SECTION ================= */}
      <div className="flex flex-col xl:flex-row gap-8 items-stretch">

        {/* BAR CHART CARD */}
        <div className="flex-1 bg-white p-8 rounded-[32px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 flex flex-col">
          <div className="flex flex-col mb-8 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 block mb-1">
              Proposal Status Report
            </span>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Workflow Metrics</h2>
          </div>

          <div className="flex-grow w-full min-h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={barData} 
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} 
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc', radius: 12 }} 
                  trigger="axis"
                  content={({ active, payload, label }) => {
                    if (active) {
                      // MATCHED TO API RESPONSE KEYS
                      const allStatusKeys = [
                        { key: "ForReview", label: "For Review", color: "#3b82f6" },
                        { key: "UnderReview", label: "Under Review", color: "#6366f1" },
                        { key: "Revisions", label: "Revisions", color: "#f59e0b" },
                        { key: "Approval", label: "For Approval", color: "#a855f7" },
                        { key: "Completed", label: "Completed", color: "#10b981" },
                        { key: "Rejected", label: "Rejected", color: "#ef4444" },
                      ];

                      const currentData = payload && payload.length ? payload[0].payload : {};

                      return (
                        <div className="bg-white/70 backdrop-blur-md px-4 py-4 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40 min-w-[210px] animate-in fade-in zoom-in duration-200">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3 border-b border-slate-100/50 pb-2">
                            {label} Report
                          </p>
                          
                          <div className="flex flex-col gap-3">
                            {allStatusKeys.map((status) => {
                              const value = currentData[status.key] || 0;
                              return (
                                <div key={status.key} className="flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-2.5">
                                    <div className="relative">
                                      <div 
                                        className="w-2.5 h-2.5 rounded-full shadow-sm" 
                                        style={{ backgroundColor: status.color }} 
                                      />
                                      <div className="absolute inset-0 rounded-full bg-white/20" />
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                                      {status.label}
                                    </span>
                                  </div>
                                  <span className={`text-sm font-black ${value > 0 ? 'text-slate-800' : 'text-slate-400'}`}>
                                    {value}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* DATA KEYS MATCHED TO API RESPONSE */}
                <Bar dataKey="ForReview" fill="#3b82f6" radius={[6,6,0,0]} barSize={16} />
                <Bar dataKey="UnderReview" fill="#6366f1" radius={[6,6,0,0]} barSize={16} />
                <Bar dataKey="Revisions" fill="#f59e0b" radius={[6,6,0,0]} barSize={16} />
                <Bar dataKey="Approval" fill="#a855f7" radius={[6,6,0,0]} barSize={16} />
                <Bar dataKey="Completed" fill="#10b981" radius={[6,6,0,0]} barSize={16} />
                <Bar dataKey="Rejected" fill="#ef4444" radius={[6,6,0,0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* STATUS GRID CARD - Premium 2-Column Layout */}
        <div className="xl:w-[420px] bg-white p-8 rounded-[32px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 flex flex-col min-h-full">
          
          {/* Header Section - Fixed Height */}
          <div className="mb-8 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 block mb-1">
              Lifecycle Tracking
            </span>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Active States</h2>
          </div>

          {/* Main Grid - Flexible but grows to fill available space */}
          <div className="grid grid-cols-2 gap-4 flex-grow">
            {statusCycle.map((status, index) => {
              const config = STATUS_LOOKUP[status.label] || STATUS_LOOKUP["Under Reviews"];
              
              return (
                <div
                  key={index}
                  className="group relative flex flex-col justify-between p-6 rounded-[28px] bg-[#f8fafc]/50 border border-transparent hover:bg-white hover:border-slate-100 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden cursor-default"
                >
                  {/* Top: Icon & Glow */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div className={`w-11 h-11 rounded-2xl ${config.bg} ${config.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      {React.createElement(config.icon, { size: 20, strokeWidth: 2.2 })}
                    </div>
                    
                    {/* Status Indicator Dot */}
                    <div className={`w-1.5 h-1.5 rounded-full ${status.value > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200'}`} />
                  </div>

                  {/* Bottom: Label & Value */}
                  <div className="mt-4 relative z-10">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">
                      {status.label}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <h4 className="text-3xl font-black text-slate-800 tracking-tight">
                        {status.value}
                      </h4>
                      <span className="text-[9px] font-bold text-slate-300 uppercase">Items</span>
                    </div>
                  </div>

                  {/* Subtle Apple-style Aura on hover */}
                  <div className={`absolute -right-6 -bottom-6 w-20 h-20 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${config.bg}`} />
                </div>
              );
            })}
          </div>

          {/* Footer Section - Fixed at Bottom */}
          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">System Updated</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[9px] font-black text-slate-400 uppercase">Total:</span>
              <span className="text-lg font-black text-slate-800">
                {statusCycle.reduce((acc, curr) => acc + curr.value, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= STAT CARD ================= */

const StatCard = ({ card }) => {
  const config = STATIC_CARD_LOOKUP[card.label];

  return (
    <div className="group relative flex-1 bg-white p-8 rounded-[32px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden">
      
      {/* 1. Subtle Glass Gradient Background - Appears on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-transparent via-slate-50/30 to-slate-100/20" />

      {/* 2. Top Row: Icon & Background "Aura" */}
      <div className="relative z-10 flex justify-between items-start">
        <div className={`relative p-4 rounded-[22px] ${config.bg} ${config.color} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-${config.color.split('-')[1]}-500/20`}>
          {/* Inner Glossy Effect */}
          <div className="absolute inset-0 rounded-[22px] bg-gradient-to-tr from-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative">
            {React.createElement(config.icon, { 
              size: 24, 
              strokeWidth: 2.5,
              className: "drop-shadow-sm" 
            })}
          </div>
        </div>

        {/* 3. Decorative "Mini Graph" - Adds that 'Analytics' feel */}
        <div className="flex gap-1 items-end h-8 opacity-20 group-hover:opacity-100 transition-all duration-700">
          <div className="w-1 bg-slate-200 rounded-full h-[40%] group-hover:h-[60%] transition-all duration-500" />
          <div className="w-1 bg-slate-200 rounded-full h-[70%] group-hover:h-[40%] transition-all duration-500 delay-75" />
          <div className="w-1 bg-slate-200 rounded-full h-[50%] group-hover:h-[90%] transition-all duration-500 delay-100" />
          <div className={`w-1 rounded-full h-[80%] group-hover:h-[100%] transition-all duration-500 delay-150 ${config.bg.replace('/10', '')}`} />
        </div>
      </div>

      {/* 4. Text Content */}
      <div className="relative z-10 mt-10">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
            {card.label}
          </span>
          {/* Pulsing "Live" dot */}
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="flex items-baseline gap-1 mt-1">
          <h3 className="text-5xl font-black text-slate-800 tracking-tighter transition-all duration-500 group-hover:text-black">
            {card.value}
          </h3>
          <span className="text-[10px] font-bold text-slate-400">Total</span>
        </div>
      </div>

      {/* 5. Decorative Corner Light - Minimalist Flare */}
      <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-1000 ${config.bg}`} />
      
      {/* 6. Border Highlight - Matches System Core style */}
      <div className="absolute inset-0 border border-transparent group-hover:border-slate-200/60 rounded-[32px] transition-colors duration-500" />
    </div>
  );
};

export default Overview;
