import React, { useState } from 'react';
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
  const [userId] = useState(1);
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
    prmsu_participants_count: "",
    partner_agency_participants_count: "",
    trainees_count: ""
  });

  const [activitySchedule, setActivitySchedule] = useState({
    activity_title: "",
    activity_date: "",
    schedule: [
      { time: "7:30–8:00 AM", activity: "Registration", speaker: "" },
      { time: "8:00–8:05 AM", activity: "Invocation–AV Presentation", speaker: "" },
      { time: "8:20–8:45 AM", activity: "Opening Remarks", speaker: "Dr. Roy N. Villalobos, University President" },
      { time: "8:45–9:00 AM", activity: "Welcome Remarks", speaker: "" },
      { time: "9:00 AM–12:00 NOON", activity: "", speaker: "" },
      { time: "12:00-1:00 PM", activity: "LUNCH BREAK", speaker: "" },
      { time: "1:00-3:00 PM", activity: "", speaker: "" },
      { time: "3:00-4:30 PM", activity: "Open Forum/Evaluation", speaker: "" },
      { time: "4:30-4:45 PM", activity: "Awarding of Certificates", speaker: "" },
      { time: "4:45-4:55 PM", activity: "Closing Remarks", speaker: "" },
      { time: "4:55-5:00 PM", activity: "Photo Opportunity", speaker: "" }
    ]
  });

  const [activeTab, setActiveTab] = useState('program');

  const resetForm = () => {
    setProposalId(null);
    setTitle("");
    setRows({ meals: [], transport: [], supplies: [] });
    setCover({
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
    setContent({
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
      prmsu_participants_count: "",
      partner_agency_participants_count: "",
      trainees_count: ""
    });
    setActivitySchedule({
      activity_title: "",
      activity_date: "",
      schedule: [
        { time: "7:30–8:00 AM", activity: "Registration", speaker: "" },
        { time: "8:00–8:05 AM", activity: "Invocation–AV Presentation", speaker: "" },
        { time: "8:20–8:45 AM", activity: "Opening Remarks", speaker: "Dr. Roy N. Villalobos, University President" },
        { time: "8:45–9:00 AM", activity: "Welcome Remarks", speaker: "" },
        { time: "9:00 AM–12:00 NOON", activity: "", speaker: "" },
        { time: "12:00-1:00 PM", activity: "LUNCH BREAK", speaker: "" },
        { time: "1:00-3:00 PM", activity: "", speaker: "" },
        { time: "3:00-4:30 PM", activity: "Open Forum/Evaluation", speaker: "" },
        { time: "4:30-4:45 PM", activity: "Awarding of Certificates", speaker: "" },
        { time: "4:45-4:55 PM", activity: "Closing Remarks", speaker: "" },
        { time: "4:55-5:00 PM", activity: "Photo Opportunity", speaker: "" }
      ]
    });
  };

  const updateScheduleRow = (index, field, value) => {
    const updated = [...activitySchedule.schedule];
    updated[index][field] = value;
    setActivitySchedule({ ...activitySchedule, schedule: updated });
  };

  const addScheduleRow = () => {
    setActivitySchedule({
      ...activitySchedule,
      schedule: [
        ...activitySchedule.schedule,
        { time: "", activity: "", speaker: "" }
      ]
    });
  };

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
      <tr key={i} className="h-10 border-[1px] border-black">
        <td className="p-3 border-[1px] border-black">
          <input
            placeholder='Input Data Here'
            className="w-full bg-transparent border-b-[2px] outline-none text-center border-secondary"
            value={row.item}
            onChange={(e) => handleChange(category, i, "item", e.target.value)}
          />
        </td>
        <td className='p-3 border-[1px] border-black'>
          <input
            placeholder='Input Data Here'
            type="number"
            className="w-full bg-transparent border-b-[2px] outline-none text-center border-secondary"
            value={row.cost}
            onChange={(e) => handleChange(category, i, "cost", e.target.value)}
          />
        </td>
        <td className='p-3 border-[1px] border-black'>
          <input
            placeholder='Input Data Here'
            type="number"
            className="w-full bg-transparent border-b-[2px] outline-none text-center border-secondary"
            value={row.qty}
            onChange={(e) => handleChange(category, i, "qty", e.target.value)}
          />
        </td>
        <td className='p-3 border-[1px] border-black'>
          <input
            readOnly
            className="w-full border outline-none text-center"
            value={row.amount}
          />
        </td>
      </tr>
    ));

  const toNumber = (value) => {
    if (value === "" || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  };

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
    if (!title || title.trim() === '') {
      alert('Please enter a proposal title before submitting.');
      return;
    }

    if (!cover.activity_date || cover.activity_date.trim() === '') {
      alert('Please fill in the Activity Date in the Cover Page section.');
      return;
    }

    if (!cover.activity_title || cover.activity_title.trim() === '') {
      alert('Please fill in the Activity Title in the Cover Page section.');
      return;
    }

    setIsSubmitting(true);

    const API_BASE_URL = 'http://127.0.0.1:5000/api';

    try {
      let currentProposalId = proposalId;

      // Only create a new proposal if we don't have one yet
      if (!currentProposalId) {
        console.log('Creating new proposal...');
        const proposalResponse = await fetch(`${API_BASE_URL}/create-proposal`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
        console.log('Proposal created with ID:', currentProposalId);
      } else {
        console.log('Using existing proposal ID:', currentProposalId);
      }

      // Clean and format cover page data
      const cleanedCover = {
        ...cleanData(cover),
        approved_budget_amount: toNumber(cover.approved_budget_amount),
        duration_years: toNumber(cover.duration_years),
        requested_activity_budget: toNumber(cover.requested_activity_budget),
        prmsu_participants_num: toNumber(cover.prmsu_participants_num),
        partner_agency_participants_num: toNumber(cover.partner_agency_participants_num),
        trainees_num: toNumber(cover.trainees_num),
      };

      console.log('=== COVER PAGE DATA ===', cleanedCover);

      const coverResponse = await fetch(`${API_BASE_URL}/cover/${currentProposalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedCover)
      });

      if (!coverResponse.ok) {
        const errorData = await coverResponse.json();
        console.error('Cover page error:', errorData);
        throw new Error(errorData.message || 'Failed to update cover page');
      }

      // Prepare budget breakdown
      const mealsTotal = totalAmount('meals');
      const transportTotal = totalAmount('transport');
      const suppliesTotal = totalAmount('supplies');
      const grandTotal = mealsTotal + transportTotal + suppliesTotal;

      const budgetBreakdown = {
        meals: rows.meals.map(row => ({
          item: row.item,
          cost: toNumber(row.cost),
          qty: toNumber(row.qty),
          amount: toNumber(row.amount)
        })),
        transport: rows.transport.map(row => ({
          item: row.item,
          cost: toNumber(row.cost),
          qty: toNumber(row.qty),
          amount: toNumber(row.amount)
        })),
        supplies: rows.supplies.map(row => ({
          item: row.item,
          cost: toNumber(row.cost),
          qty: toNumber(row.qty),
          amount: toNumber(row.amount)
        })),
        totals: {
          meals: mealsTotal,
          transport: transportTotal,
          supplies: suppliesTotal,
          grand_total: grandTotal
        }
      };

      // Prepare content payload
      // Parse members and collaborating_agencies if they are strings
      const parseToArray = (value) => {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        // Split by semicolon or comma and trim whitespace
        return value.split(/[;,]/).map(item => item.trim()).filter(item => item);
      };

      const payload = {
        ...cleanData(content),
        number_of_beneficiaries: toNumber(content.number_of_beneficiaries),
        total_budget_requested: toNumber(content.total_budget_requested),
        prmsu_participants_count: toNumber(content.prmsu_participants_count),
        partner_agency_participants_count: toNumber(content.partner_agency_participants_count),
        trainees_count: toNumber(content.trainees_count),

        // Send as arrays (backend expects lists, Flask will handle these)
        members: parseToArray(content.members),
        collaborating_agencies: parseToArray(content.collaborating_agencies),

        // Send as actual objects/arrays - backend should convert to JSON strings for MySQL
        org_and_staffing_json: content.org_and_staffing_json,
        activity_schedule_json: activitySchedule,
        budget_breakdown_json: budgetBreakdown,
        expected_output_6ps: content.expected_output_6ps,

        // Direct fields
        social_impact: content.expected_output_6ps.social_impact || null,
        economic_impact: content.expected_output_6ps.economic_impact || null
      };

      console.log('=== CONTENT PAYLOAD ===', payload);
      console.log('=== SENDING TO BACKEND ===');
      console.log('org_and_staffing_json type:', typeof payload.org_and_staffing_json, 'isArray:', Array.isArray(payload.org_and_staffing_json));
      console.log('activity_schedule_json type:', typeof payload.activity_schedule_json);
      console.log('budget_breakdown_json type:', typeof payload.budget_breakdown_json);

      const contentResponse = await fetch(`${API_BASE_URL}/content/${currentProposalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!contentResponse.ok) {
        const errorData = await contentResponse.json();
        console.error('Content error:', errorData);
        console.error('Validation errors:', errorData.errors);
        
        // Show detailed validation errors
        if (errorData.errors) {
          const errorMessages = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('\n');
          alert(`Validation failed:\n\n${errorMessages}`);
        }
        
        throw new Error(errorData.error || 'Failed to update proposal content');
      }

      alert('Proposal submitted successfully!');
      
      resetForm();
      // Clear the form after successful submission if you want to create a new proposal
      // Uncomment these lines if you want to reset the form after submission:
      // setProposalId(null);
      // setTitle("");
      // setCover({...initial cover state...});
      // setContent({...initial content state...});
      // etc.

    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleActivityTitleChange = (value) => {
    setCover(prev => ({ ...prev, activity_title: value }));
    setContent(prev => ({ ...prev, activity_title: value }));
    setActivitySchedule(prev => ({ ...prev, activity_title: value }));
  };

  const handleActivityDateChange = (value) => {
    setCover(prev => ({ ...prev, activity_date: value }));
    setActivitySchedule(prev => ({ ...prev, activity_date: value }));
  };

  const formatDateLong = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Create Proposal</h1>
          {proposalId && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Editing Proposal ID: <strong>#{proposalId}</strong>
              </span>
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold transition"
              >
                Create New Proposal
              </button>
            </div>
          )}
        </div>

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
            type='text'
            label="Title:"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <h2 className="text-2xl font-bold">Cover Page:</h2>
            
          <section className="max-w-5xl mx-auto bg-gray-100 p-12 rounded-sm shadow-sm font-sans text-gray-900 leading-relaxed">
            <div className="space-y-6 text-sm">
              <div>
                <p>Select a Date of Submission</p>
                <input 
                  placeholder='Select Date of Submission'
                  className='border p-2'
                  type="date" 
                  value={cover.submission_date}
                  onChange={(e) => setCover({ ...cover, submission_date: e.target.value })}
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
                <InlineInput 
                  type='text' 
                  placeholder="(Title referring to approved Board Reso)" 
                  width="w-72"
                  value={cover.board_resolution_title}
                  onChange={(e) => setCover({ ...cover, board_resolution_title: e.target.value })}
                />, 
                <InlineInput 
                  type='text' 
                  placeholder="(Board Resolution No.)" 
                  width="w-48"
                  value={cover.board_resolution_no}
                  onChange={(e) => setCover({ ...cover, board_resolution_no: e.target.value })}
                />
                with the approved budget of <InlineInput 
                  type="text" 
                  placeholder="____(Total amount in words)" 
                  value={cover.approved_budget_words}
                  onChange={(e) => setCover({ ...cover, approved_budget_words: e.target.value })}          
                /> ; 
                (<InlineInput 
                  type="number" 
                  placeholder="(Total amount in numbers)" 
                  width="w-40"
                  value={cover.approved_budget_amount}
                  onChange={(e) => setCover({ ...cover, approved_budget_amount: e.target.value })}
                />) with the duration 
                of <InlineInput 
                  type='text' 
                  placeholder="____in words (in numbers)" 
                  width="w-40" 
                  value={cover.duration_words}
                  onChange={(e) => setCover({ ...cover, duration_words: e.target.value })}          
                /> years, 
                <InlineInput 
                  type='text' 
                  placeholder="(date from-to). (please refer to the approved Board Reso)" 
                  width="w-80" 
                  value={cover.date_from_to}
                  onChange={(e) => setCover({ ...cover, date_from_to: e.target.value })}          
                />.
              </p>

              <p>
                This program includes an activity entitled (
                <InlineInput
                  type='text'
                  placeholder="activity title under the program"
                  width="w-64"
                  value={cover.activity_title}
                  onChange={(e) => handleActivityTitleChange(e.target.value)}
                />) on <input
                  type="text"
                  placeholder="select activity date"
                  value={cover.activity_date ? formatDateLong(cover.activity_date) : ""}
                  readOnly
                  onClick={() => document.getElementById("hiddenDatePicker").showPicker()}
                  className="bg-transparent cursor-pointer border-b border-gray-300 text-red-600 placeholder:text-red-400 font-medium text-center"
                />
                <input
                  id="hiddenDatePicker"
                  type="date"
                  style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
                  value={cover.activity_date}
                  onChange={(e) => handleActivityDateChange(e.target.value)}
                />
                at 
                <InlineInput 
                  type='text' 
                  placeholder="___ venue" 
                  width="w-32" 
                  value={cover.activity_venue}
                  onChange={(e) => setCover({ ...cover, activity_venue: e.target.value })}          
                />. This activity is valuable 
                <InlineInput 
                  type='text' 
                  placeholder="____for what" 
                  width="w-24" 
                  value={cover.activity_value_statement}
                  onChange={(e) => setCover({ ...cover, activity_value_statement: e.target.value })}          
                />. The requested expenses 
                for this activity from the university is Php 
                <InlineInput 
                  placeholder="____(Total amount in numbers)" 
                  width="w-48" 
                  type="number"
                  value={cover.requested_activity_budget}
                  onChange={(e) => setCover({ ...cover, requested_activity_budget: e.target.value })}          
                />, 
                which will be used to defray expenses for food, transportation, supplies and materials, 
                and other expenses related to these activities.
              </p>

              <p>
                Further, there is <InlineInput 
                  type='text' 
                  placeholder="____number of participants in words" 
                  value={cover.prmsu_participants_words}
                  onChange={(e) => setCover({ ...cover, prmsu_participants_words: e.target.value })}          
                /> 
                (<InlineInput 
                  type='number' 
                  placeholder="number of participants in numbers"
                  value={cover.prmsu_participants_num}
                  onChange={(e) => setCover({ ...cover, prmsu_participants_num: e.target.value })}          
                /> ) the total number of participants from PRMSU, 
                another <InlineInput 
                  type='text' 
                  placeholder="____ total number from partner agency in words" 
                  value={cover.partner_agency_participants_words}
                  onChange={(e) => setCover({ ...cover, partner_agency_participants_words: e.target.value })}          
                /> 
                (<InlineInput  
                  placeholder="total number from partner agency in numbers" 
                  type="number"
                  value={cover.partner_agency_participants_num}
                  onChange={(e) => setCover({ ...cover, partner_agency_participants_num: e.target.value })}          
                /> ) from the collaborating agency, 
                <InlineInput 
                  type='text' 
                  placeholder="_____(agency name)" 
                  width="w-40" 
                  value={cover.partner_agency_name}
                  onChange={(e) => setCover({ ...cover, partner_agency_name: e.target.value })}          
                />, and 
                <InlineInput 
                  type='text' 
                  placeholder="____ total number of trainees in words" 
                  value={cover.trainees_words}
                  onChange={(e) => setCover({ ...cover, trainees_words: e.target.value })}          
                /> 
                ( <InlineInput 
                  type='number' 
                  placeholder="total number of trainees in numbers"
                  value={cover.trainees_num}
                  onChange={(e) => setCover({ ...cover, trainees_num: e.target.value })}          
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
                  onChange={(e) => handleActivityTitleChange(e.target.value)}
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
                  type="number"
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
                  type="number"
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
          </div>

          <section>
            <h2 className="text-xl font-bold mt-8">IX. Plan of Activities:</h2>

            <div className="max-w-5xl mx-auto p-8 rounded-sm">
              <div className="text-center p-3 border border-black">
                <input
                  placeholder="ENTER ACTIVITY TITLE HERE"
                  className="p-2 w-full text-center font-semibold text-xl outline-none text-red-600 placeholder-red-400 border-b border-red-600"
                  value={activitySchedule.activity_title}
                  onChange={(e) => handleActivityTitleChange(e.target.value)}
                />
                <div className='p-2'>
                  <span className="px-2 py-1 text-sm font-semibold rounded">Date:</span>
                  <input 
                    placeholder='Select Date'
                    className='border p-2'
                    type="date" 
                    value={activitySchedule.activity_date}
                    onChange={(e) => handleActivityDateChange(e.target.value)}
                  />
                </div>
                <p className="text-lg font-medium">PROGRAMME</p>
              </div>

              <table className="w-full border-collapse border border-black">
                <thead className='border border-black'>
                  <tr className="text-center">
                    <th className="py-2 border-r border-black">
                      <span className="text-red-600 px-2 py-1 text-md font-bold rounded">Time</span>
                    </th>
                    <th className="py-2">
                      <span className="text-red-600 px-2 py-1 text-md font-bold rounded">Part of the Program / Speaker</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {activitySchedule.schedule.map((row, index) => (
                    <tr key={index} className="border-b border-black text-center">
                      <td className="py-3 align-top border-r border-black">
                        <input 
                          placeholder='Time'
                          className="w-full text-center bg-transparent outline-none"
                          value={row.time}
                          onChange={(e) => updateScheduleRow(index, 'time', e.target.value)}
                        />
                      </td>
                      <td className="py-3">
                        <div className="space-y-1">
                          <input 
                            placeholder='Activity / Part of Program'
                            className="w-full text-center font-semibold text-md bg-transparent outline-none" 
                            value={row.activity}
                            onChange={(e) => updateScheduleRow(index, 'activity', e.target.value)}
                          />
                          <input 
                            placeholder='Speaker / Facilitator (optional)'
                            className="w-full text-center font-normal text-sm text-gray-600 bg-transparent outline-none" 
                            value={row.speaker}
                            onChange={(e) => updateScheduleRow(index, 'speaker', e.target.value)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <button
                onClick={addScheduleRow}
                className="mt-4 text-blue-600 text-sm hover:text-blue-800"
              >
                + Add Schedule Row
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-6 mt-8">X. Budgetary Requirement:</h2>

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
                  <tr className="font-bold italic border-[1px] border-black">
                    <td className="pl-4">Total</td>
                    <td></td>
                    <td></td>
                    <td className='pl-3'>{totalAmount("meals")}</td>
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
                  <tr className="font-bold italic border-[1px] border-black">
                    <td className="pl-4">Total</td>
                    <td></td>
                    <td></td>
                    <td className='pl-3'>{totalAmount("transport")}</td>
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
                  <tr className="font-bold italic border-[1px] border-black">
                    <td className="pl-4">Total</td>
                    <td></td>
                    <td></td>
                    <td className='pl-3'>{totalAmount("supplies")}</td>
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