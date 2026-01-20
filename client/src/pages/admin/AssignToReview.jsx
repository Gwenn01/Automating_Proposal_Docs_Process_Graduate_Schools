import { useState } from 'react';
import { Search, UserCheck, FileText } from 'lucide-react';
import AssignModal from '../../components/Admin/AssignModal'; 

const AssignToReview = () => {
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleAssignClick = (doc) => {
        setSelectedDoc(doc);
        setIsAssignModalOpen(true);
    };

    const documents = [
        { 
            id: 1, 
            name: "Arnel Gwen Nuqui", 
            title: "AI-Driven Predictive Maintenance for Agricultural Drone Systems",
            type: "Technical Proposal",
            version: "v1.2"
        },
        { 
            id: 2, 
            name: "Peter James", 
            title: "Development of a Decentralized Voting Platform using Blockchain Technology",
            type: "Research Paper",
        },
        { 
            id: 3, 
            name: "Maria Santos", 
            title: "Real-time Air Quality Monitoring Hub with Cloud Integration",
            type: "Technical Proposal",
        },
        { 
            id: 4, 
            name: "Kian Fontillas", 
            title: "Design of a Smart Monitoring System for Academic Environments",
            type: "Thesis Proposal",
        },
        { 
            id: 5, 
            name: "Julian Rivera", 
            title: "Optimization of Solar Energy Harvesting using IoT-Based Sensors",
            type: "Technical Proposal",
        },
        { 
            id: 6, 
            name: "Sophia Lopez", 
            title: "Cyber-Security Protocols for Small-Scale Enterprise Network Infrastructures",
            type: "Case Study",
        },
    ];

    const filteredDocs = documents.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        /* Pinantay ang padding (p-8 lg:p-10) at background color (#fbfcfb) */
        <div className="p-8 lg:p-10 space-y-10 bg-[#fbfcfb] h-auto animate-in fade-in duration-500">
            
            {/* Header Section - Sakto ang typography at spacing sa ManageAccount */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">
                        Assign to Review
                    </h1>
                    <p className="text-gray-500 text-sm font-medium">
                        Select a proposal and assign it to an available reviewer.
                    </p>
                </div>
            </div>

            {/* Main Content Card - Enhanced Professional Look */}
            <div className="bg-white p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 overflow-hidden relative">
                
                {/* Subtle Background Decoration for a Modern Touch */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-50 pointer-events-none" />

                {/* Action Row - Optimized Spacing */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 relative z-10">
                    
                    {/* Search Bar - Modern Glass style */}
                    <div className="relative w-full max-w-md group">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <Search className="text-slate-400 group-focus-within:text-[#1cb35a] transition-all duration-300" size={18} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search by author or document title..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 h-14 rounded-[20px] border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-[#1cb35a]/10 focus:border-[#1cb35a]/30 transition-all outline-none text-sm font-semibold text-slate-700 placeholder:text-slate-400/80 shadow-sm"
                        />
                    </div>

                    {/* Info Badge (Optional) - Adds professionalism */}
                    <div className="hidden lg:flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        {filteredDocs.length} Pending Proposals
                    </div>
                </div>

                {/* Table Section - Clean Aesthetic */}
                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-slate-400 uppercase text-[10px] tracking-[0.25em] font-black">
                                <th className="pb-4 px-8 text-left font-black">Author Details</th>
                                <th className="pb-4 px-6 text-left font-black">Proposal Title</th>
                                <th className="pb-4 px-6 text-center font-black">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDocs.map((doc, index) => (
                                <tr key={index} className="group transition-all duration-500">
                                    
                                    {/* Author Details - Enhanced Glass & Interaction Design */}
                                    <td className="py-6 px-8 bg-white group-hover:bg-gradient-to-r group-hover:from-slate-50/50 group-hover:to-transparent first:rounded-l-[32px] border-y border-l border-slate-50 group-hover:border-[#1cb35a]/30 transition-all duration-500 relative overflow-hidden">
                                        
                                        {/* Subtle Glow Effect on Hover */}
                                        <div className="absolute inset-0 bg-[#1cb35a]/0 group-hover:bg-[#1cb35a]/[0.02] transition-colors duration-500" />

                                        <div className="flex items-center gap-4 relative z-10">
                                            {/* Avatar Container with Glassmorphism and Ring Offset */}
                                            <div className="relative group/avatar">
                                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-white to-slate-100 flex items-center justify-center text-[11px] font-black text-slate-500 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-white group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(28,179,90,0.15)] group-hover:border-[#1cb35a]/20 transition-all duration-500">
                                                    {/* Dynamic Initials with improved spacing */}
                                                    <span className="tracking-tighter group-hover:text-[#1cb35a] transition-colors uppercase">
                                                        {doc.name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                
                                                {/* Online Status Indicator (Optional but Professional) */}
                                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full border border-white" />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-0.5">
                                                {/* Primary Name with Kerning Adjustments */}
                                                <span className="text-[14px] font-black text-slate-800 tracking-tight leading-none group-hover:text-[#1cb35a] transition-colors duration-300">
                                                    {doc.name}
                                                </span>
                                                
                                                {/* Status Badge - Subtle and Clean */}
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[9px] font-black text-[#1cb35a] uppercase tracking-widest bg-[#1cb35a]/5 px-2 py-0.5 rounded-md border border-[#1cb35a]/10">
                                                        Implementor
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                                                        Active User
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Document Title - Enhanced Professional Typography & Iconography */}
                                    <td className="py-6 px-6 bg-white group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:to-slate-50/30 border-y border-slate-50 group-hover:border-[#1cb35a]/20 transition-all duration-500">
                                        <div className="flex items-start gap-4">
                                            {/* Document Icon Graphic */}
                                            <div className="mt-1 flex-shrink-0">
                                                <div className="relative">
                                                    <FileText 
                                                        size={20} 
                                                        className="text-slate-300 group-hover:text-[#1cb35a]/40 transition-colors duration-500" 
                                                    />
                                                    {/* Subtle highlight dot for unread or important status */}
                                                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#1cb35a] rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-sm" />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                {/* The Main Title with Optimized Reading Flow */}
                                                <p className="text-[13.5px] font-bold text-slate-700 leading-[1.6] max-w-lg group-hover:text-slate-900 transition-colors duration-300">
                                                    {doc.title}
                                                </p>

                                                {/* Document Metadata - Adds a layer of professionalism */}
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                        <span className="w-1.5 h-1.5 rounded-sm bg-slate-200" />
                                                       {doc.type} 
                                                    </span>
                                                    <span className="text-slate-200 text-[10px]">|</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Actions Column - Clean Green Theme */}
                                    <td className="py-6 px-6 bg-white group-hover:bg-gradient-to-l group-hover:from-green-50/50 group-hover:to-transparent last:rounded-r-[32px] border-y border-r border-slate-50 group-hover:border-green-100 transition-all duration-500 text-center relative overflow-hidden">
                                        
                                        <div className="relative z-10 flex justify-center items-center">
                                            <button 
                                                onClick={() => handleAssignClick(doc)}
                                                className="group/btn relative overflow-hidden flex items-center justify-center gap-2.5 bg-green-50 text-green-600 w-[140px] py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] transition-all duration-300 border border-green-100/50 hover:bg-green-600 hover:text-white hover:shadow-[0_8px_20px_-6px_rgba(22,163,74,0.4)] hover:-translate-y-0.5 active:scale-95"
                                            >
                                                {/* Soft Shimmer Effect - Adjusted for Light Theme */}
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />

                                                {/* Icon - Using green-600 which turns white on hover button */}
                                                <UserCheck size={14} strokeWidth={3} className="transition-transform duration-300 group-hover/btn:scale-110" />

                                                <span className="relative">Assign Now</span>
                                            </button>
                                        </div>

                                        {/* Edge highlight on hover - Green version */}
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-green-500/0 group-hover:bg-green-500/60 rounded-l-full transition-all duration-500" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State - Modern Minimalist */}
                {filteredDocs.length === 0 && (
                    <div className="py-24 text-center bg-slate-50/50 rounded-[24px] border-2 border-dashed border-slate-100 mt-4">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                            <FileText size={28} className="text-slate-200" />
                        </div>
                        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No matches found in the archive</p>
                    </div>
                )}
            </div>

            {/* Modals */}
            <AssignModal 
                isOpen={isAssignModalOpen} 
                onClose={() => setIsAssignModalOpen(false)} 
                data={selectedDoc} 
            />
        </div>
    );
};

export default AssignToReview;