import React from 'react';
import { 
  FileCheck, 
  UploadCloud, 
  Search, 
  RefreshCw, 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  Leaf, 
  Clock, 
  FileText,
  ChevronRight,
  X,
  Check
} from 'lucide-react';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Navbar />

      {/* 2. Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden bg-white">
        {/* Abstract Background Decors */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px] opacity-60"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-emerald-50 rounded-full blur-[100px] opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-emerald-50/50 border border-emerald-100 px-5 py-2 rounded-full backdrop-blur-sm shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span className="text-[12px] font-black text-emerald-900 uppercase tracking-[0.2em]">
                Smart Automation System
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[#064e3b] leading-[1.1] tracking-tight">
              Next-Gen <br />
              <span className="text-emerald-600 relative inline-block">
                Proposal
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 338 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9C118.957 4.47226 254.444 3.17719 335 5" stroke="#10B981" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </span> Reviews.
            </h1>

            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Empowering the <span className="text-slate-800 font-bold">Gender and Development (G.A.D)</span> Extension Office with a paperless ecosystem for seamless proposal submissions, fast-tracked reviews, and digital archiving.
            </p>

            <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
              <button className="group bg-[#064e3b] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-[#022c22] transition-all shadow-2xl shadow-emerald-900/30 active:scale-95">
                Get Started
                <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="bg-white border-2 border-slate-100 text-slate-600 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50/30 transition-all active:scale-95">
                View Guidelines
              </button>
            </div>
          </div>

          {/* Visual Element / Mockup */}
          <div className="lg:w-1/2 relative group">
            <div className="relative z-10 bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-[3.5rem] p-10 shadow-[0_50px_100px_-20px_rgba(6,78,59,0.3)] border border-white/20 transform hover:-rotate-2 transition-transform duration-700">
              <div className="bg-white rounded-[2rem] p-8 shadow-inner space-y-6">
                <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                  <div className="space-y-2">
                    <div className="h-5 w-40 bg-slate-100 rounded-lg"></div>
                    <div className="h-3 w-24 bg-emerald-50 rounded-lg"></div>
                  </div>
                  <div className="h-10 w-24 bg-emerald-100/50 text-emerald-700 rounded-full flex items-center justify-center font-bold text-xs">
                    Reviewing
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-full bg-slate-50 rounded-md"></div>
                  <div className="h-4 w-[90%] bg-slate-50 rounded-md"></div>
                  <div className="h-4 w-[75%] bg-slate-50 rounded-md"></div>
                </div>
                <div className="pt-6 grid grid-cols-2 gap-4">
                  <div className="h-12 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center px-4 gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <div className="h-2 w-12 bg-emerald-200 rounded"></div>
                  </div>
                  <div className="h-12 bg-slate-50 rounded-xl flex items-center px-4 gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    <div className="h-2 w-12 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Glows */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-400/20 rounded-full blur-[80px] -z-0 group-hover:bg-emerald-400/30 transition-all duration-700"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] -z-0"></div>
          </div>
        </div>
      </section>

      {/* 3. Problem vs Solution - The Transition */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Modernizing the <span className="text-emerald-700">Approval Workflow</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">
              Leaving behind the limitations of manual paperwork for a more efficient, 
              secure, and sustainable digital experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-0 relative">
            
            {/* VS Badge - Floating Center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-16 h-16 bg-white rounded-full border-4 border-emerald-50 shadow-xl">
              <span className="text-emerald-900 font-black text-xl italic">VS</span>
            </div>

            {/* The Old Way (Manual) */}
            <div className="p-12 bg-slate-50 rounded-t-[3rem] md:rounded-l-[3rem] md:rounded-tr-none border-y border-l border-slate-100 relative group overflow-hidden">
              <div className="relative z-10">
                <div className="mb-8 opacity-50 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 bg-slate-200/50 px-4 py-2 rounded-full">Traditional Method</span>
                </div>
                <h3 className="text-3xl font-black mb-8 text-slate-400 italic">The Manual <br/>Burden</h3>
                <ul className="space-y-6">
                  {[
                    'Slow and repetitive manual hand-overs',
                    'Costly expenses on paper, ink, and travel',
                    'Difficulty in tracking proposal revision history',
                    'Physical presence required for every signature'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-500 font-medium leading-relaxed">
                      <div className="mt-1 w-5 h-5 rounded-full bg-red-50 flex-shrink-0 flex items-center justify-center border border-red-100">
                        <X size={12} className="text-red-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The New Way (Digital) */}
            <div className="p-12 bg-[#064e3b] rounded-b-[3rem] md:rounded-r-[3rem] md:rounded-bl-none shadow-[0_40px_80px_-15px_rgba(6,78,59,0.25)] text-white relative overflow-hidden group">
              {/* Subtle Decorative Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <div className="relative z-10">
                <div className="mb-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-emerald-400 bg-emerald-800/50 px-4 py-2 rounded-full border border-emerald-700/50">Modern Solution</span>
                </div>
                <h3 className="text-3xl font-black mb-8 text-white">The Digital <br/>Advantage</h3>
                <ul className="space-y-6">
                  {[
                    'Instant proposal submission from any location',
                    'Automated status updates and email alerts',
                    'Built-in digital annotations for faster feedback',
                    'Secure, 100% paperless audit trail'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 font-semibold text-emerald-50 leading-relaxed group-hover:translate-x-1 transition-transform">
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center shadow-lg shadow-emerald-900/50">
                        <Check size={12} className="text-white" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Key Features */}
      <section id="features" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">System Capabilities</h2>
            <p className="text-slate-600">Everything you need to manage thesis proposals in one place.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<UploadCloud className="text-emerald-600" />} 
              title="Online Submission" 
              desc="Mag-upload ng PDF o Word files kahit nasaan ka."
            />
            <FeatureCard 
              icon={<Search className="text-emerald-600" />} 
              title="Digital Review" 
              desc="Ang mga reviewers ay direktang maglalagay ng comments sa system."
            />
            <FeatureCard 
              icon={<RefreshCw className="text-emerald-600" />} 
              title="Real-Time Tracking" 
              desc="Makikita ang status mula Pending hanggang Approved."
            />
            <FeatureCard 
              icon={<FileText className="text-emerald-600" />} 
              title="Version Control" 
              desc="Laging naka-organize ang Version 1 hanggang sa Final."
            />
          </div>
        </div>
      </section>

      {/* 5. User Roles */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">Designed for Everyone</h2>
            <p className="text-slate-600">Ang system ay binuo para sa lahat ng involved sa research process.</p>
          </div>
          <div className="lg:w-2/3 grid md:grid-cols-3 gap-6 w-full">
            <RoleCard icon={<GraduationCap />} role="Students" task="Upload & Track" />
            <RoleCard icon={<Users />} role="Reviewers" task="Check & Approve" />
            <RoleCard icon={<ShieldCheck />} role="GDEO Admin" task="Manage & Monitor" />
          </div>
        </div>
      </section>

      {/* 6. Statistics */}
      <section className="py-20 bg-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <StatBox icon={<FileCheck />} val="0" label="Proposals Submitted" />
          <StatBox icon={<Leaf />} val="0" label="Paper Sheets Saved" />
          <StatBox icon={<Clock />} val="0" label="Average Review Days" />
        </div>
      </section>

      {/* 7. The Goal (Mission) */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="inline-block p-3 bg-emerald-50 rounded-full text-emerald-700">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif italic text-slate-800 leading-tight">
            "The goal of this project is to create a digital system that makes proposal documents checking faster and paperless for the Graduate School community."
          </h2>
          <div className="h-1 w-24 bg-emerald-600 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 text-center text-slate-500">
        <p className="font-bold text-emerald-900 mb-2">GS-GDEO Automation Project</p>
        <p>© 2024 Gender Development Extension Office. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Sub-components
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl border border-emerald-100 hover:shadow-xl hover:shadow-emerald-100/50 transition-all group">
    <div className="mb-6 p-3 bg-emerald-50 w-fit rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

const RoleCard = ({ icon, role, task }) => (
  <div className="p-8 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex flex-col items-center text-center hover:bg-white transition-colors">
    <div className="text-emerald-700 mb-4">{React.cloneElement(icon, { size: 32 })}</div>
    <h4 className="font-bold text-lg text-slate-900">{role}</h4>
    <p className="text-emerald-600 text-sm font-medium">{task}</p>
  </div>
);

const StatBox = ({ icon, val, label }) => (
  <div className="space-y-2">
    <div className="flex justify-center mb-2 opacity-50">{React.cloneElement(icon, { size: 32 })}</div>
    <div className="text-5xl font-bold">{val}</div>
    <div className="text-emerald-200 font-medium">{label}</div>
  </div>
);

export default HomePage;