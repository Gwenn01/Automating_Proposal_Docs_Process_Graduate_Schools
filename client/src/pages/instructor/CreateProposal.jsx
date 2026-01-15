import React, { useState } from 'react';


const CreateProposal = () => {
  const [activeTab, setActiveTab] = useState('program');

  const [coverText, setCoverText] = useState(`DATE

DR. ROY N. VILLALOBOS
University President
President Ramon Magsaysay State University

Dear Sir:

I have the honor to submit the proposal for your consideration and appropriate action...
`);
  

  // Helper for input fields
  const InputField = ({ label, placeholder, type = "text" }) => (
    <div className="mb-6 flex items-center justify-center gap-2">
      <label className="block text-xl font-semibold mb-2">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full p-3 bg-gray-100 border-none rounded-sm focus:ring-2 focus:ring-green-600 outline-none"
      />
    </div>
  );

  // Helper for Text Areas
  const TextAreaField = ({ label }) => (
    <div className="">
      <label className="block text-md font-semibold mb-2">{label}</label>
      <textarea 
        rows={6}
        className="w-full p-3 bg-gray-100 border-none rounded-sm focus:ring-2 focus:ring-green-600 outline-none"
      />
    </div>
  );

  return (
    <div className=" bg-white p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <h1 className="text-3xl font-bold mb-8 text-black">Create Proposal</h1>

        {/* Navigation Tabs */}
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

        {/* Form Content */}
        <div className="space-y-8">
          
          <InputField label="Title:" />
            <section>
                <label className="block text-xl font-semibold mb-2">
                    Cover Page:
                </label>

                <textarea
                    value={coverText}
                    onChange={(e) => setCoverText(e.target.value)}
                    className="w-full p-6 bg-gray-50 border border-gray-200 rounded-sm
                            text-sm text-gray-700 leading-relaxed shadow-inner
                            overflow-y-auto max-h-60 min-h-[240px] resize-none
                            focus:outline-none focus:ring-2 focus:ring-secondary"
                />
            </section>

          <section className="">
            <h3 className="text-xl font-bold  mb-4">I. Program/Project Profile:</h3>
            <div className="space-y-4">
              {['Program Title', 'Project Title', 'Activity Title', "SDG's", 'Extension Agenda', 'Proponents: \n\nLeader', 'Proponents: \n Members', 'College/Campus/Mandated Program:', 'Collaborating Agencies:', 'Community Location:', 'Target Sector:', 'Number of Beneficiaries', 'Period of Implementation/ Duration:', 'Budgetary Requirements (PhP): '].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-48 text-sm font-semibold">{item}:</span>
                  <input className="flex-1 bg-gray-200/80 p-2 text-sm outline-none focus:outline-none focus:ring-2 focus:ring-secondary" />
                </div>
              ))}
            </div>
          </section>

        <div>
            <h3 className="text-xl font-bold  mb-4">II. Rationale</h3>
            <TextAreaField label="" />
        </div>

        <div>
            <h3 className="text-xl font-bold  mb-4">III. Significance</h3>
            <TextAreaField label="" />
        </div>

            
        <div>
            <h2 className='font-bold text-xl'>IV. Objectives</h2>
            <div className='px-5 mt-5'>
                <TextAreaField label="General Objectives:" />
            </div>

            <div className='px-5'>
                <TextAreaField label="Specific Objectives:" />
            </div>
        </div>


        <div>
            <h3 className="text-xl font-bold  mb-4">V. Methodology</h3>
            <TextAreaField label="" />
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
                {['Publications', 'Patents/IP', 'Products', 'People Services', 'Places and Partnerships', 'Policy', 'Social Impact', 'Economic Impact'].map((row) => (
                  <tr key={row}>
                    <td className="p-3 text-sm font-medium w-1/3">{row}</td>
                    <td className="p-1"><input className="w-full bg-gray-200/80 p-2 outline-none" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

        <div>
            <h3 className="text-xl font-bold  mb-4">VII. Sustainability Plan</h3>
            <TextAreaField label="" />
        </div>

          {/* Action Button */}
          <div className="flex justify-end pt-10">
            <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-md font-bold text-lg shadow-lg transition">
              Submit Proposal
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateProposal;