import React, { useState, useEffect } from 'react';
import { Users, UserCheck, FileText, Clock, TrendingUp, CheckCircle, XCircle, RefreshCcw } from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

// Status data for the 4th card (Cycling)
  const statusCycle = [
    { label: "Under Reviews", value: "24", trend: "-2.4%", icon: Clock, color: "text-blue-600", bg: "bg-blue-50", glow: "bg-blue-400" },
    { label: "Completed", value: "80", trend: "+12.1%", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", glow: "bg-green-400" },
    { label: "Rejected", value: "12", trend: "-5.4%", icon: XCircle, color: "text-red-600", bg: "bg-red-50", glow: "bg-red-400" },
    { label: "Revisions", value: "45", trend: "+8.2%", icon: RefreshCcw, color: "text-amber-600", bg: "bg-amber-50", glow: "bg-amber-400" },
  ];

const Overview = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStatusIndex((prev) => (prev + 1) % statusCycle.length);
        setIsAnimating(false);
      }, 500); 
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  const staticCards = [
    { label: "Total Implementors", value: "450", trend: "+12.5%", icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Reviewers", value: "300", trend: "+5.2%", icon: UserCheck, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Documents", value: "1,284", trend: "+18.7%", icon: FileText, color: "text-green-600", bg: "bg-green-50" },
  ];

  const pieData = [{ name: 'Implementor', value: 450 }, { name: 'Reviewers', value: 300 }];
  const PIE_COLORS = ['#16a34a', '#4ade80'];

  const barData = [
    { name: 'Jan', Revisions: 65, Completed: 80, Rejected: 25, UnderReview: 40 },
    { name: 'Feb', Revisions: 90, Completed: 70, Rejected: 60, UnderReview: 30 },
    { name: 'Mar', Revisions: 75, Completed: 50, Rejected: 55, UnderReview: 45 },
    { name: 'Apr', Revisions: 50, Completed: 70, Rejected: 65, UnderReview: 55 },
    { name: 'May', Revisions: 65, Completed: 35, Rejected: 80, UnderReview: 60 },
  ];

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

    return (
      <g>
        {/* Outer Glow Effect */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.3}
          cornerRadius={12}
        />
        {/* Main Active Sector */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          cornerRadius={12}
          stroke="#fff"
          strokeWidth={2}
        />
      </g>
    );
  };

  return (
    <div className="p-8 lg:p-10 space-y-10 bg-[#fbfcfb] h-auto">
      
      {/* Header */}
      <div className="px-2">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">Overview Dashboard</h1>
        <p className="text-gray-500 text-sm font-medium">Monitoring proposal metrics and status cycles.</p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {staticCards.map((card, index) => (
          <StatCard key={index} card={card} />
        ))}

        {/* Improved Dynamic 4th Card */}
        <div className="group relative bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
          {/* Dynamic Background Glow */}
          <div className={`absolute -right-4 -top-4 w-28 h-28 rounded-full blur-3xl opacity-20 transition-colors duration-1000 ${statusCycle[currentStatusIndex].glow}`} />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-start justify-between">
              <div className={`p-4 rounded-2xl transition-all duration-500 transform ${isAnimating ? 'scale-75 opacity-0' : 'scale-100 opacity-100'} ${statusCycle[currentStatusIndex].bg} ${statusCycle[currentStatusIndex].color}`}>
                {React.createElement(statusCycle[currentStatusIndex].icon, { size: 24, strokeWidth: 2.2 })}
              </div>
              
              {/* Pagination Indicators */}
              <div className="flex gap-1.5 pt-2">
                {statusCycle.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-500 ${currentStatusIndex === i ? 'w-4 bg-slate-400' : 'w-1 bg-slate-200'}`} />
                ))}
              </div>
            </div>

            <div className="mt-10 overflow-hidden">
              <div className={`transition-all duration-700 transform ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                  {statusCycle[currentStatusIndex].label}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-black text-slate-800 tracking-tighter leading-none">
                      {statusCycle[currentStatusIndex].value}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-300 uppercase">Total</span>
                  </div>
                  <div className={`text-[11px] font-bold px-2 py-1 rounded-lg border transition-colors duration-700 ${
                    statusCycle[currentStatusIndex].trend.startsWith('-') ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'
                  }`}>
                    {statusCycle[currentStatusIndex].trend}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animating Loader Bar at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50">
             <div 
              key={currentStatusIndex}
              className="h-full bg-slate-200 origin-left"
              style={{ animation: 'progress 4s linear forwards' }}
            />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* User Distribution Card */}
        <div className="bg-white p-8 rounded-[32px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col md:flex-row items-center gap-10 min-h-[480px] transition-all duration-300 hover:shadow-md">
          
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="mb-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">User Distribution</h3>
              <p className="text-sm text-slate-400 font-medium">Active platform roles</p>
            </div>

            <div className="h-[280px] relative mt-4 group">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape} // Gamitin natin yung dating activeShape logic mo
                    data={pieData}
                    cx="50%" cy="50%"
                    innerRadius={80}
                    outerRadius={105}
                    paddingAngle={5}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={PIE_COLORS[index]} 
                        className="transition-all duration-500 outline-none"
                        style={{
                          filter: activeIndex === index ? `drop-shadow(0 0 12px ${PIE_COLORS[index]}40)` : 'none'
                        }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Label - Dinamiko depende sa Hover */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] block mb-1">
                  {activeIndex !== null ? pieData[activeIndex].name : "Total"}
                </span>
                <h4 className="text-4xl font-black text-slate-800 tracking-tighter transition-all duration-300">
                  {activeIndex !== null ? pieData[activeIndex].value : "750"}
                </h4>
              </div>
            </div>
          </div>

          {/* Legend / List Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            {pieData.map((entry, index) => {
              const percentage = ((entry.value / 750) * 100).toFixed(1);
              const isActive = activeIndex === index;
              
              return (
                <div 
                  key={entry.name}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`group/item p-5 rounded-[24px] border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isActive 
                      ? 'bg-slate-900 border-slate-900 shadow-lg -translate-x-2' 
                      : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                      {/* Animated Indicator */}
                      <div 
                        className={`w-1.5 h-8 rounded-full transition-all duration-500 ${
                          isActive ? 'bg-white scale-y-110' : ''
                        }`} 
                        style={{ backgroundColor: !isActive ? PIE_COLORS[index] : undefined }}
                      />
                      <div>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
                          {entry.name}
                        </p>
                        <p className={`text-xl font-black ${isActive ? 'text-white' : 'text-slate-800'}`}>
                          {entry.value}
                        </p>
                      </div>
                    </div>

                    {/* Percentage Badge */}
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black transition-all duration-300 ${
                      isActive ? 'bg-white/10 text-white' : 'bg-white text-slate-500 border border-slate-100 shadow-sm'
                    }`}>
                      {percentage}%
                    </div>
                  </div>
                  
                  {/* Subtle background icon/pattern on hover */}
                  {isActive && (
                    <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                      <Users size={80} strokeWidth={4} className="text-white" />
                    </div>
                  )}
                </div>
              );
            })}
            
            <p className="text-[10px] text-center md:text-left font-bold text-slate-300 uppercase tracking-widest mt-2">
              Data updated as of today
            </p>
          </div>
        </div>

        {/* Proposal Status Report Card */}
        <div className="bg-white p-8 rounded-[32px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] border border-slate-100 min-h-[480px] flex flex-col transition-all duration-300 hover:shadow-md">
          
          {/* Enhanced Header with Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Proposal Status Report</h3>
              <p className="text-sm text-slate-400 font-medium">Monthly performance and approval metrics</p>
            </div>
            
            <div className="flex gap-2">
            </div>
          </div>

          <div className="flex-1 w-full min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={barData} 
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }} 
                barGap={10}
              >
                <defs>
                  {/* Gradients para sa mas premium na look */}
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.8}/>
                  </linearGradient>
                  <linearGradient id="colorReview" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} 
                  dy={15}
                />
                
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} 
                />

                {/* Custom Tooltip Design */}
                <Tooltip 
                  cursor={{ fill: '#f8fafc', radius: 8 }} 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-50 min-w-[150px]">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-50 pb-2">{label}</p>
                          <div className="space-y-2">
                            {payload.map((entry, index) => (
                              <div key={index} className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                  <span className="text-xs font-bold text-slate-600">{entry.name}</span>
                                </div>
                                <span className="text-xs font-black text-slate-800">{entry.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  iconType="circle" 
                  iconSize={8}
                  wrapperStyle={{ paddingBottom: '30px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }} 
                />

                {/* Mas Rounded at Makapal na Bars */}
                <Bar dataKey="Completed" fill="url(#colorCompleted)" radius={[6, 6, 0, 0]} barSize={10} />
                <Bar dataKey="UnderReview" fill="url(#colorReview)" radius={[6, 6, 0, 0]} barSize={10} />
                <Bar dataKey="Revisions" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={10} />
                <Bar dataKey="Rejected" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

const StatCard = ({ card }) => {
  const isNegative = card.trend.startsWith('-');
  return (
    <div className="group relative bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
      <div className="flex items-start justify-between relative z-10">
        <div className={`p-4 rounded-2xl ${card.bg} ${card.color} ring-4 ring-white shadow-sm transition-transform duration-500 group-hover:scale-110`}>
          <card.icon size={24} strokeWidth={2.2} />
        </div>
        <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border ${
          isNegative ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'
        }`}>
          <TrendingUp size={14} className={isNegative ? 'rotate-180' : ''} />
          <span>{card.trend}</span>
        </div>
      </div>
      <div className="mt-10">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{card.value}</h3>
          <span className="text-[10px] font-bold text-slate-300 uppercase">Total</span>
        </div>
      </div>
    </div>
  );
};

export default Overview;