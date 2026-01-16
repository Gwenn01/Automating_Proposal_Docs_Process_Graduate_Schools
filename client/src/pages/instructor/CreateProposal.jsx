import React, { useState, useRef, useEffect } from 'react';
import { InlineInput } from '../../components';

  const InputField = ({ label, value, onChange, type = "text" }) => (
    <div className="mb-6">
      <label className="block text-xl font-semibold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-gray-100 rounded-sm"
      />
    </div>
  );

  const TextAreaField = ({ label, value, onChange, rows = 6 }) => (
    <div>
      <label className="block text-md font-semibold mb-2">{label}</label>
      <textarea 
        rows={rows}
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-gray-100 border-none rounded-sm focus:ring-2 focus:ring-green-600 outline-none"
      />
    </div>
  );


const CreateProposal = () => {
  const [proposalId, setProposalId] = useState(null);
  const [userId] = useState(1); // Replace with actual user ID from auth context
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [rows, setRows] = useState({
    meals: [],
    transport: [],
    supplies: [],
  });

  const [cover, setCover] = useState({
    submission_date: "",
    board_resolution_title: "",
    board_resolution_no: "",
    approved_budget_words: "",
    approved_budget_amount: "",
    duration_words: "",
    duration_years: "",
    date_from_to: "",
    activity_title: "",
    activity_date: "",
    activity_venue: "",
    activity_value_statement: "",
    requested_activity_budget: "",
    prmsu_participants_words: "",
    prmsu_participants_num: "",
    partner_agency_participants_words: "",
    partner_agency_participants_num: "",
    partner_agency_name: "",
    trainees_words: "",
    trainees_num: ""
  });

  const [content, setContent] = useState({
    program_title: "",
    project_title: "",
    activity_title: "",
    sdg_alignment: "",
    extension_agenda: "",
    project_leader: "",
    members: "",
    college_campus_program: "",
    collaborating_agencies: "",
    community_location: "",
    target_sector: "",
    number_of_beneficiaries: "",
    implementation_period: "",
    total_budget_requested: "",
    rationale: "",
    significance: "",
    general_objectives: "",
    specific_objectives: "",
    methodology: "",
    expected_output_6ps: {
      publications: "",
      patents: "",
      products: "",
      people_services: "",
      places_partnerships: "",
      policy: "",
      social_impact: "",
      economic_impact: ""
    },
    sustainability_plan: "",
    org_and_staffing_json: [
      { activity: "Proposal Preparation", designation: "", terms: "" },
      { activity: "Program/Certificates", designation: "", terms: "" },
      { activity: "Food Preparation", designation: "", terms: "" },
      { activity: "Resource Speakers", designation: "", terms: "" }
    ],
    activity_schedule_json: [],
    prmsu_participants_count: "",
    partner_agency_participants_count: "",
    trainees_count: ""
  });

  const [activeTab, setActiveTab] = useState('program');

  const handleChange = (category, index, field, value) => {
    const updated = [...rows[category]];
    updated[index][field] = value;

    if (field === "cost" || field === "qty") {
      const cost = Number(updated[index].cost) || 0;
      const qty = Number(updated[index].qty) || 0;
      updated[index].amount = cost * qty;
    }

    setRows({ ...rows, [category]: updated });
  };

  const addRow = (category) => {
    setRows({
      ...rows,
      [category]: [...rows[category], { item: "", cost: "", qty: "", amount: "" }],
    });
  };

  const totalAmount = (category) =>
    rows[category].reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

  const renderRows = (category) =>
    rows[category].map((row, i) => (
      <tr key={i} className="h-10">
        <td className="pl-4">
          <input
            className="w-full bg-transparent border-b outline-none"
            value={row.item}
            onChange={(e) => handleChange(category, i, "item", e.target.value)}
          />
        </td>
        <td>
          <input
            type="number"
            className="w-24 bg-transparent border-b outline-none"
            value={row.cost}
            onChange={(e) => handleChange(category, i, "cost", e.target.value)}
          />
        </td>
        <td>
          <input
            type="number"
            className="w-24 bg-transparent border-b outline-none"
            value={row.qty}
            onChange={(e) => handleChange(category, i, "qty", e.target.value)}
          />
        </td>
        <td>
          <input
            readOnly
            className="w-24 bg-gray-100 border-b outline-none"
            value={row.amount}
          />
        </td>
      </tr>
    ));

  // Helper function to convert empty strings to null
  const cleanData = (obj) => {
    const cleaned = {};
    for (const key in obj) {
      if (obj[key] === "") {
        cleaned[key] = null;
      } else {
        cleaned[key] = obj[key];
      }
    }
    return cleaned;
  };

  const handleSubmit = async () => {
    // Validation: Check if title is filled
    if (!title || title.trim() === '') {
      alert('Please enter a proposal title before submitting.');
      return;
    }

    setIsSubmitting(true);
    
    const API_BASE_URL = 'http://127.0.0.1:5000/api';
    
    try {
      // Step 1: Create the proposal first
      let currentProposalId = proposalId;
      
      if (!currentProposalId) {
        const proposalResponse = await fetch(`${API_BASE_URL}/create-proposal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            title: title.trim(),
            file_path: null
          })
        });

        if (!proposalResponse.ok) {
          const errorData = await proposalResponse.json();
          console.error('Proposal creation error:', errorData);
          throw new Error(errorData.error || 'Failed to create proposal');
        }

        const proposalData = await proposalResponse.json();
        currentProposalId = proposalData.proposal_id;
        setProposalId(currentProposalId);
      }

      // Step 2: Update cover page (convert empty strings to null)
      const cleanedCover = cleanData(cover);
      const coverResponse = await fetch(`${API_BASE_URL}/cover/${currentProposalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedCover)
      });

      if (!coverResponse.ok) {
        const errorData = await coverResponse.json();
        console.error('Cover page error:', errorData);
        throw new Error(errorData.error || 'Failed to update cover page');
      }

      // Step 3: Prepare budget breakdown JSON
      const budgetBreakdown = {
        meals: rows.meals,
        transport: rows.transport,
        supplies: rows.supplies,
        totals: {
          meals: totalAmount('meals'),
          transport: totalAmount('transport'),
          supplies: totalAmount('supplies'),
          grand_total: totalAmount('meals') + totalAmount('transport') + totalAmount('supplies')
        }
      };

      // Step 4: Update content with budget breakdown (convert empty strings to null)
      const cleanedContent = cleanData(content);
      const contentData = {
        ...cleanedContent,
        expected_output_6ps: JSON.stringify(content.expected_output_6ps),
        org_and_staffing_json: JSON.stringify(content.org_and_staffing_json),
        activity_schedule_json: JSON.stringify(content.activity_schedule_json),
        budget_breakdown_json: JSON.stringify(budgetBreakdown),
        social_impact: content.expected_output_6ps.social_impact || null,
        economic_impact: content.expected_output_6ps.economic_impact || null
      };

      const contentResponse = await fetch(`${API_BASE_URL}/content/${currentProposalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentData)
      });

      if (!contentResponse.ok) {
        const errorData = await contentResponse.json();
        console.error('Content error:', errorData);
        throw new Error(errorData.error || 'Failed to update proposal content');
      }

      alert('Proposal submitted successfully!');
      
      // Optionally redirect or reset form
      // window.location.href = '/proposals';
      
    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="bg-white p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <h1 className="text-3xl font-bold mb-8 text-black">Create Proposal</h1>

        <div className="flex flex-wrap gap-4 mb-10">
          <button 
            onClick={() => setActiveTab('program')}
            className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === 'program' ? 'bg-green-700 text-white' : 'bg-green-600/20 text-green-800 hover:bg-green-600/30'}`}
          >
            Program Proposal
          </button>
          <button 
            onClick={() => setActiveTab('iba')}
            className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === 'iba' ? 'bg-green-700 text-white' : 'bg-green-600/20 text-green-800 hover:bg-green-600/30'}`}
          >
            Activity Proposal Iba Main
          </button>
          <button 
            onClick={() => setActiveTab('satellite')}
            className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === 'satellite' ? 'bg-green-700 text-white' : 'bg-green-600/20 text-green-800 hover:bg-green-600/30'}`}
          >
            Activity Proposal Satellite Campus
          </button>
        </div>

        <div className="space-y-8">
          
          <InputField 
            label="Title:"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <section className="max-w-5xl mx-auto bg-white rounded-sm shadow-sm font-sans text-gray-900 leading-relaxed">
            <h2 className="text-2xl font-bold mb-6">Cover Page:</h2>
            
            <div className="space-y-6 text-sm">
              <div>
                <InlineInput
                  placeholder="DATE"
                  value={cover.submission_date}
                  onChange={(e) =>
                    setCover({ ...cover, submission_date: e.target.value })
                  }
                />
              </div>

              <div className="uppercase ">
                <p className='font-bold'>DR. ROY N. VILLALOBOS</p>
                <p>University President</p>
                <p>President Ramon Magsaysay State University</p>
              </div>

              <p>Dear Sir:</p>

              <p>
                I have the honor to submit the proposal for your consideration and appropriate action 
                for the proposed extension program entitled 
                <InlineInput placeholder="(Title referring to approved Board Reso)" width="w-72"
                  value={cover.board_resolution_title}
                  onChange={(e) =>
                    setCover({ ...cover, board_resolution_title: e.target.value })
                  }
                />, 
                with the approved budget of <InlineInput placeholder="____(Total amount in words)" 
                  value={cover.approved_budget_words}
                  onChange={(e) =>
                    setCover({ ...cover, approved_budget_words: e.target.value })
                  }          
                /> ; 
                (<InlineInput placeholder="(Total amount in numbers)" width="w-40" 
                  value={cover.approved_budget_amount}
                  onChange={(e) =>
                    setCover({ ...cover, approved_budget_amount: e.target.value })
                  }
                />) with the duration 
                of <InlineInput placeholder="____in words (in numbers)" width="w-40" 
                  value={cover.duration_words}
                  onChange={(e) =>
                    setCover({ ...cover, duration_words: e.target.value })
                  }          
                /> years, 
                <InlineInput placeholder="(date from-to). (please refer to the approved Board Reso)" width="w-80" 
                  value={cover.date_from_to}
                  onChange={(e) =>
                    setCover({ ...cover, date_from_to: e.target.value })
                  }          
                />.
              </p>

              <p>
                This program includes an activity entitled (
                <InlineInput placeholder="activity title under the program" width="w-64" 
                  value={cover.activity_title}
                  onChange={(e) =>
                    setCover({ ...cover, activity_title: e.target.value })
                  }          
                />) on 
                <InlineInput placeholder="___date" width="w-24" 
                  value={cover.activity_date}
                  onChange={(e) =>
                    setCover({ ...cover, activity_date: e.target.value })
                  }          
                /> at 
                <InlineInput placeholder="___ venue" width="w-32" 
                  value={cover.activity_venue}
                  onChange={(e) =>
                    setCover({ ...cover, activity_venue: e.target.value })
                  }          
                />. This activity is valuable 
                <InlineInput placeholder="____for what" width="w-24" 
                  value={cover.activity_value_statement}
                  onChange={(e) =>
                    setCover({ ...cover, activity_value_statement: e.target.value })
                  }          
                />. The requested expenses 
                for this activity from the university is Php 
                <InlineInput placeholder="____(Total amount in numbers)" width="w-48" 
                  value={cover.requested_activity_budget}
                  onChange={(e) =>
                    setCover({ ...cover, requested_activity_budget: e.target.value })
                  }          
                />, 
                which will be used to defray expenses for food, transportation, supplies and materials, 
                and other expenses related to these activities.
              </p>

              <p>
                Further, there is <InlineInput placeholder="____number of participants in words" 
                  value={cover.prmsu_participants_words}
                  onChange={(e) =>
                    setCover({ ...cover, prmsu_participants_words: e.target.value })
                  }          
                /> 
                (<InlineInput placeholder="number of participants in numbers" 
                  value={cover.prmsu_participants_num}
                  onChange={(e) =>
                    setCover({ ...cover, prmsu_participants_num: e.target.value })
                  }          
                /> ) the total number of participants from PRMSU, 
                another <InlineInput placeholder="____ total number from partner agency in words" 
                  value={cover.partner_agency_participants_words}
                  onChange={(e) =>
                    setCover({ ...cover, partner_agency_participants_words: e.target.value })
                  }          
                /> 
                (<InlineInput placeholder="total number from partner agency in numbers" 
                  value={cover.partner_agency_participants_num}
                  onChange={(e) =>
                    setCover({ ...cover, partner_agency_participants_num: e.target.value })
                  }          
                /> ) from the collaborating agency, 
                <InlineInput placeholder="_____(agency name)" width="w-40" 
                  value={cover.partner_agency_name}
                  onChange={(e) =>
                    setCover({ ...cover, partner_agency_name: e.target.value })
                  }          
                />, and 
                <InlineInput placeholder="____ total number of trainees in words" 
                  value={cover.trainees_words}
                  onChange={(e) =>
                    setCover({ ...cover, trainees_words: e.target.value })
                  }          
                /> 
                ( <InlineInput placeholder="total number of trainees in numbers" 
                  value={cover.trainees_num}
                  onChange={(e) =>
                    setCover({ ...cover, trainees_num: e.target.value })
                  }          
                /> ) trainees from the abovementioned community.
              </p>

              <p className="pt-4">Your favorable response regarding this matter will be highly appreciated.</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4">I. Program/Project Profile:</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-48 text-sm font-semibold">Program Title:</span>
                <input 
                  className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:ring-2 focus:ring-green-600" 
                  value={content.program_title}
                  onChange={(e) => setContent({...content, program_title: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-48 text-sm font-semibold">Project Title:</span>
                <input 
                  className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:ring-2 focus:ring-green-600" 
                  value={content.project_title}
                  onChange={(e) => setContent({...content, project_title: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-48 text-sm font-semibold">Activity Title:</span>
                <input 
                  className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:ring-2 focus:ring-green-600" 
                  value={content.activity_title}
                  onChange={(e) => setContent({...content, activity_title: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-48 text-sm font-semibold">SDG's:</span>
                <input 
                  className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:ring-2 focus:ring-green-600" 
                  value={content.sdg_alignment}
                  onChange={(e) => setContent({...content, sdg_alignment: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-48 text-sm font-semibold">Extension Agenda:</span>
                <input 
                  className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:ring-2 focus:ring-green-600" 
                  value={content.extension_agenda}
                  onChange={(e) => setContent({...content, extension_agenda: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-48 text-sm font-semibold">Proponents: Leader:</span>
                <input 
                  className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:ring-2 focus:ring-green-600" 
                  value={content.project_leader}
                  onChange={(e) => setContent({...content, project_leader: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-48 text-sm font-semibold">Proponents: Members:</span>
                <input 
                  className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:ring-2 focus:ring-green-600" 
                  value={content.members}
                  onChange={(e) => setContent({...content, members: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-48 text-sm font-semibold">College/Campus/Mandated Program:</span>
                <input 
                  className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:ring-2 focus:ring-green-600" 
                  value={content.college_campus_program}
                  onChange={(e) => setContent({...content, college_campus_program: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-48 text-sm font-semibold">Collaborating Agencies:</span>
                <input 
                  className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:ring-2 focus:ring-green-600" 
                  value={content.collaborating_agencies}
                  onChange={(e) => setContent({...content, collaborating_agencies: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-48 text-sm font-semibold">Community Location:</span>
                <input 
                  className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:ring-2 focus:ring-green-600" 
                  value={content.community_location}
                  onChange={(e) => setContent({...content, community_location: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-48 text-sm font-semibold">Target Sector:</span>
                <input 
                  className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:ring-2 focus:ring-green-600" 
                  value={content.target_sector}
                  onChange={(e) => setContent({...content, target_sector: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-48 text-sm font-semibold">Number of Beneficiaries:</span>
                <input 
                  className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:ring-2 focus:ring-green-600" 
                  value={content.number_of_beneficiaries}
                  onChange={(e) => setContent({...content, number_of_beneficiaries: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-48 text-sm font-semibold">Period of Implementation/Duration:</span>
                <input 
                  className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:ring-2 focus:ring-green-600" 
                  value={content.implementation_period}
                  onChange={(e) => setContent({...content, implementation_period: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-48 text-sm font-semibold">Budgetary Requirements (PhP):</span>
                <input 
                  className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:ring-2 focus:ring-green-600" 
                  value={content.total_budget_requested}
                  onChange={(e) => setContent({...content, total_budget_requested: e.target.value})}
                />
              </div>
            </div>
          </section>

          <div>
            <h3 className="text-xl font-bold mb-4">II. Rationale</h3>
            <TextAreaField 
              label="" 
              value={content.rationale}
              onChange={(e) => setContent({...content, rationale: e.target.value})}
            />
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">III. Significance</h3>
            <TextAreaField 
              label="" 
              value={content.significance}
              onChange={(e) => setContent({...content, significance: e.target.value})}
            />
          </div>

          <div>
            <h2 className='font-bold text-xl'>IV. Objectives</h2>
            <div className='px-5 mt-5'>
              <TextAreaField 
                label="General Objectives:" 
                value={content.general_objectives}
                onChange={(e) => setContent({...content, general_objectives: e.target.value})}
              />
            </div>
            <div className='px-5'>
              <TextAreaField 
                label="Specific Objectives:" 
                value={content.specific_objectives}
                onChange={(e) => setContent({...content, specific_objectives: e.target.value})}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">V. Methodology</h3>
            <TextAreaField 
              label="" 
              value={content.methodology}
              onChange={(e) => setContent({...content, methodology: e.target.value})}
            />
          </div>

          <section>
            <label className="block text-xl font-bold text-gray-800 mb-4">VI. Expected Output/Outcome:</label>
            <table className="w-full border-collapse bg-gray-50">
              <thead>
                <tr className="text-left text-sm font-bold">
                  <th className="p-3">6Ps</th>
                  <th className="p-3">Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white">
                <tr>
                  <td className="p-3 text-sm font-medium w-1/3">Publications</td>
                  <td className="p-1">
                    <input 
                      className="w-full bg-gray-200/80 p-2 outline-none focus:ring-2 focus:ring-green-600" 
                      value={content.expected_output_6ps.publications}
                      onChange={(e) => setContent({...content, expected_output_6ps: {...content.expected_output_6ps, publications: e.target.value}})}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-sm font-medium w-1/3">Patents/IP</td>
                  <td className="p-1">
                    <input 
                      className="w-full bg-gray-200/80 p-2 outline-none focus:ring-2 focus:ring-green-600" 
                      value={content.expected_output_6ps.patents}
                      onChange={(e) => setContent({...content, expected_output_6ps: {...content.expected_output_6ps, patents: e.target.value}})}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-sm font-medium w-1/3">Products</td>
                  <td className="p-1">
                    <input 
                      className="w-full bg-gray-200/80 p-2 outline-none focus:ring-2 focus:ring-green-600" 
                      value={content.expected_output_6ps.products}
                      onChange={(e) => setContent({...content, expected_output_6ps: {...content.expected_output_6ps, products: e.target.value}})}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-sm font-medium w-1/3">People Services</td>
                  <td className="p-1">
                    <input 
                      className="w-full bg-gray-200/80 p-2 outline-none focus:ring-2 focus:ring-green-600" 
                      value={content.expected_output_6ps.people_services}
                      onChange={(e) => setContent({...content, expected_output_6ps: {...content.expected_output_6ps, people_services: e.target.value}})}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-sm font-medium w-1/3">Places and Partnerships</td>
                  <td className="p-1">
                    <input 
                      className="w-full bg-gray-200/80 p-2 outline-none focus:ring-2 focus:ring-green-600" 
                      value={content.expected_output_6ps.places_partnerships}
                      onChange={(e) => setContent({...content, expected_output_6ps: {...content.expected_output_6ps, places_partnerships: e.target.value}})}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-sm font-medium w-1/3">Policy</td>
                  <td className="p-1">
                    <input 
                      className="w-full bg-gray-200/80 p-2 outline-none focus:ring-2 focus:ring-green-600" 
                      value={content.expected_output_6ps.policy}
                      onChange={(e) => setContent({...content, expected_output_6ps: {...content.expected_output_6ps, policy: e.target.value}})}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-sm font-medium w-1/3">Social Impact</td>
                  <td className="p-1">
                    <input 
                      className="w-full bg-gray-200/80 p-2 outline-none focus:ring-2 focus:ring-green-600" 
                      value={content.expected_output_6ps.social_impact}
                      onChange={(e) => setContent({...content, expected_output_6ps: {...content.expected_output_6ps, social_impact: e.target.value}})}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-sm font-medium w-1/3">Economic Impact</td>
                  <td className="p-1">
                    <input 
                      className="w-full bg-gray-200/80 p-2 outline-none focus:ring-2 focus:ring-green-600" 
                      value={content.expected_output_6ps.economic_impact}
                      onChange={(e) => setContent({...content, expected_output_6ps: {...content.expected_output_6ps, economic_impact: e.target.value}})}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <div>
            <h3 className="text-xl font-bold mb-4">VII. Sustainability Plan</h3>
            <textarea 
              rows={12}
              className="w-full p-3 bg-gray-100 border-none rounded-sm focus:ring-2 focus:ring-green-600 outline-none"
              value={content.sustainability_plan}
              onChange={(e) => setContent({...content, sustainability_plan: e.target.value})}
            />
          </div>

          <div>
            <section>
              <h2 className="text-xl font-bold mb-6">
                VIII. Organization and Staffing <span className="italic text-md font-normal text-gray-600">(Persons involved and responsibility):</span>
              </h2>
              <div className="bg-gray-50 p-6 rounded-sm">
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm font-bold border-b pb-2">
                  <div>Activity's</div>
                  <div>Designation/Name</div>
                  <div>Terms of Reference</div>
                </div>
                
                {content.org_and_staffing_json.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200 last:border-0">
                    <div className="text-sm font-medium self-center">{item.activity}</div>
                    <textarea 
                      placeholder="Full name of faculty. Include also the non-teaching (INSERT THE Plantilla)"
                      className="bg-gray-200 p-2 text-xs h-20 resize-none outline-none focus:ring-1 focus:ring-blue-400"
                      value={item.designation}
                      onChange={(e) => {
                        const updated = [...content.org_and_staffing_json];
                        updated[index].designation = e.target.value;
                        setContent({...content, org_and_staffing_json: updated});
                      }}
                    />
                    <textarea 
                      placeholder="Full name of faculty. Include also the non-teaching (INSERT THE Plantilla)"
                      className="bg-gray-200 p-2 text-xs h-20 resize-none outline-none focus:ring-1 focus:ring-blue-400"
                      value={item.terms}
                      onChange={(e) => {
                        const updated = [...content.org_and_staffing_json];
                        updated[index].terms = e.target.value;
                        setContent({...content, org_and_staffing_json: updated});
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold">IX. Plan of Activities:</h2>

              <div className="max-w-4xl mx-auto p-8 rounded-sm">
                <div className="text-center mb-8">
                  <p className="font-bold text-lg mb-1">Activity Title</p>
                  <span className="bg-red-100 text-red-600 px-4 py-1 text-xs font-bold rounded">Date</span>
                </div>

                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-4 w-1/3">
                        <span className="bg-red-100 text-red-600 px-2 py-1 text-xs font-bold rounded">Time</span>
                      </th>
                      <th className="pb-4">
                        <span className="bg-red-100 text-red-600 px-2 py-1 text-xs font-bold rounded">Part of the Program</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-transparent">
                      <td className="py-3 align-top">7:30–8:00 AM</td>
                      <td className="py-3 font-bold">Registration</td>
                    </tr>
                    <tr className="border-b border-transparent">
                      <td className="py-3 align-top">8:00–8:05 AM</td>
                      <td className="py-3 font-bold">Invocation–AV Presentation</td>
                    </tr>
                    <tr className="border-b border-transparent">
                      <td className="py-3 align-top">8:20–8:45 AM</td>
                      <td className="py-3">
                        <p className="font-bold">Opening Remarks</p>
                        <p className="text-gray-500 text-xs">Dr. Roy N. Villalobos, University President</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 align-top">8:45–9:00 AM</td>
                      <td className="py-3">
                        <div className="rounded-sm inline-block w-full">
                          <p className="font-bold">Welcome Remarks (Head of Partner Agency)</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 align-top">9:00 AM–12:00 NOON</td>
                      <td className="py-3">
                        <div className="p-2 rounded-sm inline-block w-full">
                          <p className="font-bold text-red-600">Training/Lecture Name</p>
                          <p className="text-red-600 text-xs">Resource Speaker</p>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-transparent">
                      <td className="py-3 align-top">12:00-1:00 PM</td>
                      <td className="py-3 font-bold">LUNCH BREAK</td>
                    </tr>
                    <tr className="border-b border-transparent">
                      <td className="py-3 align-top">1:00-3:00PM</td>
                      <td className="py-3 font-bold text-red-600">Training/Lecture Name Resource Speaker</td>
                    </tr>
                    <tr className="border-b border-transparent">
                      <td className="py-3 align-top">3:00-4:30 PM</td>
                      <td className="py-3 font-bold text-red-600">Open Forum/Evaluation</td>
                    </tr>
                    <tr className="border-b border-transparent">
                      <td className="py-3 align-top">4:30-4:45 PM</td>
                      <td className="py-3 font-bold text-red-600">Awarding of Certificates</td>
                    </tr>
                    <tr className="border-b border-transparent">
                      <td className="py-3 align-top">4:45:4:55 PM</td>
                      <td className="py-3 font-bold text-red-600">Closing Remarks Name of facilitator</td>
                    </tr>
                    <tr className="border-b border-transparent">
                      <td className="py-3 align-top">4:55-5:00 PM</td>
                      <td className="py-3 font-bold text-red-600">Photo Opportunity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-6">X. Budgetary Requirement:</h2>

              <div className="bg-gray-50 p-6 rounded-sm overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="font-bold border-b">
                      <th>Item</th>
                      <th>Cost (PHP)</th>
                      <th>Pax / Qty</th>
                      <th>Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr><td colSpan="4" className="pt-4 font-bold">A. Meals and Snacks</td></tr>
                    {renderRows("meals")}
                    <tr className="font-bold italic">
                      <td className="pl-4">Total</td>
                      <td></td>
                      <td></td>
                      <td>{totalAmount("meals")}</td>
                    </tr>
                    <tr>
                      <td colSpan="4">
                        <button
                          onClick={() => addRow("meals")}
                          className="text-blue-600 text-xs mt-2"
                        >
                          + Add Row
                        </button>
                      </td>
                    </tr>

                    <tr><td colSpan="4" className="pt-6 font-bold">B. Transportation</td></tr>
                    {renderRows("transport")}
                    <tr className="font-bold italic">
                      <td className="pl-4">Total</td>
                      <td></td>
                      <td></td>
                      <td>{totalAmount("transport")}</td>
                    </tr>
                    <tr>
                      <td colSpan="4">
                        <button
                          onClick={() => addRow("transport")}
                          className="text-blue-600 text-xs mt-2"
                        >
                          + Add Row
                        </button>
                      </td>
                    </tr>

                    <tr><td colSpan="4" className="pt-6 font-bold">C. Supplies and Materials</td></tr>
                    {renderRows("supplies")}
                    <tr className="font-bold italic">
                      <td className="pl-4">Total</td>
                      <td></td>
                      <td></td>
                      <td>{totalAmount("supplies")}</td>
                    </tr>
                    <tr>
                      <td colSpan="4">
                        <button
                          onClick={() => addRow("supplies")}
                          className="text-blue-600 text-xs mt-2"
                        >
                          + Add Row
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="flex justify-end pt-10">
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-md font-bold text-lg shadow-lg transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateProposal;