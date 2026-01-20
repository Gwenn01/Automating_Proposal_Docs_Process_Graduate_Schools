import React from "react";
import { X } from "lucide-react";

const DocumentViewerModal = ({ isOpen, onClose, proposalData }) => {
  if (!isOpen || !proposalData) return null;

  // Correct mapping based on actual API structure
  const cover = proposalData.cover_page?.cover_pages || {};
  const content = proposalData.full_content?.content_pages || {};

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-6">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded shadow-xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="font-bold text-lg">Proposal Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-10 overflow-auto">

          {/* ========== BASIC INFO ========== */}
          <section>
            <h2 className="text-xl font-bold mb-2">{proposalData.title}</h2>
            <p><strong>Status:</strong> {proposalData.status}</p>
          </section>

          {/* ========== COVER PAGE SECTION ========== */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Cover Page</h2>

            <p>
              <strong>Submission Date:</strong>{" "}
              {cover.submission_date || "N/A"}
            </p>

            <h3 className="text-lg font-semibold mt-4">Proposal Summary</h3>

            <p>
              <strong>Program Title:</strong>{" "}
              {cover.proposal_summary?.program_title || "N/A"}
            </p>

            <p>
              <strong>Board Resolution:</strong>{" "}
              {cover.proposal_summary?.board_resolution || "N/A"}
            </p>

            <p>
              <strong>Coverage Period:</strong>{" "}
              {cover.proposal_summary?.coverage_period || "N/A"}
            </p>

            <p>
              <strong>Approved Budget:</strong>{" "}
              {cover.proposal_summary?.approved_budget?.amount || "N/A"} –{" "}
              {cover.proposal_summary?.approved_budget?.words || ""}
            </p>

            <h3 className="text-lg font-semibold mt-6">Activity Details</h3>

            <p>
              <strong>Title:</strong>{" "}
              {cover.activity_details?.title || "N/A"}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {cover.activity_details?.date || "N/A"}
            </p>

            <p>
              <strong>Venue:</strong>{" "}
              {cover.activity_details?.venue || "N/A"}
            </p>

            <p>
              <strong>Purpose:</strong>{" "}
              {cover.activity_details?.value_statement || "N/A"}
            </p>

            <p>
              <strong>Requested Budget:</strong>{" "}
              {cover.activity_details?.requested_budget || "N/A"}
            </p>

            <h3 className="text-lg font-semibold mt-6">Participants</h3>

            <p>
              <strong>PRMSU Participants:</strong>{" "}
              {cover.participants?.prmsu?.words || "N/A"} (
              {cover.participants?.prmsu?.count || 0})
            </p>

            <p>
              <strong>Partner Agency:</strong>{" "}
              {cover.participants?.partner_agency?.name || "N/A"}
            </p>

            <p>
              <strong>Trainees:</strong>{" "}
              {cover.participants?.trainees?.words || "N/A"} (
              {cover.participants?.trainees?.count || 0})
            </p>
          </section>

          {/* ========== CONTENT PAGE SECTION ========== */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Project Content</h2>

            <h3 className="font-semibold">Project Title</h3>
            <p>{content.project_profile?.project_title || "N/A"}</p>

            <h3 className="font-semibold mt-4">Program Title</h3>
            <p>{content.project_profile?.program_title || "N/A"}</p>

            <h3 className="font-semibold mt-4">Activity Title</h3>
            <p>{content.project_profile?.activity_title || "N/A"}</p>

            <h3 className="font-semibold mt-4">Rationale</h3>
            <p>{content.rationale || "N/A"}</p>

            <h3 className="font-semibold mt-4">Significance</h3>
            <p>{content.significance || "N/A"}</p>

            <h3 className="font-semibold mt-4">Methodology</h3>
            <p>{content.methodology || "N/A"}</p>

            <h3 className="font-semibold mt-4">Sustainability Plan</h3>
            <p>{content.sustainability_plan || "N/A"}</p>

            {/* ========== OBJECTIVES ========== */}
            <h3 className="font-semibold mt-6">Objectives</h3>

            <p><strong>General:</strong></p>
            <p>{content.objectives?.general || "N/A"}</p>

            <p className="mt-2"><strong>Specific:</strong></p>
            <p className="whitespace-pre-line">
              {content.objectives?.specific || "N/A"}
            </p>

            {/* ========== PLAN OF ACTIVITIES ========== */}
            <h3 className="font-semibold mt-6">Plan of Activities</h3>

            <p>
              <strong>Activity Title:</strong>{" "}
              {content.plan_of_activities?.activity_title || "N/A"}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {content.plan_of_activities?.activity_date || "N/A"}
            </p>

            <table className="w-full mt-4 border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Activity</th>
                  <th className="border p-2">Speaker</th>
                </tr>
              </thead>

              <tbody>
                {content.plan_of_activities?.schedule?.map((s, index) => (
                  <tr key={index}>
                    <td className="border p-2">{s.time}</td>
                    <td className="border p-2">{s.activity || "-"}</td>
                    <td className="border p-2">{s.speaker || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ========== BUDGETARY REQUIREMENTS ========== */}
            <h3 className="font-semibold mt-6">Budget Breakdown</h3>

            <p>
              <strong>Grand Total:</strong>{" "}
              Php {content.budgetary_requirement?.totals?.grand_total || 0}
            </p>

            {/* ========== ORGANIZATION AND STAFFING ========== */}
            <h3 className="font-semibold mt-6">Organization and Staffing</h3>

            {content.organization_and_staffing?.map((o, i) => (
              <div key={i} className="border p-3 rounded mb-2">
                <p><strong>Activity:</strong> {o.activity}</p>
                <p><strong>Designation:</strong> {o.designation}</p>
                <p><strong>Terms:</strong> {o.terms}</p>
              </div>
            ))}

          </section>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerModal;
