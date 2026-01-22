import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl py-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Branding Section */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            <img 
              src="prmsuLogoTransparent.png" 
              alt="PRMSU Logo" 
              className="w-11 h-11 object-contain drop-shadow-md transition-transform duration-500 group-hover:rotate-[360deg]"
            />
          </div>
          
          <div className="flex flex-col border-l-2 border-emerald-100/50 pl-4">
            <h1 className="text-xl font-black tracking-tight flex items-baseline gap-1">
              <span className="text-[#064e3b]">G.A.D</span> 
              <span className="text-emerald-600 font-semibold italic text-lg">Portal</span>
            </h1>
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black leading-none mt-1">
              Extension Office
            </span>
          </div>
        </div>

        {/* Navigation - Premium Floating Pill */}
        <div className="hidden md:flex items-center bg-white/70 backdrop-blur-xl px-1.5 py-1.5 rounded-full border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.06)] ring-1 ring-emerald-900/5">
        {[
            { name: 'Home', href: '#home' },
            { name: 'About', href: '#about' },
            { name: 'Features', href: '#features' },
            { name: 'Guidelines', href: '#guidelines' }
        ].map((link) => (
            <a 
            key={link.name}
            href={link.href} 
            className="relative px-6 py-2 rounded-full text-[13px] font-black text-slate-500 hover:text-[#064e3b] transition-all duration-300 tracking-wide group"
            >
            {/* Text Layer */}
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#064e3b]">
                {link.name}
            </span>

            {/* Premium Hover Background (Floating Effect) */}
            <div className="absolute inset-0 w-full h-full bg-emerald-50/80 rounded-full scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out -z-0"></div>
            
            {/* Subtle Bottom Indicator Dot */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#064e3b] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </a>
        ))}
        </div>

        {/* Action Button - High Contrast */}
        <div className="hidden md:block">
          <button className="group bg-[#064e3b] text-white pl-7 pr-3 py-2.5 rounded-full font-bold text-sm flex items-center gap-4 hover:bg-[#022c22] transition-all duration-300 shadow-lg shadow-emerald-900/20 active:scale-95 border border-white/10">
            Portal Login
            <div className="bg-emerald-500/20 p-1.5 rounded-full group-hover:bg-emerald-500 transition-colors duration-300">
              <ArrowRight size={16} className="text-emerald-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="p-2.5 text-[#064e3b] bg-white rounded-xl shadow-sm border border-emerald-50 transition-all active:scale-90"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/20 backdrop-blur-md transition-opacity duration-500 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />
      
      {/* Mobile Sidebar */}
      <div className={`fixed right-0 top-0 h-screen bg-white w-72 shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden z-[60] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
           <div className="flex items-center gap-4 mb-12">
              <img src="prmsuLogoTransparent.png" alt="Logo" className="w-10 h-10 object-contain" />
              <div className="flex flex-col">
                <span className="font-black text-[#064e3b] text-lg">G.A.D</span>
                <span className="text-[8px] font-bold tracking-widest text-slate-400 uppercase">Extension</span>
              </div>
           </div>
          
          <nav className="flex flex-col gap-4 flex-grow">
            {['Home', 'About', 'Features', 'Guidelines'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-xl font-bold text-slate-700 hover:text-emerald-600 hover:translate-x-2 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
          
          <button className="w-full bg-[#064e3b] text-white py-4 rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl shadow-emerald-900/10 active:scale-95 transition-all">
            Portal Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;