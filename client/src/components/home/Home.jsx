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
  ChevronRight
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 scroll-smooth">
      
      {/* 1. Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-700 p-2 rounded-lg">
              <FileCheck className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-emerald-900 tracking-tight">GS-GDEO <span className="text-emerald-600">Portal</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#" className="hover:text-emerald-700 transition">Home</a>
            <a href="#features" className="hover:text-emerald-700 transition">Features</a>
            <a href="#about" className="hover:text-emerald-700 transition">About</a>
            <button className="bg-emerald-700 text-white px-6 py-2.5 rounded-full hover:bg-emerald-800 transition shadow-lg shadow-emerald-200">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="pt-40 pb-24 px-6 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-emerald-200 px-4 py-2 rounded-full shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-semibold text-emerald-800 uppercase tracking-wider">System is Live</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Automating Thesis <span className="text-emerald-700 underline decoration-emerald-200">Proposal Reviews</span> for Graduate Success.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto md:mx-0">
              A digital platform for the Gender Development Extension Office (GDEO) to streamline proposal submissions, reviews, and approvals—making research faster and paperless.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-800 transition transform hover:-translate-y-1 shadow-xl shadow-emerald-200">
                Get Started / Login <ChevronRight size={20} />
              </button>
              <button className="bg-white border-2 border-emerald-100 text-emerald-800 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition">
                View Guidelines
              </button>
            </div>
          </div>
          
          {/* Hero Image Container */}
          <div className="md:w-1/2 relative">
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
              {/* REPLACE 'your-image-path.jpg' with your actual file path */}
              <img 
                src="hero.jpg" 
                alt="Digital Thesis Review Illustration" 
                className="rounded-[3rem] shadow-2xl border-8 border-white object-cover w-full h-[400px]"
              />
              {/* Decorative Floating Element */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-50">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Leaf className="text-emerald-700 w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Sustainability</p>
                  <p className="text-sm font-bold text-slate-800">100% Paperless</p>
                </div>
              </div>
            </div>
            {/* Background Blur Effect */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* 3. Problem vs Solution */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 bg-slate-50 rounded-3xl border border-slate-100">
              <h3 className="text-2xl font-bold mb-6 text-slate-400">The Old Way (Manual)</h3>
              <ul className="space-y-4">
                {['Mabagal at manual na proseso', 'Magastos sa papel at ink', 'Mahirap i-track ang revisions', 'Kailangang pumunta physically sa office'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-500 italic">
                    <span className="text-red-400 font-bold font-mono">✕</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 bg-emerald-900 rounded-3xl shadow-2xl shadow-emerald-200 text-white transform md:-translate-y-6">
              <h3 className="text-2xl font-bold mb-6">The New Way (Digital)</h3>
              <ul className="space-y-4">
                {['Instant submission online', 'Real-time notifications', 'Digital annotations & feedback', '100% paperless tracking'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <span className="text-emerald-400 font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Key Features */}
      <section id="features" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">System Capabilities</h2>
            <p className="text-slate-600 italic">Everything you need to manage thesis proposals in one place.</p>
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
          <div className="lg:w-1/3 space-y-4 text-center lg:text-left">
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
      <section id="about" className="py-32 bg-white px-6 border-t border-slate-50">
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
      <footer className="py-12 border-t border-slate-100 text-center text-slate-500 bg-slate-50">
        <p className="font-bold text-emerald-900 mb-2 uppercase tracking-widest text-xs">GS-GDEO Automation Project</p>
        <p>© 2024 Gender Development Extension Office. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Sub-components
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl border border-emerald-100 hover:shadow-xl hover:shadow-emerald-100/50 transition-all group cursor-default">
    <div className="mb-6 p-3 bg-emerald-50 w-fit rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

const RoleCard = ({ icon, role, task }) => (
  <div className="p-8 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex flex-col items-center text-center hover:bg-white transition-all duration-300 hover:shadow-lg">
    <div className="text-emerald-700 mb-4">{React.cloneElement(icon, { size: 32 })}</div>
    <h4 className="font-bold text-lg text-slate-900">{role}</h4>
    <p className="text-emerald-600 text-sm font-medium">{task}</p>
  </div>
);

const StatBox = ({ icon, val, label }) => (
  <div className="space-y-2">
    <div className="flex justify-center mb-2 opacity-50">{React.cloneElement(icon, { size: 32 })}</div>
    <div className="text-5xl font-bold font-mono tracking-tighter">{val}</div>
    <div className="text-emerald-200 font-medium uppercase text-xs tracking-widest">{label}</div>
  </div>
);

export default HomePage;