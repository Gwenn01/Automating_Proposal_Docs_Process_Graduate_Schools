import React, { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import CommentInput from "./CommentInput";
import { getStatusStyle } from "../../utils/statusStyles";
import axios from "axios";

const ReviewerCommentModal = ({ isOpen, onClose, proposalData, reviewe }) => {
  const [comments, setComments] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHistoryData, setSelectedHistoryData] = useState(null);
  const [loadingHistoryData, setLoadingHistoryData] = useState(false);

  const proposalId = proposalData?.id;

  // Debug logging
  useEffect(() => {
    console.log('Proposal Data in Modal:', proposalData);
    console.log('Reviewer ID (reviewe):', reviewe);
    console.log('Review ID:', proposalData?.review_id);
    console.log('Is First Review:', !proposalData?.review_id);
  }, [proposalData, reviewe]);

  // Fetch history on mount
  useEffect(() => {
    if (!proposalId || !isOpen) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);

        const response = await fetch('http://127.0.0.1:5000/api/get-history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            proposal_id: proposalId
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched history data:", data);

        if (Array.isArray(data)) {
          const mappedHistory = data.map(item => ({
            history_id: item.history_id,
            proposal_id: item.proposal_id,
            status: item.status,
            version_no: item.version_no,
            created_at: item.created_at,
          }));

          setHistory(mappedHistory);
          console.log("Mapped history:", mappedHistory);
        } else {
          console.error("Expected array but got:", typeof data);
          setHistory([]);
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [proposalId, isOpen]);

// Function to fetch history data when clicking on a history item
const fetchHistoryData = async (historyId) => {
  try {
    setLoadingHistoryData(true);
    
    const response = await fetch('http://127.0.0.1:5000/api/get-history-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        history_id: historyId
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw history data from API:", data);
    
    // Helper function to safely parse JSON strings
    const safeParse = (value, fallback = {}) => {
      if (!value) return fallback;
      if (typeof value === 'object') return value;
      try {
        return JSON.parse(value);
      } catch (e) {
        console.error("Failed to parse:", value, e);
        return fallback;
      }
    };

    // Structure the data to match the expected format
    const structuredData = {
      ...proposalData, // Keep the proposal metadata (id, title, status, etc.)
      history_id: historyId, // Add history_id for tracking
      cover_page: {
        cover_pages: data.cover_page || {}
      },
      full_content: {
        content_pages: {
          project_profile: {
            ...data.project_profile,
            proponents: safeParse(data.project_profile?.proponents, { project_leader: "", members: "" }),
          },
          // These are strings, not objects
          rationale: data.rationale?.rationale_content || "",
          significance: data.significance?.significance_content || "",
          objectives: {
            general: data.objectives?.general_content || "",
            specific: data.objectives?.specific_content || ""
          },
          methodology: data.methodology?.methodology_content || "",
          expected_output_outcome: {
            "6ps": safeParse(data.expected_output_outcome?.["6ps"], {})
          },
          sustainability_plan: data.sustainability_plan?.sustainability_plan_content || "",
          organization_and_staffing: safeParse(data.organization_and_staffing?.organization_and_staffing_content, []),
          plan_of_activities: safeParse(data.plan_of_activities?.plan_of_activities_content, {
            activity_title: "",
            activity_date: "",
            schedule: []
          }),
          budgetary_requirement: safeParse(data.budgetary_requirement?.budgetary_requirement, {
            meals: [],
            supplies: [],
            transport: [],
            totals: {}
          })
        }
      }
    };
    
    console.log("Structured history data:", structuredData);
    console.log("Cover page:", structuredData.cover_page);
    console.log("Content pages:", structuredData.full_content.content_pages);
    console.log("Rationale:", structuredData.full_content.content_pages.rationale);
    console.log("Objectives:", structuredData.full_content.content_pages.objectives);
    console.log("Plan of activities:", structuredData.full_content.content_pages.plan_of_activities);
    console.log("Budgetary requirement:", structuredData.full_content.content_pages.budgetary_requirement);
    
    // Set the selected history data which will replace the current view
    setSelectedHistoryData(structuredData);
    
  } catch (err) {
    console.error("Failed to fetch history data:", err);
    console.error("Error stack:", err.stack);
    alert("Failed to load history data. Please try again.");
  } finally {
    setLoadingHistoryData(false);
  }
};

  // Function to go back to current proposal view
  const resetToCurrentProposal = () => {
    setSelectedHistoryData(null);
  };

  if (!isOpen || !proposalData) return null;

  // Use selectedHistoryData if available, otherwise use proposalData
  const activeData = selectedHistoryData || proposalData;
  const cover = activeData.cover_page?.cover_pages || {};
  const content = activeData.full_content?.content_pages || {};
  
  const statusStyle = getStatusStyle(proposalData.status);

  const handleCommentChange = (InputValue, commentValue) => {
    setComments(prev => ({
      ...prev,
      [InputValue]: commentValue,
    }));
  };

  const handleSubmitReview = async () => {
    setIsSubmitting(true);

    // Check if this is the first review or an update
    // First review: when review_id doesn't exist or is null
    const isFirstReview = !proposalData.review_id;
    
    // Ensure all required fields are present with defaults
    const allReviews = {
      review_round: "1st",
      proposal_type: "Project",
      source_of_fund: "Resolution No. 1436, S. 2025",
      
      // Default empty strings for all feedback fields
      cover_letter_feedback: "",
      form1_proposal_feedback: "",
      project_profile_feedback: "",
      rationale_feedback: "",
      significance_feedback: "",
      general_objectives_feedback: "",
      specific_objectives_feedback: "",
      methodology_feedback: "",
      expected_output_feedback: "",
      potential_impact_feedback: "",
      sustainability_plan_feedback: "",
      org_staffing_feedback: "",
      work_financial_plan_feedback: "",
      budget_summary_feedback: "",
      
      // Override with actual comments from user
      ...comments
    };
    
    const reviewData = {
      proposal_id: proposalId,
      review_id: proposalData.review_id,
      reviewed_by: reviewe, // Add reviewer ID
      reviewed_at: new Date().toISOString(), // Add timestamp
      reviews: allReviews
    };

    // Use post-reviews-item for first review only, then update-review-items for all subsequent reviews
    const apiEndpoint = isFirstReview 
      ? "http://127.0.0.1:5000/api/post-reviews-item"
      : "http://127.0.0.1:5000/api/update-review-items";

    console.log(`${isFirstReview ? 'Creating first' : 'Updating'} review:`, reviewData);
    console.log('API Endpoint:', apiEndpoint);
    console.log('Reviewer ID:', reviewe);

    try {
      const res = await axios.post(
        apiEndpoint,
        reviewData,
        { headers: { "Content-Type": "application/json" } }
      );

      alert(res.data.message || 'Review submitted successfully!');
      setComments({});
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      
      // Show more detailed error message
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || error.message 
        || "Failed to submit review";
      
      alert(`Failed to submit review: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md animate-overlay-enter">
        
        {/* Main Modal Container */}
        <div className="bg-white w-full max-w-5xl h-[95vh] rounded-bl-xl rounded-tl-xl shadow-2xl flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="flex justify-between items-center px-8 py-5 border-b bg-primaryGreen text-white">
            <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-1 items-center justify-between">
              <div className="flex flex-col justify-center items-start gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-5 bg-white/80 rounded-full"></div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-emerald-100">
                    {selectedHistoryData ? "Historical Version - Review" : "Review Proposal"}
                  </h3>
                </div>
                <h1 className="text-xl font-bold leading-tight text-white drop-shadow-sm">
                  {proposalData.title}
                </h1>
              </div>

              {selectedHistoryData && (
                <button
                  onClick={resetToCurrentProposal}
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md font-semibold
                            bg-blue-500 text-white hover:bg-blue-600 transition text-sm"
                >
                  Back to Current
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-14 overflow-auto bg-white">

            {/* Loading indicator for history data */}
            {loadingHistoryData && (
              <div className="flex flex-col gap-3 justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></div>
                <p className="text-sm font-light text-gray-500">Loading Historical Data...</p>
              </div>
            )}

            {!loadingHistoryData && (
              <>
                {/* ========== COVER PAGE SECTION ========== */}
                <section className="max-w-5xl mx-auto px-5 rounded-sm shadow-sm font-sans text-gray-900 leading-relaxed">
                  
                  <div className="space-y-4 font-normal text-base">
                    <div>
                      <p className="font-medium">{cover.submission_date || "N/A"}</p>
                    </div>

                    <div className="uppercase ">
                      <p className='font-bold'>DR. ROY N. VILLALOBOS</p>
                      <p>University President</p>
                      <p>President Ramon Magsaysay State University</p>
                    </div>

                    <p>Dear Sir:</p>

                    <p className="">
                      I have the honor to submit the proposal for your consideration and appropriate action 
                      for the proposed extension program entitled {cover.proposal_summary?.program_title || "N/A"}
                      ,with the approved budget of {cover.proposal_summary?.approved_budget?.words || "N/A"}; {cover.proposal_summary?.approved_budget?.amount || "N/A"} with the duration 
                      of {cover.proposal_summary?.duration?.words || "N/A"} years, {cover.proposal_summary?.coverage_period || "N/A"}.
                    </p>

                    <p>
                      This program includes an activity entitled {cover.activity_details?.title || "N/A"} on {content.plan_of_activities?.activity_date ? new Date(content.plan_of_activities.activity_date).toLocaleDateString("en-US",{ year: "numeric", month: "long", day: "numeric" }): "N/A"} at {cover.activity_details?.venue || "N/A"}. This activity is valuable {cover.activity_details?.value_statement || "N/A"}. The requested expenses 
                      for this activity from the university is {cover.activity_details?.requested_budget || "N/A"}, 
                      which will be used to defray expenses for food, transportation, supplies and materials, 
                      and other expenses related to these activities.
                    </p>

                    <p>
                      Further, there is {cover.participants?.prmsu?.words || "N/A"} ({cover.participants?.prmsu?.count || "N/A"}) the total number of participants from PRMSU, 
                      another {cover.participants?.partner_agency?.words || "N/A"} ({cover.participants?.partner_agency?.count || "N/A"}) from the collaborating agency, {cover.participants?.partner_agency?.name || "N/A"}, and {cover.participants?.trainees?.words || "N/A"} ({cover.participants?.trainees?.count || "N/A"}) trainees from the abovementioned community.
                    </p>

                    <p className="">Your favorable response regarding this matter will be highly appreciated.</p>

                    <p className="italic">Prepared by:</p>
                    <p className="py-1">Proponent</p>
                    <p className="italic">Noted by:</p>

                    <div className="">
                      <div className="grid grid-cols-2">
                        <div className="">
                          <p className="pt-4">Campus Extension Coordinator</p>
                          <p className="pt-4 italic">Endorsed by:</p>
                          <p className="pt-4"></p>
                          <p className="pt-1">Campus Director</p>
                          <p className="pt-4 italic">Recommending Approval:</p>
                          <p className="pt-7 font-bold text-[16px]">MARLON JAMES A. DEDICATORIA, Ph.D.</p>
                          <p className="pt-1">Vice-President, Research and Development</p>
                        </div>

                        <div className="">
                          <p className="pt-4">College Dean</p>
                          <p className="pt-4"></p>
                          <p className="pt-4 font-bold text-[16px]">KATHERINE M.UY, MAEd</p>
                          <p className="pt-1"> Director, Extension Services</p>
                          <p className="pt-4 italic">Certified Funds Available</p>
                          <p className="pt-7 font-bold text-[16px]">ROBERTO C. BRIONES JR., CPA</p>
                          <p className="pt-1">University Accountant IV</p>
                        </div>
                      </div>
                      <p className="pt-10 italic text-center">Approved by:</p>
                      <p className="pt-5 font-bold text-[16px] text-center">ROY N. VILLALOBOS, DPA</p>
                      <p className="pt-1 text-center">University President</p>
                    </div>  
                  </div>
                </section>         

                {/* ========== REVIEWER'S COMMENT ========== */}
                <CommentInput
                  sectionName="Cover Page"
                  onCommentChange={handleCommentChange}
                  InputValue="cover_letter_feedback"
                />

                {/* ========== FORM 1 PROPOSAL FEEDBACK ========== */}
                <CommentInput
                  sectionName="Form 1 Proposal"
                  onCommentChange={handleCommentChange}
                  InputValue="form1_proposal_feedback"
                />

                {/* ========== CONTENT PAGE SECTION ========== */}
                <section>
                  <h2 className="text-xl font-bold my-8">I. PROJECT PROFILE</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border border-black text-sm">
                      <tbody>
                        <tr className="border-b border-black">
                          <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                            Program Title:
                          </td>
                          <td className="px-4 py-3">
                            {content.project_profile?.program_title || "N/A"}
                          </td>
                        </tr>

                        <tr className="border-b border-black">
                          <td className="border-r border-black px-4 py-3 font-bold text-gray-900">
                            Project Title:
                          </td>
                          <td className="px-4 py-3">
                            {content.project_profile?.project_title || "N/A"}
                          </td>
                        </tr>

                        <tr className="border-b border-black">
                          <td className="border-r border-black px-4 py-3 font-bold text-gray-900">
                            Activity Title:
                          </td>
                          <td className="px-4 py-3">
                            {content.project_profile?.activity_title || "N/A"}
                          </td>
                        </tr>

                        <tr className="border-b border-black">
                          <td className="border-r border-black px-4 py-3 font-bold text-gray-900">
                            SDG's
                          </td>
                          <td className="px-4 py-3">
                            {content.project_profile?.sdg_alignment || "N/A"}
                          </td>
                        </tr>

                        <tr className="border-b border-black">
                          <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                            Extension Agenda 
                          </td>
                          <td className="px-4 py-3">
                            {content.project_profile?.extension_agenda || "N/A"}
                          </td>
                        </tr>

                        <tr className="border-b border-black">
                          <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                            Proponents:  Project Leader
                          </td>
                          <td className="px-4 py-3">
                            {content.project_profile?.proponents?.project_leader || "N/A"}
                          </td>
                        </tr>

                        <tr className="border-b border-black">
                          <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                            Members:
                          </td>
                          <td className="px-4 py-3">
                            {content.project_profile?.proponents?.members || "N/A"}
                          </td>
                        </tr>

                        <tr className="border-b border-black">
                          <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                            College/Campus/Mandated Program:
                          </td>
                          <td className="px-4 py-3">
                            {content.project_profile?.college_campus_program || "N/A"}
                          </td>
                        </tr>

                        <tr className="border-b border-black">
                          <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                            Collaborating Agencies:
                          </td>
                          <td className="px-4 py-3">
                            {content.project_profile?.collaborating_agencies || "N/A"}
                          </td>
                        </tr>

                        <tr className="border-b border-black">
                          <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                            Community Location:
                          </td>
                          <td className="px-4 py-3">
                            {content.project_profile?.community_location || "N/A"}
                          </td>
                        </tr>

                        <tr className="border-b border-black">
                          <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                            Target Sector:
                          </td>
                          <td className="px-4 py-3">
                            {content.project_profile?.target_sector || "N/A"}
                          </td>
                        </tr>

                        <tr className="border-b border-black">
                          <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                            Number of Beneficiaries
                          </td>
                          <td className="px-4 py-3">
                            {content.project_profile?.number_of_beneficiaries || "N/A"}
                          </td>
                        </tr>

                        <tr className="border-b border-black">
                          <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                            Period of Implementation/ Duration:
                          </td>
                          <td className="px-4 py-3">
                            {content.project_profile?.implementation_period || "N/A"}
                          </td>
                        </tr>

                        <tr className="border-b border-black">
                          <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                            Budgetary Requirements (PhP): 
                          </td>
                          <td className="px-4 py-3">
                            Php {content.project_profile?.budgetary_requirements || "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <CommentInput
                      sectionName="Project Profile"
                      onCommentChange={handleCommentChange}
                      InputValue="project_profile_feedback"
                    />
                  </div>

                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <div className="">
                      <h3 className="font-bold text-gray-900 pt-10 text-xl ">II. RATIONALE</h3>
                      <p className="text-base mt-3">{content.rationale || "N/A"}</p>

                      <CommentInput
                        sectionName="Rationale"
                        onCommentChange={handleCommentChange}
                        InputValue="rationale_feedback"
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-900 pt-5 text-xl ">III. SIGNIFICANCE</h3>
                      <p className="text-base mt-3">{content.significance || "N/A"}</p>

                      <CommentInput
                        sectionName="Significance"
                        onCommentChange={handleCommentChange}
                        InputValue="significance_feedback"
                      />
                    </div>

                    {/* OBJECTIVES */}
                    <div className="">
                      <h3 className="font-bold text-gray-900 pt-5 text-xl ">IV. OBJECTIVES</h3>
                      <p className="text-base font-semibold mb-2 mt-3"> General Objectives</p>
                      <p className="p-5 bg-gray-100">{content.objectives?.general || "N/A"}</p>

                      <CommentInput
                        sectionName="General Objectives"
                        onCommentChange={handleCommentChange}
                        InputValue="general_objectives_feedback"
                      />

                      <p className="text-base font-semibold mb-2 mt-3">Specific Objectives</p>
                      <p className="p-5 bg-gray-100">{content.objectives?.specific || "N/A"}</p>

                      <CommentInput
                        sectionName="Specific Objectives"
                        onCommentChange={handleCommentChange}
                        InputValue="specific_objectives_feedback"
                      />
                    </div>

                    <div className="">
                      <h3 className="font-bold text-gray-900 pt-10 text-xl ">V. METHODOLOGY</h3>
                      <p className="text-base mt-3">{content.methodology || "N/A"}</p>

                      <CommentInput
                        sectionName="Methodology"
                        onCommentChange={handleCommentChange}
                        InputValue="methodology_feedback"
                      />
                    </div>

                    <div className="">
                      <h3 className="font-bold text-gray-900 pt-10 text-xl mb-5">VI. EXPECTED OUTPUT/OUTCOME</h3>

                      <table className="w-full border border-black text-sm">
                        <tbody>
                          <tr className="border-b border-black">
                            <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900 text-center">
                              6Ps
                            </td>
                            <td className="px-4 py-3 text-center font-bold">
                              OUTPUT
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="border-r border-black px-4 py-3 font-bold text-gray-900">
                              Publications
                            </td>
                            <td className="px-4 py-3">
                              {content?.expected_output_outcome?.["6ps"]?.publications || "N/A"}
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="border-r border-black px-4 py-3 font-bold text-gray-900">
                              Patents/IP
                            </td>
                            <td className="px-4 py-3">
                              {content?.expected_output_outcome?.["6ps"]?.patents || "N/A"}
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="border-r border-black px-4 py-3 font-bold text-gray-900">
                              Products
                            </td>
                            <td className="px-4 py-3">
                              {content?.expected_output_outcome?.["6ps"]?.products || "N/A"}
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                              People Services 
                            </td>
                            <td className="px-4 py-3">
                              {content?.expected_output_outcome?.["6ps"]?.people_services || "N/A"}
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                              Places and Partnerships
                            </td>
                            <td className="px-4 py-3">
                              {content?.expected_output_outcome?.["6ps"]?.places_partnerships || "N/A"}
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                              Policy
                            </td>
                            <td className="px-4 py-3">
                              {content?.expected_output_outcome?.["6ps"]?.policy || "N/A"}
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                              Social Impact
                            </td>
                            <td className="px-4 py-3">
                              {content?.expected_output_outcome?.["6ps"]?.social_impact || "N/A"}
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                              Economic Impact
                            </td>
                            <td className="px-4 py-3">
                              {content?.expected_output_outcome?.["6ps"]?.economic_impact || "N/A"}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <CommentInput
                        sectionName="Expected Output/Outcome"
                        onCommentChange={handleCommentChange}
                        InputValue="expected_output_feedback"
                      />

                      {/* ========== POTENTIAL IMPACT FEEDBACK ========== */}
                      <CommentInput
                        sectionName="Potential Impact"
                        onCommentChange={handleCommentChange}
                        InputValue="potential_impact_feedback"
                      />
                    </div>

                    <div className="">
                      <h3 className="font-bold text-gray-900 pt-10 text-xl ">VII. SUSTAINABILITY PLAN</h3>
                      <p className="text-base mt-3">{content.sustainability_plan || "N/A"}</p>

                      <CommentInput
                        sectionName="Sustainability Plan"
                        onCommentChange={handleCommentChange}
                        InputValue="sustainability_plan_feedback"
                      />
                    </div>

                    <div className="">
                      <h3 className="font-bold text-gray-900 pt-10 text-xl mb-5">VIII. ORGANIZATION AND STAFFING <span className="text-base italic font-semibold">(Persons involved and responsibility) </span></h3>

                      <table className="w-full border border-black text-sm">
                        <tbody>
                          <tr className="border-b border-black">
                            <td className="w-1/3 border-r border-black px-4 py-3 text-center font-bold">
                              Activity/s
                            </td>
                            <td className="w-1/3 border-r border-black px-4 py-3 text-center font-bold">
                              Designation / Name
                            </td>
                            <td className="w-1/3 px-4 py-3 text-center font-bold">
                              Terms of Reference
                            </td>
                          </tr>

                          {content?.organization_and_staffing?.length > 0 ? (
                            content.organization_and_staffing.map((item, index) => (
                              <tr key={index} className="border-b border-black">
                                <td className="border-r border-black px-4 py-3 text-gray-900">
                                  {item.activity || "N/A"}
                                </td>

                                <td className="border-r border-black px-4 py-3 whitespace-pre-line">
                                  {item.designation || "N/A"}
                                </td>

                                <td className="px-4 py-3 text-gray-900 whitespace-pre-line">
                                  {item.terms || "N/A"}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3} className="text-center px-4 py-3 text-gray-500">
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                      <CommentInput
                        sectionName="Organization and Staffing"
                        onCommentChange={handleCommentChange}
                        InputValue="org_staffing_feedback"
                      />
                    </div>

                    <div className="">
                      <h3 className="font-bold text-gray-900 pt-10 text-xl ">IX. PLAN OF ACTIVITIES</h3>
                      <p className="text-xl font-bold mt-3 text-center">{content.plan_of_activities?.activity_title || "N/A"}</p>
                      <p className="text-lg mt-3 text-center">
                        {content.plan_of_activities?.activity_date
                          ? new Date(content.plan_of_activities.activity_date).toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "long", day: "numeric" }
                            )
                          : "N/A"}
                      </p>

                      <p className="text-lg mt-2 mb-5 text-center font-semibold">PROGRAMME</p>

                      <table className="w-full border border-black text-sm">
                        <tbody>
                          <tr className="border-b border-black">
                            <td className="w-1/5 border-r border-black px-4 py-3 text-center font-bold">
                              Time
                            </td>
                            <td className="w-1/3 border-r border-black px-4 py-3 text-center font-bold">
                              Part of the program
                            </td>
                          </tr>

                          {content?.plan_of_activities?.schedule?.length > 0 ? (
                            content.plan_of_activities.schedule.map((item, index) => (
                              <tr key={index} className="border-b border-black">
                                <td className="border-r border-black px-4 py-3 text-gray-900">
                                  {item.time || "N/A"}
                                </td>

                                <td className="border-r border-black px-4 py-3 whitespace-pre-line">
                                  <p>{item.activity || "Not Assigned"}</p>
                                  <p>{item.speaker || "Not Assigned"}</p>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={2} className="text-center px-4 py-3 text-gray-500">
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                      <CommentInput
                        sectionName="Plan of Activities"
                        onCommentChange={handleCommentChange}
                        InputValue="work_financial_plan_feedback"
                      />
                    </div>

                    <div className="">
                      <h3 className="font-bold text-gray-900 pt-10 text-xl ">XI. BUDGETARY REQUIREMENT </h3>
                      <table className="w-full border border-black text-sm mt-6">
                        <tbody>
                          <tr className="border-b border-black bg-gray-100">
                            <td className="border-r border-black px-4 py-3 font-bold text-center">
                              CATEGORY
                            </td>
                            <td className="border-r border-black px-4 py-3 font-bold text-center">
                              ITEM
                            </td>
                            <td className="border-r border-black px-4 py-3 font-bold text-center">
                              <p>Cost (PHP)</p>
                            </td>
                            <td className="border-r border-black px-4 py-3 font-bold text-center">
                              PAX/QTY.
                            </td>
                            <td className="px-4 py-3 font-bold text-center">
                              AMOUNT
                            </td>
                          </tr>

                          {/* MEALS */}
                          {content?.budgetary_requirement?.meals?.map((row, index) => (
                            <tr key={`meals-${index}`} className="border-b border-black">
                              <td className="border-r border-black px-4 py-3">Meals</td>
                              <td className="border-r border-black px-4 py-3">{row.item}</td>
                              <td className="border-r border-black px-4 py-3 text-right">₱ {row.cost}</td>
                              <td className="border-r border-black px-4 py-3 text-right">{row.qty}</td>
                              <td className="px-4 py-3 text-right">₱ {row.amount}</td>
                            </tr>
                          ))} 

                          {/* TRANSPORT */}
                          {content?.budgetary_requirement?.transport?.map((row, index) => (
                            <tr key={`transport-${index}`} className="border-b border-black">
                              <td className="border-r border-black px-4 py-3">Transport</td>
                              <td className="border-r border-black px-4 py-3">{row.item}</td>
                              <td className="border-r border-black px-4 py-3 text-right">₱ {row.cost}</td>
                              <td className="border-r border-black px-4 py-3 text-right">{row.qty}</td>
                              <td className="px-4 py-3 text-right">₱ {row.amount}</td>
                            </tr>
                          ))}

                          {/* SUPPLIES */}
                          {content?.budgetary_requirement?.supplies?.map((row, index) => (
                            <tr key={`supplies-${index}`} className="border-b border-black">
                              <td className="border-r border-black px-4 py-3">Supplies</td>
                              <td className="border-r border-black px-4 py-3">{row.item}</td>
                              <td className="border-r border-black px-4 py-3 text-right">₱ {row.cost}</td>
                              <td className="border-r border-black px-4 py-3 text-right">{row.qty}</td>
                              <td className="px-4 py-3 text-right">₱ {row.amount}</td>
                            </tr>
                          ))}

                          {/* TOTALS */}
                          <tr className="font-bold bg-gray-100">
                            <td colSpan={4} className="border-r border-black px-4 py-3 text-right">
                              Grand Total
                            </td>
                            <td className="px-4 py-3 text-right">
                              <p>₱ {content?.budgetary_requirement?.totals?.grand_total || 0}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <CommentInput
                        sectionName="Budgetary Requirement"
                        onCommentChange={handleCommentChange}
                        InputValue="budget_summary_feedback"
                      />
                    </div>

                    <div className="py-4">
                      <p className="italic my-3">Prepared by:</p>
                      <p className="py-1 mb-2">Proponent</p>
                      <p className="italic">Noted by:</p>

                      <div className="">
                        <div className="grid grid-cols-2">
                          <div className="">
                            <p className="pt-4">Campus Extension Coordinator</p>
                            <p className="pt-4 italic">Endorsed by:</p>
                            <p className="pt-4"></p>
                            <p className="pt-1">Campus Director</p>
                            <p className="pt-4 italic">Recommending Approval:</p>
                            <p className="pt-7 font-bold text-[16px]">MARLON JAMES A. DEDICATORIA, Ph.D.</p>
                            <p className="pt-1">Vice-President, Research and Development</p>
                          </div>

                          <div className="">
                            <p className="pt-4">College Dean</p>
                            <p className="pt-4"></p>
                            <p className="pt-4 font-bold text-[16px]">KATHERINE M.UY, MAEd</p>
                            <p className="pt-1"> Director, Extension Services</p>
                            <p className="pt-4 italic">Certified Funds Available</p>
                            <p className="pt-7 font-bold text-[16px]">ROBERTO C. BRIONES JR., CPA</p>
                            <p className="pt-1">University Accountant IV</p>
                          </div>
                        </div>
                        <p className="pt-10 italic text-center">Approved by:</p>
                        <p className="pt-5 font-bold text-[16px] text-center">ROY N. VILLALOBOS, DPA</p>
                        <p className="pt-1 text-center">University President</p>
                      </div>  
                    </div>
                  </div>
                </section>

                {/* ========== SUBMIT REVIEW BUTTON ========== */}
                <div className="border mt-10 py-6 bg-gradient-to-t from-white via-white to-transparent">
                  <div className="max-w-5xl mx-auto flex justify-end gap-4">
                    <button
                      onClick={onClose}
                      className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitReview}
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-primaryGreen text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {proposalData.review_id ? 'Update Review' : 'Submit Review'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* History Panel */}                   
        <div className="bg-white h-[95vh] w-1/5 max-w-2xl shadow-sm border border-gray-200 flex flex-col rounded-tr-xl rounded-br-xl">

          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">History</h2>
              <p className="text-xs text-gray-400 mt-1">Recent changes of proposal</p>
            </div>

            <button
              onClick={() => {
                setHistory([]);
                setSelectedHistoryData(null);
                onClose();
              }}
              className="p-3 bg-gray-200 rounded-full text-black hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            <div className="space-y-2">
              {loading ? (
                <div className="flex flex-col gap-3 justify-center items-center py-20">
                  <div className="w-10 h-10 border-4 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></div>
                  <p className="text-sm font-light text-gray-500">Loading History</p>
                </div>
              ) : (
                history.map((item) => {
                  const label =
                    item.status === "current"
                      ? "Current Proposal"
                      : `Revise ${item.version_no}`;

                  const formattedDate = new Date(item.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <div
                      key={`${item.history_id}`}
                      onClick={() => fetchHistoryData(item.history_id)}
                      className={`flex items-start gap-3 p-4 rounded-xl transition cursor-pointer ${
                        selectedHistoryData?.history_id === item.history_id
                          ? 'bg-emerald-100 border-2 border-emerald-500'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm font-semibold">
                        V{item.version_no}
                      </div>

                      <div className="flex-1">
                        <p className="text-sm text-gray-700 font-medium">{label}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Proposal ID {item.proposal_id} • {formattedDate}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewerCommentModal;