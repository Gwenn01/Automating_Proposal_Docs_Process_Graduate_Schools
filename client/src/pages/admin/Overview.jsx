import React, { useState } from 'react';
import { Users, UserCheck, FileText, Clock, TrendingUp } from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

const Overview = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const pieData = [
    { name: 'Implementor', value: 450 },
    { name: 'Reviewers', value: 300 },
  ];
  const PIE_COLORS = ['#00923f', '#1cb35a'];

  const barData = [
    { name: 'Jan', Revisions: 65, Completed: 80, Rejected: 25, UnderReview: 40 },
    { name: 'Feb', Revisions: 90, Completed: 70, Rejected: 60, UnderReview: 30 },
    { name: 'Mar', Revisions: 75, Completed: 50, Rejected: 55, UnderReview: 45 },
    { name: 'Apr', Revisions: 50, Completed: 70, Rejected: 65, UnderReview: 55 },
    { name: 'May', Revisions: 65, Completed: 35, Rejected: 80, UnderReview: 60 },
  ];

  const statCards = [
    { 
      label: "Total Implementors", 
      value: "450", 
      trend: "+12.5%", 
      icon: Users, 
      color: "text-[#1cb35a]", 
      bg: "bg-[#e8f5e9]" 
    },
    { 
      label: "Total Reviewers", 
      value: "300", 
      trend: "+5.2%", 
      icon: UserCheck, 
      color: "text-[#1cb35a]", 
      bg: "bg-[#e8f5e9]" 
    },
    { 
      label: "Total Documents", 
      value: "1,284", 
      trend: "+18.7%", 
      icon: FileText, 
      color: "text-[#1cb35a]", 
      bg: "bg-[#e8f5e9]" 
    },
    { 
      label: "Under Reviews", 
      value: "24", 
      trend: "-2.4%", 
      icon: Clock, 
      color: "text-[#1cb35a]", 
      bg: "bg-[#e8f5e9]" 
    },
  ];

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector
          cx={cx} cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          cornerRadius={12}
        />
      </g>
    );
  };

  return (
    // Added overflow-x-hidden and more consistent padding
    <div className="p-8 lg:p-10 space-y-10 bg-[#fbfcfb] h-auto">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">
            Overview Dashboard
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Welcome back! Here's what's happening with the proposals today.
          </p>
        </div>
      </div>

      {/* 1. Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          // Logic to handle trend colors and icons dynamically
          const isNegative = card.trend && card.trend.startsWith('-');
          
          return (
            <div 
              key={index} 
              className="group relative bg-white p-7 rounded-[32px] border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden"
            >
              {/* Decorative Background Glow - Animates on hover */}
              <div className={`absolute -right-2 -top-2 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none ${isNegative ? 'bg-red-400' : 'bg-green-400'}`} />

              <div className="flex items-start justify-between relative z-10">
                {/* Icon Container with Glassmorphism ring */}
                <div className={`p-4 rounded-2xl ${card.bg} ${card.color} ring-8 ring-slate-50/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}>
                  <card.icon size={24} strokeWidth={2.2} />
                </div>

                {/* Dynamic Trend Badge */}
                <div className={`flex items-center gap-1.5 backdrop-blur-md border text-[11px] font-bold px-3 py-1.5 rounded-xl transition-colors duration-300 ${
                  isNegative 
                    ? 'bg-red-50/70 text-red-600 border-red-100' 
                    : 'bg-green-50/70 text-green-600 border-green-100'
                }`}>
                  <TrendingUp size={14} strokeWidth={2.5} className={isNegative ? 'rotate-180 transition-transform' : 'transition-transform'} />
                  <span>{card.trend || '0%'}</span>
                </div>
              </div>

              <div className="mt-10 relative z-10">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                  {card.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-black text-slate-800 tracking-tighter leading-none group-hover:text-green-700 transition-colors duration-300">
                    {card.value || '0'}
                  </h3>
                  <span className="text-xs font-bold text-slate-300 tracking-wide uppercase">Total</span>
                </div>
              </div>

              {/* Bottom Interactive Progress Rail */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-50">
                <div 
                  className={`h-full transition-all duration-1000 ease-out w-0 group-hover:w-full ${
                    isNegative ? 'bg-red-500/30' : 'bg-[#1cb35a]/30'
                  }`} 
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Charts Section - Improved Margins and Proportions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* User Distribution Card */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 min-h-[450px]">
          <div className="w-full md:w-1/2 flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">User Distribution</h3>
              <p className="text-sm text-gray-400 font-medium italic">Ratio: Implementors vs Reviewers</p>
            </div>

            <div className="flex-1 relative min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={pieData}
                    cx="50%" cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    stroke="#fff"
                    strokeWidth={4}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block">Total</span>
                <span className="text-4xl font-black text-gray-800 tracking-tighter">750</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-3 justify-center">
            {pieData.map((entry, index) => (
              <div 
                key={entry.name}
                className={`p-5 rounded-[20px] border transition-all duration-300 flex justify-between items-center ${activeIndex === index ? 'bg-green-50/50 border-green-200' : 'bg-gray-50 border-gray-100'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: PIE_COLORS[index] }} />
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{entry.name}</p>
                    <p className="text-xl font-black text-gray-800">{entry.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-gray-800">{index === 0 ? '60%' : '40%'}</span>
                </div>
              </div>
            ))}
            <p className="text-[10px] text-gray-400 italic mt-4 px-2">* Based on active database records.</p>
          </div>
        </div>

        {/* Proposal Status Report Card */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col min-h-[450px]">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">Proposal Status Report</h3>
              <p className="text-sm text-gray-400 font-medium">Monthly performance analytics</p>
            </div>
            <select className="bg-gray-50 border-none rounded-xl text-[10px] font-black text-gray-500 px-4 py-2 outline-none hover:bg-gray-100 cursor-pointer uppercase tracking-widest">
              <option>Last 5 Months</option>
              <option>Yearly</option>
            </select>
          </div>

          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={8}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Legend verticalAlign="top" align="right" iconType="circle" iconSize={8} wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 'bold' }} />
                <Bar dataKey="Completed" fill="#00923f" radius={[4, 4, 0, 0]} barSize={8} />
                <Bar dataKey="UnderReview" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={8} />
                <Bar dataKey="Revisions" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={8} />
                <Bar dataKey="Rejected" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;