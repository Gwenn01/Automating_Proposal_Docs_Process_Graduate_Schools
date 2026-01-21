import React from "react";
import { X } from "lucide-react";

const DocumentViewerModal = ({ isOpen, onClose, proposalData }) => {
  if (!isOpen || !proposalData) return null;

  // Correct mapping based on actual API structure
  const cover = proposalData.cover_page?.cover_pages || {};
  const content = proposalData.full_content?.content_pages || {};

  return (
    // 1. We use a Fragment to include the style tag along with the modal
    <>
      {/* 2. Define Custom Keyframes for the 'Pop' effect */}
      <style>{`
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPopIn {
          0% { opacity: 0; transform: scale(0.5) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-overlay-enter {
          animation: overlayFadeIn 0.5s ease-out forwards;
        }
        .animate-modal-enter {
          animation: modalPopIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* 3. Apply the Overlay Animation Class */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-6 animate-overlay-enter">
        
        {/* 4. Apply the Modal Pop-in Animation Class */}
        <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-modal-enter">
          
          {/* Header */}
          <div className="flex justify-between items-center px-8 py-5 border-b bg-gray-50/50">
            <div>
                <h3 className="font-bold text-xl text-gray-800">Proposal Details</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">
                   {proposalData.status}
                </p>
            </div>
            <button 
                onClick={onClose} 
                className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content */}
          <div className="p-8 space-y-12 overflow-auto bg-white">

            {/* ========== BASIC INFO ========== */}
            <section>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                  {proposalData.title}
              </h1>
            </section>

            {/* ========== COVER PAGE SECTION ========== */}
            <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h2 className="text-xl font-bold mb-6 text-green-700 flex items-center gap-2">
                Cover Page
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div className="col-span-2">
                    <p className="text-gray-500 text-xs uppercase font-bold">Proposal Summary</p>
                    <p className="font-medium text-lg text-gray-800 mt-1">{cover.proposal_summary?.program_title || "N/A"}</p>
                  </div>

                  <div>
                     <p className="text-gray-500 text-xs uppercase font-bold">Submission Date</p>
                     <p className="font-medium">{cover.submission_date || "N/A"}</p>
                  </div>

                  <div>
                     <p className="text-gray-500 text-xs uppercase font-bold">Board Resolution</p>
                     <p className="font-medium">{cover.proposal_summary?.board_resolution || "N/A"}</p>
                  </div>

                  <div>
                     <p className="text-gray-500 text-xs uppercase font-bold">Coverage Period</p>
                     <p className="font-medium">{cover.proposal_summary?.coverage_period || "N/A"}</p>
                  </div>

                  <div>
                     <p className="text-gray-500 text-xs uppercase font-bold">Approved Budget</p>
                     <p className="font-medium text-green-600">
                        {cover.proposal_summary?.approved_budget?.amount || "N/A"}
                     </p>
                  </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                 <h3 className="text-sm font-bold text-gray-900 mb-4">Activity Details</h3>
                 <div className="space-y-3 text-sm">
                    <p><span className="font-medium text-gray-500">Title:</span> {cover.activity_details?.title || "N/A"}</p>
                    <p><span className="font-medium text-gray-500">Date:</span> {cover.activity_details?.date || "N/A"}</p>
                    <p><span className="font-medium text-gray-500">Venue:</span> {cover.activity_details?.venue || "N/A"}</p>
                    <p><span className="font-medium text-gray-500">Purpose:</span> {cover.activity_details?.value_statement || "N/A"}</p>
                 </div>
              </div>
            </section>

            {/* ========== CONTENT PAGE SECTION ========== */}
            <section>
              <h2 className="text-xl font-bold mb-6 text-green-700 border-b pb-2">Project Content</h2>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                  <div>
                      <h3 className="font-bold text-gray-900">Rationale</h3>
                      <p className="mt-1">{content.rationale || "N/A"}</p>
                  </div>
                  
                  <div>
                      <h3 className="font-bold text-gray-900">Significance</h3>
                      <p className="mt-1">{content.significance || "N/A"}</p>
                  </div>

                  <div>
                      <h3 className="font-bold text-gray-900">Methodology</h3>
                      <p className="mt-1">{content.methodology || "N/A"}</p>
                  </div>

                  <div>
                      <h3 className="font-bold text-gray-900">Sustainability Plan</h3>
                      <p className="mt-1">{content.sustainability_plan || "N/A"}</p>
                  </div>

                  {/* OBJECTIVES */}
                  <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                      <h3 className="font-bold text-blue-900 mb-2">Objectives</h3>
                      <p className="text-sm mb-2"><strong className="text-blue-700">General:</strong> {content.objectives?.general || "N/A"}</p>
                      <div className="text-sm">
                          <strong className="text-blue-700">Specific:</strong>
                          <p className="whitespace-pre-line mt-1 pl-4 border-l-2 border-blue-200">
                              {content.objectives?.specific || "N/A"}
                          </p>
                      </div>
                  </div>

                  {/* PLAN OF ACTIVITIES TABLE */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Plan of Activities</h3>
                    <div className="overflow-hidden border rounded-lg">
                        <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-xs">
                            <tr>
                            <th className="px-4 py-3">Time</th>
                            <th className="px-4 py-3">Activity</th>
                            <th className="px-4 py-3">Speaker</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {content.plan_of_activities?.schedule?.map((s, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">{s.time}</td>
                                <td className="px-4 py-3">{s.activity || "-"}</td>
                                <td className="px-4 py-3 text-gray-500">{s.speaker || "-"}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                  </div>

                  {/* ORGANIZATION AND STAFFING */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Organization and Staffing</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {content.organization_and_staffing?.map((o, i) => (
                        <div key={i} className="border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-xs text-gray-500 font-bold uppercase mb-1">{o.designation}</p>
                            <p className="font-bold text-gray-800">{o.activity}</p>
                            <p className="text-xs text-gray-400 mt-2">{o.terms}</p>
                        </div>
                        ))}
                    </div>
                  </div>

              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentViewerModal;