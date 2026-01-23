import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, UserCheck, FileText, Clock, TrendingUp, CheckCircle, XCircle, RefreshCcw } from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

const STATUS_LOOKUP = {
  "For Review": { id: 'ForReview', icon: Clock, color: "text-blue-500", bg: "bg-blue-50", glow: "bg-blue-400" },
  "UnderReview": { id: 'UnderReview', icon: Clock, color: "text-indigo-600", bg: "bg-indigo-50", glow: "bg-indigo-400" },
  "For Revisions": { id: 'Revisions', icon: RefreshCcw, color: "text-amber-600", bg: "bg-amber-50", glow: "bg-amber-400" },
  "For Approval": { id: 'ForApproval', icon: Clock, color: "text-purple-600", bg: "bg-purple-50", glow: "bg-purple-400" },
  "Approved": { id: 'Approved', icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", glow: "bg-emerald-400" },
  "Rejected": { id: 'Rejected', icon: XCircle, color: "text-red-600", bg: "bg-red-50", glow: "bg-red-400" },
};

const STATIC_CARD_LOOKUP = {
  "Total Implementors": { icon: Users, color: "text-green-600", bg: "bg-green-50" },
  "Total Reviewers": { icon: UserCheck, color: "text-green-600", bg: "bg-green-50" },
  "Total Documents": { icon: FileText, color: "text-green-600", bg: "bg-green-50" },
};

const Overview = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusCycle, setStatusCycle] = useState([]);
  const [staticCards, setStaticCards] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  const totalUserCount = pieData.reduce((acc, curr) => acc + curr.value, 0);

  // 2. Axios Fetch Function
 useEffect(() => {
    const getDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/admin-overview');
        console.log("API Data:", response.data.status_cycle);
        const data = response.data;

        setStaticCards(data.static_cards);
        setStatusCycle(data.status_cycle);
        

        const filteredPie = data.pie_data.filter(item => item.name !== "Total");
        setPieData(filteredPie);
        
        setBarData(data.bar_data);
        setLoading(false);
      } catch {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    getDashboardData();
  }, []);

  useEffect(() => {
    if (statusCycle.length <= 1) return;

    const timer = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentStatusIndex((prev) => (prev + 1) % statusCycle.length);
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 50); 
      }, 1000); 
      
    }, 5000); 

    return () => clearInterval(timer);
  }, [statusCycle.length]);

  const PIE_COLORS = ['#16a34a', '#4ade80'];

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
          <div
            className="relative bg-white backdrop-blur-xl px-14 py-10 rounded-2xl shadow-2xl flex flex-col items-center animate-pop-out"
          >
            {/* Gradient Ring Loader */}
            <div className="relative animate-float mb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 animate-spin" />
              <div className="absolute inset-2 bg-white rounded-full" />
            </div>

            {/* Text */}
            <p className="text-lg font-semibold shimmer-text loading-dots mb-2">
              Generating Insights
            </p>

            <p className="text-sm text-gray-500">
              Aggregating real-time metrics and proposal trends.
            </p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#fbfcfb] p-6 text-center">
        <div className="p-4 bg-red-50 rounded-full text-red-600 mb-4">
          <XCircle size={40} />
        </div>
        <h2 className="text-xl font-black text-slate-800">Connection Error</h2>
        <p className="text-slate-500 max-w-xs mt-2">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const activeStatusItem = statusCycle[currentStatusIndex] || (statusCycle.length > 0 ? statusCycle[0] : { label: 'Under Review', value: 0 });

  const getStatusConfig = (label) => {
    const normalized = (label || "").toLowerCase().trim().replace(/\s+/g, '');
    if (normalized.includes("forreview")) return STATUS_LOOKUP["For Review"];
    if (normalized.includes("underreview")) return STATUS_LOOKUP["UnderReview"];
    if (normalized.includes("forrevisions") || normalized.includes("revision")) return STATUS_LOOKUP["For Revisions"];
    if (normalized.includes("forapproval")) return STATUS_LOOKUP["For Approval"];
    if (normalized.includes("approved")) return STATUS_LOOKUP["Approved"];
    if (normalized.includes("rejected")) return STATUS_LOOKUP["Rejected"];
    return STATUS_LOOKUP["UnderReview"]; // Default
  };

  const activeStatusConfig = getStatusConfig(activeStatusItem.label);

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 10} startAngle={startAngle} endAngle={endAngle} fill={fill} opacity={0.3} cornerRadius={12} />
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 6} startAngle={startAngle} endAngle={endAngle} fill={fill} cornerRadius={12} stroke="#fff" strokeWidth={2} />
      </g>
    );
  };

  return (
    <div className="p-8 lg:p-10 space-y-10 bg-[#fbfcfb] h-auto">
      <div className="px-2">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">Overview Dashboard</h1>
        <p className="text-gray-500 text-sm font-medium">Monitoring proposal metrics and status cycles.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {staticCards.map((card, index) => (
          <StatCard key={index} card={card} />
        ))}

        {/* Dynamic 4th Card */}
        <div className="group relative bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
          {/* Dynamic Glow Effect */}
          <div className={`absolute -right-4 -top-4 w-28 h-28 rounded-full blur-3xl opacity-20 transition-colors duration-1000 ${activeStatusConfig.glow}`} />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-start justify-between">
              {/* Dynamic Icon at Background */}
              <div className={`p-4 rounded-2xl transition-all duration-500 transform ${isAnimating ? 'scale-75 opacity-0' : 'scale-100 opacity-100'} ${activeStatusConfig.bg} ${activeStatusConfig.color}`}>
                {React.createElement(activeStatusConfig.icon || Clock, { size: 24, strokeWidth: 2.2 })}
              </div>
              
              {/* Dots Indicator */}
              <div className="flex gap-1.5 pt-2">
                {statusCycle.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all duration-500 ${
                      currentStatusIndex === i ? 'w-4 bg-slate-400' : 'w-1 bg-slate-200'
                    }`} 
                  />
                ))}
              </div>
            </div>

            <div className="mt-10 overflow-hidden">
              <div key={currentStatusIndex} className={`transition-all duration-700 transform ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                {/* Status Label (e.g., "Completed") */}
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                  {statusCycle[currentStatusIndex]?.label}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    {/* Value: Gagamit ng ?? 0 para ipakita ang numeric 0 */}
                    <h3 className="text-4xl font-black text-slate-800 tracking-tighter leading-none">
                      {statusCycle[currentStatusIndex]?.value ?? 0}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-300 uppercase">Total</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar sa Ilalim */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50">
              <div key={currentStatusIndex} className="h-full bg-slate-200 origin-left" style={{ animation: 'progress 4.5s linear forwards' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* User Distribution */}
        <div className="bg-white p-8 rounded-[32px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col md:flex-row items-center gap-10 min-h-[480px]">
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="mb-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">User Distribution</h3>
              <p className="text-sm text-slate-400 font-medium">Active platform roles</p>
            </div>
            <div className="h-[280px] relative mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={105} paddingAngle={5} dataKey="value" onMouseEnter={(_, index) => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)} stroke="none">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} style={{ filter: activeIndex === index ? `drop-shadow(0 0 12px ${PIE_COLORS[index]}40)` : 'none' }} className="outline-none transition-all duration-500" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] block mb-1">
                  {activeIndex !== null ? pieData[activeIndex].name : "Total"}
                </span>
                <h4 className="text-4xl font-black text-slate-800 tracking-tighter">
                  {activeIndex !== null ? pieData[activeIndex].value : totalUserCount}
                </h4>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-4">
            {pieData.map((entry, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={entry.name} onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)} className={`p-5 rounded-[24px] border transition-all duration-300 cursor-pointer relative overflow-hidden ${isActive ? 'bg-slate-900 border-slate-900 shadow-lg -translate-x-2' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-1.5 h-8 rounded-full transition-all duration-500 ${isActive ? 'bg-white' : ''}`} style={{ backgroundColor: !isActive ? PIE_COLORS[index] : undefined }} />
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{entry.name}</p>
                        <p className={`text-xl font-black ${isActive ? 'text-white' : 'text-slate-800'}`}>{entry.value}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black ${isActive ? 'bg-white/10 text-white' : 'bg-white text-slate-500 border border-slate-100'}`}>
                      {totalUserCount > 0 ? ((entry.value / totalUserCount) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bar Chart Sync with Active Card */}
        <div className="bg-white p-8 rounded-[32px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col">
          <div className="mb-8">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Proposal Status Report</h3>
            <p className="text-sm text-slate-400 font-medium">Monthly performance highlights</p>
          </div>
          <div className="flex-1 w-full min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }} barGap={10}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} width={30} />
              <Tooltip cursor={{ fill: '#f8fafc', radius: 8 }} />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '30px', fontSize: '11px', fontWeight: 'bold' }} />
              
              {/* Bars for each Status */}
              <Bar dataKey="ForReview" name="For Review" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={8}/>
              <Bar dataKey="UnderReview" name="Under Review" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={8} />
              <Bar dataKey="Revisions" name="For Revisions" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={8}/>
              <Bar dataKey="ForApproval" name="For Approval" fill="#9333ea" radius={[6, 6, 0, 0]} barSize={8}/>
              <Bar dataKey="Approved" name="Approved" fill="#059669" radius={[6, 6, 0, 0]} barSize={8}/>
              <Bar dataKey="Rejected" name="Rejected" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={8}/>
            </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress { 
          0% { width: 0%; } 
          100% { width: 100%; } 
        }
      ` }} />
    </div>
  );
};

const StatCard = ({ card }) => {
  const config = STATIC_CARD_LOOKUP[card.label];
  return (
    <div className="group relative bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
      <div className="flex items-start justify-between relative z-10">
        <div className={`p-4 rounded-2xl ${config.bg} ${config.color} ring-4 ring-white shadow-sm transition-transform duration-500 group-hover:scale-110`}>
          {React.createElement(config.icon, { size: 24, strokeWidth: 2.2 })}
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