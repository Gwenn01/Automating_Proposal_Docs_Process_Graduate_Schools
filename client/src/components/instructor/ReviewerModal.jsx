import React from "react";
import { X } from "lucide-react";
import InlineInput from "./inlineInput";
import ReviewerComment from "./ReviewerComment";
import { getStatusStyle } from "../../utils/statusStyles";

const ReviewerModal = ({ isOpen, onClose, proposalData }) => {
  if (!isOpen || !proposalData) return null;
  const rpd = proposalData?.reviews_per_docs;

  if (!rpd) return null;


  // Correct mapping based on actual API structure
  const cover = proposalData.cover_page?.cover_pages || {};
  const content = proposalData.full_content?.content_pages || {};

  const statusStyle = getStatusStyle(proposalData.status);




  console.log("Proposal Data in ReviewerModal:", proposalData);

  const normalized = {
  cover: rpd.cover_page,

  project_profile: rpd.project_profile,

  rationale: {
    content: rpd.rationale?.rationale_content,
    reviews: rpd.rationale?.reviews || [],
  },

  significance: {
    content: rpd.significance?.significance_content,
    reviews: rpd.significance?.reviews || [],
  },

  methodology: {
    content: rpd.methodology?.methodology_content,
    reviews: rpd.methodology?.reviews || [],
  },

  objectives: {
    general: rpd.objectives?.general_content,
    specific: rpd.objectives?.specific_content,
    reviewsGeneral: rpd.objectives?.reviews_general || [],
    reviewsSpecific: rpd.objectives?.reviews_specific || [],
  },

  planOfActivities: {
    content: rpd.plan_of_activities?.plan_of_activities_content,
    reviews: rpd.plan_of_activities?.reviews || [],
  },

  organization: {
    content: rpd.organization_and_staffing?.organization_and_staffing_content,
    reviews: rpd.organization_and_staffing?.reviews || [],
  },

  expectedOutput: {
    content: rpd.expected_output_outcome?.["6ps"],
    reviews: rpd.expected_output_outcome?.reviews || [],
  },

  sustainability: {
    content: rpd.sustainability_plan?.sustainability_plan_content,
    reviews: rpd.sustainability_plan?.reviews || [],
  },

  budget: {
    content: rpd.budgetary_requirement?.budgetary_requirement,
    reviews: rpd.budgetary_requirement?.reviews || [],
  },
};



  return (

    <>

      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-6 animate-overlay-enter">
        
        {/* 4. Apply the Modal Pop-in Animation Class */}
        <div className="bg-white w-full max-w-5xl h-[95vh] rounded-bl-xl rounded-tl-xl shadow-2xl flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="flex justify-between items-center px-8 py-5 border-b bg-primaryGreen text-white">
            {/* <div>
              <h3 className="font-semibold text-xs">Proposal Details</h3>

              <h1 className="text-lg font-bold mb-2">
                {proposalData.title}
              </h1>

              <span
                className={`inline-block px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold ${statusStyle.className}`}
              >
                {statusStyle.label}
              </span>
            </div> */}

            <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none"></div>
            
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-5 bg-white/80 rounded-full"></div>
                <h3 className="font-semibold text-xs uppercase tracking-wider text-emerald-100">
                  Reviewer's Evaluation on Proposal
                </h3>
              </div>

              <h1 className="text-xl font-bold leading-tight text-white drop-shadow-sm">
                {proposalData.title}
              </h1>
            </div>

            {/* <button
              onClick={onClose}
              className="p-2 bg-white rounded-full text-black hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button> */}
          </div>


          {/* Main Content */}
          <div className="p-14 overflow-auto bg-white">


            {/* ========== COVER PAGE SECTION ========== */}
          <section className="max-w-5xl mx-auto px-5 rounded-sm shadow-sm font-sans text-gray-900 leading-relaxed">
              
            <div className="space-y-4 font-normal text-base">
              <div>
                <p className="font-medium">{normalized?.cover.submission_date || "N/A"}</p>
              </div>

              <div className="uppercase ">
                <p className='font-bold'>DR. ROY N. VILLALOBOS</p>
                <p>University President</p>
                <p>President Ramon Magsaysay State University</p>
              </div>

              <p>Dear Sir:</p>

              <p className="">
                      I have the honor to submit the proposal for your consideration and appropriate action 
                for the proposed extension program entitled {normalized?.cover.proposal_summary.program_title || "N/A"}
                ,with the approved budget of {normalized?.cover.proposal_summary.approved_budget?.words || "N/A"}; {normalized?.cover.proposal_summary.approved_budget?.amount || "N/A"} with the duration 
                of {normalized?.cover.proposal_summary.duration?.words || "N/A"} years, {normalized?.cover.proposal_summary.proposal_coverage_period || "N/A"}.
              </p>

              <p>
                This program includes an activity entitled {normalized?.cover.activity_details?.title || "N/A"} on {normalized?.cover.activity_details?.date ? new Date(normalized?.cover.activity_details.date).toLocaleDateString("en-US",{ year: "numeric", month: "long", day: "numeric" }): "N/A"} at {normalized?.cover.activity_details?.venue || "N/A"}. This activity is valuable {normalized?.cover.activity_details?.value_statement || "N/A"}. The requested expenses 
                for this activity from the university is {normalized?.cover.activity_details?.requested_budget || "N/A"}, 
                which will be used to defray expenses for food, transportation, supplies and materials, 
                and other expenses related to these activities.
              </p>

              <p>
                Further, there is {normalized?.cover.participants?.prmsu?.words || "N/A"} ({normalized?.cover.participants?.prmsu?.count || "N/A"}) the total number of participants from PRMSU, 
                another {normalized?.cover.participants?.partner_agency?.words || "N/A"} ({normalized?.cover.participants?.partner_agency?.count || "N/A"}) from the collaborating agency, {normalized?.cover.participants?.partner_agency?.name || "N/A"}, and {normalized?.cover.participants?.trainees?.words || "N/A"} ({normalized?.cover.participants?.trainees?.count || "N/A"}) trainees from the abovementioned community.
              </p>

              <p className="">Your favorable response regarding this matter will be highly appreciated.</p>

              <p className="italic">Prepared by:</p>
              <p className="py-1">Proponent</p>
              <p className="italic">Noted by:</p>

              <div className="">
                <div className="grid grid-cols-2">
                  <div className="">
                    <p className="pt-4">Campus Extension Coordinator	</p>
                    <p className="pt-4 italic">Endorsed by:</p>
                    <p className="pt-4"></p>
                    <p className="pt-1">Campus Director</p>
                    <p className="pt-4 italic">Recommending Approval:</p>
                    <p className="pt-7 font-bold text-[16px]">MARLON JAMES A. DEDICATORIA, Ph.D.</p>
                    <p className="pt-1">Vice-President, Research and Development</p>
                  </div>

                  <div className="">
                    <p className="pt-4">College Dean	</p>
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

          {/* ========== REVIEWER'S COMMENTS (Cover page) ========== */}
          {normalized?.cover.reviews.length > 0 ? (
            normalized?.cover.reviews.map((review, index) => (
              <ReviewerComment
                key={review.review_id || index}
                title={`Reviewer’s Comment ${index + 1}`}
                comment={review.comment}
                reviewerName={review.reviewer_name}
              />
            ))
          ) : (
            <ReviewerComment
              comment=""
              reviewerName=""
            />
          )}





            {/* ========== CONTENT PAGE SECTION ========== */}
            <section>
              <h2 className="text-xl font-bold my-8">I. PROJECT PROFILE</h2>
              {/* ========== I. PROJECT PROFILE ========== */}
              <div className="overflow-x-auto">
                <table className="w-full border border-black text-sm">
                  <tbody>
                    <tr className="border-b border-black">
                      <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                        Program Title:
                      </td>
                      <td className="px-4 py-3">
                        {normalized?.project_profile?.program_title || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b border-black">
                      <td className="border-r border-black px-4 py-3 font-bold text-gray-900">
                        Project Title:
                      </td>
                      <td className="px-4 py-3">
                        {normalized?.project_profile?.project_title || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b border-black">
                      <td className="border-r border-black px-4 py-3 font-bold text-gray-900">
                        Activity Title:
                      </td>
                      <td className="px-4 py-3">
                        {normalized?.project_profile?.activity_title || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b border-black">
                      <td className="border-r border-black px-4 py-3 font-bold text-gray-900">
                        SDG’s
                      </td>
                      <td className="px-4 py-3">
                        {normalized?.project_profile?.sdg_alignment || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b border-black">
                      <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                        Extension Agenda 
                      </td>
                      <td className="px-4 py-3">
                        {normalized?.project_profile?.extension_agenda || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b border-black">
                      <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                        Proponents:  Project Leader
                      </td>
                      <td className="px-4 py-3">
                        {normalized?.project_profile?.proponents?.project_leader || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b border-black">
                      <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                        Members:
                      </td>
                      <td className="px-4 py-3">
                        {normalized?.project_profile?.proponents?.members || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b border-black">
                      <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                        College/Campus/Mandated Program:
                      </td>
                      <td className="px-4 py-3">
                        {normalized?.project_profile?.college_campus_program || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b border-black">
                      <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                        Collaborating Agencies:
                      </td>
                      <td className="px-4 py-3">
                        {normalized?.project_profile?.collaborating_agencies || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b border-black">
                      <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                        Community Location:
                      </td>
                      <td className="px-4 py-3">
                        {normalized?.project_profile?.community_location || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b border-black">
                      <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                        Target Sector:
                      </td>
                      <td className="px-4 py-3">
                        {normalized?.project_profile?.target_sector || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b border-black">
                      <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                        Number of Beneficiaries
                      </td>
                      <td className="px-4 py-3">
                        {normalized?.project_profile?.number_of_beneficiaries || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b border-black">
                      <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                        Period of Implementation/ Duration:
                      </td>
                      <td className="px-4 py-3">
                        {normalized?.project_profile?.implementation_period || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b border-black">
                      <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                        Budgetary Requirements (PhP): 
                      </td>
                      <td className="px-4 py-3">
                        Php {normalized?.project_profile?.budgetary_requirements || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* ========== REVIEWER'S COMMENTS (Project Profile) ========== */}
                {normalized?.project_profile.reviews.length > 0 ? (
                  normalized?.project_profile.reviews.map((review, index) => (
                    <ReviewerComment
                      key={review.review_id || index}
                      title={`Reviewer’s Comment ${index + 1}`}
                      comment={review.comment}
                      reviewerName={review.reviewer_name}
                    />
                  ))
                ) : (
                  <ReviewerComment
                    comment=""
                    reviewerName=""
                  />
                )}

              </div>


              <div className="space-y-6 text-gray-700 leading-relaxed">
                  <div className="">
                      <h3 className="font-bold text-gray-900 pt-10 text-xl ">II. RATIONALE</h3>
                      <p className="text-base mt-3">{normalized?.rationale.content || "N/A"}</p>

                      {/* ========== REVIEWER'S COMMENT ========== */}
                      {/* ========== REVIEWER'S COMMENTS (RATIONALE) ========== */}
                      {normalized?.rationale.reviews.length > 0 ? (
                        normalized?.rationale.reviews.map((review, index) => (
                          <ReviewerComment
                            key={review.review_id || index}
                            title={`Reviewer’s Comment ${index + 1}`}
                            comment={review.comment}
                            reviewerName={review.reviewer_name}
                          />
                        ))
                      ) : (
                        <ReviewerComment
                          comment=""
                          reviewerName=""
                        />
                      )}

                  </div>
                  
                  <div>
                      <h3 className="font-bold text-gray-900 pt-5 text-xl ">III. SIGNIFICANCE</h3>
                      <p className="text-base mt-3">{normalized?.significance.content || "N/A"}</p>

                        {/* ========== REVIEWER'S COMMENTS (SIGNIFICANCE) ========== */}
                        {normalized?.significance.reviews.length > 0 ? (
                          normalized?.significance.reviews.map((review, index) => (
                            <ReviewerComment
                              key={review.review_id || index}
                              title={`Reviewer’s Comment ${index + 1}`}
                              comment={review.comment}
                              reviewerName={review.reviewer_name}
                            />
                          ))
                        ) : (
                          <ReviewerComment
                            comment=""
                            reviewerName=""
                          />
                        )}
                  </div>

                  {/* OBJECTIVES */}
                  <div className="">
                      <h3 className="font-bold text-gray-900 pt-5 text-xl ">IV. OBJECTIVES</h3>
                      <p className="text-base font-semibold mb-2 mt-3"> General Objectives</p>
                      <p className="p-5 bg-gray-100">{normalized?.objectives?.general || "N/A"}</p>

                    {/* ========== REVIEWER'S COMMENTS (GENERAL OBJECTIVES) ========== */}
                      {normalized?.objectives.reviewsGeneral.length > 0 ? (
                        normalized?.objectives.reviewsGeneral.map((review, index) => (
                          <ReviewerComment
                            key={review.review_id || index}
                            title={`Reviewer’s Comment ${index + 1}`}
                            comment={review.comment}
                            reviewerName={review.reviewer_name}
                          />
                        ))
                      ) : (
                        <ReviewerComment
                          comment=""
                          reviewerName=""
                        />
                      )}
                      <p className="text-base font-semibold mb-2 mt-3">Specific Objectives</p>
                      <p className="p-5 bg-gray-100">{normalized?.objectives?.specific || "N/A"}</p>

                      {/* ========== REVIEWER'S COMMENTS (SPECIFIC OBJECTIVES) ========== */}
                      {normalized?.objectives.reviewsGeneral.length > 0 ? (
                        normalized?.objectives.reviewsGeneral.map((review, index) => (
                          <ReviewerComment
                            key={review.review_id || index}
                            title={`Reviewer’s Comment ${index + 1}`}
                            comment={review.comment}
                            reviewerName={review.reviewer_name}
                          />
                        ))
                      ) : (
                        <ReviewerComment
                          comment=""
                          reviewerName=""
                        />
                      )}
                  </div>

                  <div className="">
                      <h3 className="font-bold text-gray-900 pt-10 text-xl ">V. METHODOLOGY</h3>
                      <p className="text-base mt-3">{normalized?.methodology.content || "N/A"}</p>

                      {/* ========== REVIEWER'S COMMENTS (METHODOLOGY) ========== */}
                      {normalized?.methodology.reviews.length > 0 ? (
                        normalized?.methodology.reviews.map((review, index) => (
                          <ReviewerComment
                            key={review.review_id || index}
                            title={`Reviewer’s Comment ${index + 1}`}
                            comment={review.comment}
                            reviewerName={review.reviewer_name}
                          />
                        ))
                      ) : (
                        <ReviewerComment
                          comment=""
                          reviewerName=""
                        />
                      )}
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
                              {normalized?.expectedOutput?.content?.publications || "N/A"}
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="border-r border-black px-4 py-3 font-bold text-gray-900">
                              Patents/IP
                            </td>
                            <td className="px-4 py-3">
                              {normalized?.expectedOutput?.content?.patents || "N/A"}
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="border-r border-black px-4 py-3 font-bold text-gray-900">
                              Products
                            </td>
                            <td className="px-4 py-3">
                              {normalized?.expectedOutput?.content?.products || "N/A"}
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                              People Services 
                            </td>
                            <td className="px-4 py-3">
                              {normalized?.expectedOutput?.content?.people_services || "N/A"}
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                              Places and Partnerships
                            </td>
                            <td className="px-4 py-3">
                              {normalized?.expectedOutput?.content?.places_partnerships || "N/A"}
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                              Policy
                            </td>
                            <td className="px-4 py-3">
                              {normalized?.expectedOutput?.content?.policy || "N/A"}
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                              Social Impact
                            </td>
                            <td className="px-4 py-3">
                              {normalized?.expectedOutput?.content?.social_impact || "N/A"}
                            </td>
                          </tr>

                          <tr className="border-b border-black">
                            <td className="w-1/4 border-r border-black px-4 py-3 font-bold text-gray-900">
                              Economic Impact
                            </td>
                            <td className="px-4 py-3">
                              {normalized?.expectedOutput?.content?.economic_impact || "N/A"}
                            </td>
                          </tr>

                        </tbody>
                      </table>

                      {/* ========== REVIEWER'S COMMENTS (EXPECTED OUTPUT) ========== */}
                      {normalized?.expectedOutput.reviews.length > 0 ? (
                        normalized?.expectedOutput.reviews.map((review, index) => (
                          <ReviewerComment
                            key={review.review_id || index}
                            title={`Reviewer’s Comment ${index + 1}`}
                            comment={review.comment}
                            reviewerName={review.reviewer_name}
                          />
                        ))
                      ) : (
                        <ReviewerComment
                          comment=""
                          reviewerName=""
                        />
                      )}

                  </div>

                  <div className="">
                      <h3 className="font-bold text-gray-900 pt-10 text-xl ">VII. SUSTAINABILITY PLAN</h3>
                      <p className="text-base mt-3">{normalized?.sustainability.content || "N/A"}</p>

                      {/* ========== REVIEWER'S COMMENTS (SUSTAINABILITY PLAN) ========== */}
                      {normalized?.sustainability.reviews.length > 0 ? (
                        normalized?.sustainability.reviews.map((review, index) => (
                          <ReviewerComment
                            key={review.review_id || index}
                            title={`Reviewer’s Comment ${index + 1}`}
                            comment={review.comment}
                            reviewerName={review.reviewer_name}
                          />
                        ))
                      ) : (
                        <ReviewerComment
                          comment=""
                          reviewerName=""
                        />
                      )}
                  </div>

                  <div className="">
                      <h3 className="font-bold text-gray-900 pt-10 text-xl mb-5">VIII. ORGANIZATION AND STAFFING <span className="text-base italic font-semibold">(Persons involved and responsibility) </span></h3>

                      <table className="w-full border border-black text-sm">
                        <tbody>
                          {/* TABLE HEADER */}
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

                          {/* TABLE BODY */}
                          {normalized?.organization?.content.length > 0 ? (
                            normalized?.organization?.content.map((item, index) => (
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

                      {/* ========== REVIEWER'S COMMENTS (ORGANIZATION AND STAFFING) ========== */}
                      {normalized?.organization.reviews.length > 0 ? (
                        normalized?.organization.reviews.map((review, index) => (
                          <ReviewerComment
                            key={review.review_id || index}
                            title={`Reviewer’s Comment ${index + 1}`}
                            comment={review.comment}
                            reviewerName={review.reviewer_name}
                          />
                        ))
                      ) : (
                        <ReviewerComment
                          comment=""
                          reviewerName=""
                        />
                      )}

                  </div>

                  <div className="">
                      <h3 className="font-bold text-gray-900 pt-10 text-xl ">IX. PLAN OF ACTIVITIES</h3>
                      <p className="text-xl font-bold mt-3 text-center">{normalized?.planOfActivities?.content.activity_title || "N/A"}</p>
                      <p className="text-lg mt-3 text-center">
                        {normalized?.planOfActivities?.content.activity_date
                          ? new Date(normalized?.planOfActivities?.content.activity_date).toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "long", day: "numeric" }
                            )
                          : "N/A"}
                      </p>

                      <p className="text-lg mt-2 mb-5 text-center font-semibold">PROGRAMME</p>

                      <table className="w-full border border-black text-sm">
                        <tbody>
                          {/* TABLE HEADER */}
                          <tr className="border-b border-black">
                            <td className="w-1/5 border-r border-black px-4 py-3 text-center font-bold">
                              Time
                            </td>
                            <td className="w-1/3 border-r border-black px-4 py-3 text-center font-bold">
                              Part of the program
                            </td>
                          </tr>

                          {/* TABLE BODY */}
                          {normalized?.planOfActivities?.content.schedule.length > 0 ? (
                            normalized?.planOfActivities?.content.schedule.map((item, index) => (
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
                              <td colSpan={3} className="text-center px-4 py-3 text-gray-500">
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                      {/* ========== REVIEWER'S COMMENTS (PLAN OF ACTIVITIES) ========== */}
                      {normalized?.planOfActivities.reviews.length > 0 ? (
                        normalized?.planOfActivities.reviews.map((review, index) => (
                          <ReviewerComment
                            key={review.review_id || index}
                            title={`Reviewer’s Comment ${index + 1}`}
                            comment={review.comment}
                            reviewerName={review.reviewer_name}
                          />
                        ))
                      ) : (
                        <ReviewerComment
                          comment=""
                          reviewerName=""
                        />
                      )}

                  </div>

                  <div className="">
                      <h3 className="font-bold text-gray-900 pt-10 text-xl ">XI. BUDGETARY REQUIREMENT </h3>
                        <table className="w-full border border-black text-sm mt-6">
                          <tbody>

                            {/* TABLE HEADER */}
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
                            {normalized?.budget?.content.meals.map((row, index) => (
                              <tr key={`meals-${index}`} className="border-b border-black">
                                <td className="border-r border-black px-4 py-3">Meals</td>
                                <td className="border-r border-black px-4 py-3">{row.item}</td>
                                <td className="border-r border-black px-4 py-3 text-right">₱ {row.cost}</td>
                                <td className="border-r border-black px-4 py-3 text-right">{row.qty}</td>
                                <td className="px-4 py-3 text-right">₱ {row.amount}</td>
                              </tr>
                            ))} 

                            {/* TRANSPORT */}
                            {normalized?.budget?.content.transport?.map((row, index) => (
                              <tr key={`transport-${index}`} className="border-b border-black">
                                <td className="border-r border-black px-4 py-3">Transport</td>
                                <td className="border-r border-black px-4 py-3">{row.item}</td>
                                <td className="border-r border-black px-4 py-3 text-right">₱ {row.cost}</td>
                                <td className="border-r border-black px-4 py-3 text-right">{row.qty}</td>
                                <td className="px-4 py-3 text-right">₱ {row.amount}</td>
                              </tr>
                            ))}

                            {/* SUPPLIES */}
                            {normalized?.budget?.content.supplies?.map((row, index) => (
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
                      {/* ========== REVIEWER'S COMMENTS (BUDGET) ========== */}
                      {normalized?.budget.reviews.length > 0 ? (
                        normalized?.budget.reviews.map((review, index) => (
                          <ReviewerComment
                            key={review.review_id || index}
                            title={`Reviewer’s Comment ${index + 1}`}
                            comment={review.comment}
                            reviewerName={review.reviewer_name}
                          />
                        ))
                      ) : (
                        <ReviewerComment
                          comment=""
                          reviewerName=""
                        />
                      )}
                  </div>

                  <div className="py-4">
                  <p className="italic my-3">Prepared by:</p>
                    <p className="py-1 mb-2">Proponent</p>
                    <p className="italic">Noted by:</p>

                    <div className="">
                      <div className="grid grid-cols-2">
                        <div className="">
                          <p className="pt-4">Campus Extension Coordinator	</p>
                          <p className="pt-4 italic">Endorsed by:</p>
                          <p className="pt-4"></p>
                          <p className="pt-1">Campus Director</p>
                          <p className="pt-4 italic">Recommending Approval:</p>
                          <p className="pt-7 font-bold text-[16px]">MARLON JAMES A. DEDICATORIA, Ph.D.</p>
                          <p className="pt-1">Vice-President, Research and Development</p>
                        </div>

                        <div className="">
                          <p className="pt-4">College Dean	</p>
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
          </div>
        </div>

        {/*History */}                   
        <div className="bg-white h-[95vh] w-1/5 max-w-2xl shadow-sm border border-gray-200 flex flex-col rounded-tr-xl rounded-br-xl">
  
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">History</h2>
              <p className="text-xs text-gray-400 mt-1">Recent changes of proposal</p>
            </div>

            <button
              onClick={onClose}
              className="p-3 bg-gray-200 rounded-full text-black hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          
          {/* Row */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm font-semibold">
              JD
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 font-medium">
                Proposal submitted
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Extension Program • 2 hours ago
              </p>
            </div>
          </div>

          {/* Row */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-semibold">
              MK
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 font-medium">
                Review approved
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Community Outreach • Yesterday
              </p>
            </div>
          </div>

          {/* Row */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-semibold">
              AR
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 font-medium">
                Document updated
              </p>
              <p className="text-xs text-gray-400 mt-1">
                GAD Report • 3 days ago
              </p>
            </div>
          </div>

          {/* Row */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-semibold">
              LS
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 font-medium">
                Comment added
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Proposal Review • 1 week ago
              </p>
            </div>
          </div>

        </div>
      </div>

      </div>
    </>
  );
};

export default ReviewerModal;