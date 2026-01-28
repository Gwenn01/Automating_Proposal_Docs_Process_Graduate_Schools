import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, UserCheck, FileText, Clock, TrendingUp, CheckCircle, XCircle, RefreshCcw, Search, FileCheck } from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

const STATUS_LOOKUP = {
  "For Review": { id: 'ForReview', icon: Clock, color: "text-blue-500", bg: "bg-blue-50", glow: "bg-blue-400" },
  "UnderReview": { id: 'UnderReview', icon: Search, color: "text-indigo-600", bg: "bg-indigo-50", glow: "bg-indigo-400" },
  "For Revisions": { id: 'Revisions', icon: RefreshCcw, color: "text-amber-600", bg: "bg-amber-50", glow: "bg-amber-400" },
  "For Approval": { id: 'ForApproval', icon: FileCheck, color: "text-purple-600", bg: "bg-purple-50", glow: "bg-purple-400" },
  "Approved": { id: 'Approved', icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", glow: "bg-emerald-400" },
  "Rejected": { id: 'Rejected', icon: XCircle, color: "text-red-600", bg: "bg-red-50", glow: "bg-red-400" },
};

const STATIC_CARD_LOOKUP = {
  "Total Implementors": { icon: Users, color: "text-green-600", bg: "bg-green-50" },
  "Total Reviewers": { icon: UserCheck, color: "text-green-600", bg: "bg-green-50" },
  "Total Documents": { icon: FileText, color: "text-green-600", bg: "bg-green-50" },
};

const CustomLegend = ({ payload, currentIndex }) => {
  const activeEntry = payload[currentIndex];

  if (!activeEntry) return <div className="mb-10 min-h-[48px]" />;

  return (
    <div className="flex items-center justify-end mb-10 px-2 min-h-[48px]">
      <div 
        key={activeEntry.value} 
        className="flex items-center gap-4 animate-[premiumReveal_0.6s_cubic-bezier(0.23,1,0.32,1)]"
      >
        {/* Label with very subtle tracking */}
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em] leading-none mb-1">
            Analytics Focus
          </span>
          <div className="h-[1px] w-6 bg-slate-100" />
        </div>
        
        {/* Premium Capsule */}
        <div className="flex items-center gap-3 bg-white/40 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative group overflow-hidden">
          
          {/* subtle background glow that matches status color */}
          <div 
            className="absolute -left-2 -top-2 w-12 h-12 blur-2xl opacity-10 transition-colors duration-1000"
            style={{ backgroundColor: activeEntry.color }}
          />

          {/* Indicator with Inner Glow */}
          <div className="relative flex items-center justify-center">
            <div 
              className="w-2 h-2 rounded-full z-10"
              style={{ backgroundColor: activeEntry.color }}
            />
            <div 
              className="absolute w-4 h-4 rounded-full opacity-20 animate-ping"
              style={{ backgroundColor: activeEntry.color }}
            />
            <div 
              className="absolute w-3 h-3 rounded-full blur-[3px] opacity-40"
              style={{ backgroundColor: activeEntry.color }}
            />
          </div>
          
          <span className="text-[12px] font-black text-slate-800 uppercase tracking-[0.15em] relative z-10">
            {activeEntry.value}
          </span>
          
          {/* Modern Right Arrow/Caret focus icon */}
          <div className="ml-1 opacity-20 group-hover:opacity-100 transition-opacity">
            <div className="w-[1px] h-3 bg-slate-300 rotate-[30deg] translate-y-[-1px]" />
          </div>
        </div>
      </div>
    </div>
  );
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
  const [progress, setProgress] = useState(0);

  const totalUserCount = pieData.reduce((acc, curr) => acc + curr.value, 0);

  // 2. Axios Fetch Function
 useEffect(() => {
    let interval;
    
    // Start fake progress increments
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90; // Stop at 90% until data arrives
        }
        return prev + 10; // Increase by 10%
      });
    }, 200);

    const getDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin-overview');
        
        // Kapag may data na, jump to 100% then close loading
        setProgress(100);
        setTimeout(() => {
          setStaticCards(response.data.static_cards);
          setStatusCycle(response.data.status_cycle);
          setPieData(response.data.pie_data.filter(item => item.name !== "Total"));
          setBarData(response.data.bar_data);
          setCurrentStatusIndex(0);
          setLoading(false);
        }, 400); // Small delay para makita ang 100%

      } catch  {
        setError("Failed to fetch data");
        setLoading(false);
      } finally {
        clearInterval(interval);
      }
    };

    getDashboardData();
    return () => clearInterval(interval);
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
      const radius = 45;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (progress / 100) * circumference;

      return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#fbfcfb]">
          <div className="relative flex items-center justify-center">
            {/* Progress Ring */}
            <svg className="w-32 h-32 transform -rotate-90 scale-110">
              <circle
                cx="64" cy="64" r={radius}
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="64" cy="64" r={radius}
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={circumference}
                style={{ 
                  strokeDashoffset: offset,
                  transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                strokeLinecap="round"
                className="text-emerald-600"
              />
            </svg>

            {/* Center Percentage */}
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-slate-800 tracking-tighter">
                {progress}<span className="text-sm font-bold text-emerald-600 ml-0.5">%</span>
              </span>
            </div>
          </div>

          {/* Professional Status Label */}
          <div className="mt-12 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-slate-200" />
              <div className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-100 shadow-sm rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.15em]">
                  System Synchronizing
                </span>
              </div>
              <div className="h-[1px] w-8 bg-slate-200" />
            </div>
            
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] max-w-[250px] text-center leading-relaxed">
              Compiling real-time analytics <br/> 
              <span className="text-slate-300 font-medium italic">& optimization metrics</span>
            </h2>
          </div>
        </div>
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

  const activeStatusItem = statusCycle[currentStatusIndex];
  if (!activeStatusItem && !loading) return null;

  const getStatusConfig = (label) => {
    if (!label) return { ...STATUS_LOOKUP["UnderReview"], displayLabel: "Under Review" };

    const normalized = label.toLowerCase().trim();

    // Dito natin ifoforce kung ano ang dapat na "Display Label"
    if (normalized.includes("for review")) 
      return { ...STATUS_LOOKUP["For Review"], displayLabel: "For Review" };
      
    if (normalized.includes("under review") || normalized.includes("underreview")) 
      return { ...STATUS_LOOKUP["UnderReview"], displayLabel: "Under Review" };

    if (normalized.includes("revision")) 
      return { ...STATUS_LOOKUP["For Revisions"], displayLabel: "For Revisions" };

    if (normalized.includes("approval")) 
      return { ...STATUS_LOOKUP["For Approval"], displayLabel: "For Approval" };

    if (normalized.includes("approved") || normalized.includes("complete")) 
      return { ...STATUS_LOOKUP["Approved"], displayLabel: "Approved" };

    if (normalized.includes("reject")) 
      return { ...STATUS_LOOKUP["Rejected"], displayLabel: "Rejected" };

    return { 
      icon: FileText, 
      color: "text-slate-600", 
      bg: "bg-slate-50", 
      glow: "bg-slate-400",
      displayLabel: label // Fallback sa original kung walang match
    };
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
              <div key={activeStatusItem?.label} className={`transition-all duration-700 transform ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                {/* Status Label (e.g., "Completed") */}
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                  {activeStatusConfig.displayLabel}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    {/* Value: Gagamit ng ?? 0 para ipakita ang numeric 0 */}
                    <h3 className="text-4xl font-black text-slate-800 tracking-tighter leading-none">
                      {activeStatusItem?.value}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-300 uppercase">Total</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar sa Ilalim */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50">
              <div key={activeStatusItem?.label} className="h-full bg-slate-200 origin-left" style={{ animation: 'progress 4.5s linear forwards' }} />
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

        {/* Premium Bar Chart Container */}
        <div className="relative group bg-white p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100/80 flex flex-col transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)] overflow-hidden">
          
          {/* Modern Mesh Gradient Background (Subtle) */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-slate-50 to-transparent opacity-50 rounded-full blur-3xl -z-10" />

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                  Proposal Status Report
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.15em]">
                Live Performance Metrics & Cycle Distribution
              </p>
            </div>

            {/* CustomLegend integration */}
            <CustomLegend currentIndex={currentStatusIndex} payload={[
              { value: 'For Review', color: '#3b82f6' },
              { value: 'Under Review', color: '#4f46e5' },
              { value: 'For Revisions', color: '#f59e0b' },
              { value: 'For Approval', color: '#9333ea' },
              { value: 'Approved', color: '#059669' },
              { value: 'Rejected', color: '#ef4444' }
            ]} />
          </div>

          <div className="flex-1 w-full min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={barData} 
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }} 
                barGap={12}
              >
                <defs>
                  {/* Premium Gradients for Bars */}
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity={1} />
                    <stop offset="100%" stopColor="currentColor" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="8 8" 
                  vertical={false} 
                  stroke="#f1f5f9" 
                  strokeOpacity={0.8}
                />
                
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#cbd5e1', fontWeight: 700 }} 
                  dy={20}
                />
                
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#cbd5e1', fontWeight: 700 }} 
                />

                <Tooltip 
                  cursor={{ fill: '#f8fafc', radius: 12 }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    padding: '12px' 
                  }}
                />
                
                {/* Bars: Ang active status (currentIndex) ay full color, ang iba ay low opacity */}
                <Bar dataKey="ForReview" radius={[4, 4, 0, 0]} barSize={6}
                    fill="#3b82f6" opacity={currentStatusIndex === 0 ? 1 : 0.15} />
                
                <Bar dataKey="UnderReview" radius={[4, 4, 0, 0]} barSize={6}
                    fill="#4f46e5" opacity={currentStatusIndex === 1 ? 1 : 0.15} />
                
                <Bar dataKey="Revisions" radius={[4, 4, 0, 0]} barSize={6}
                    fill="#f59e0b" opacity={currentStatusIndex === 2 ? 1 : 0.15} />
                
                <Bar dataKey="ForApproval" radius={[4, 4, 0, 0]} barSize={6}
                    fill="#9333ea" opacity={currentStatusIndex === 3 ? 1 : 0.15} />
                
                <Bar dataKey="Approved" radius={[4, 4, 0, 0]} barSize={6}
                    fill="#059669" opacity={currentStatusIndex === 4 ? 1 : 0.15} />
                
                <Bar dataKey="Rejected" radius={[4, 4, 0, 0]} barSize={6}
                    fill="#ef4444" opacity={currentStatusIndex === 5 ? 1 : 0.15} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom Info Bar */}
          <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Historical Data</span>
              </div>
            </div>
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
              Auto-refreshing in 5s
            </span>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress { 
          0% { width: 0%; } 
          100% { width: 100%; } 
          }
          @keyframes premiumReveal {
            0% { 
              opacity: 0; 
              transform: translateX(20px) scale(0.98); 
              filter: blur(4px);
            }
            100% { 
              opacity: 1; 
              transform: translateX(0) scale(1);
              filter: blur(0);
            }
          }

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