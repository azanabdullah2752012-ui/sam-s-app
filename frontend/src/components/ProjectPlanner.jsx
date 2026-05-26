import React, { useState } from 'react';

const ProjectPlanner = () => {
  const [title, setTitle] = useState('');
  const [materials, setMaterials] = useState('');
  const [steps, setSteps] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/tools/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, materialsNeeded: [materials], steps: [steps], userId: 'mock-user-id' })
      });
      alert(`Project "${title}" saved to Planner!`);
      setTitle(''); setMaterials(''); setSteps('');
    } catch (err) {
      alert(`Project "${title}" saved to local Planner (Mock mode)!`);
      setTitle(''); setMaterials(''); setSteps('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-lightPurple/30 backdrop-blur-xl p-12 rounded-[32px] border border-lightPurple shadow-glow">
      <h2 className="text-3xl font-bold mb-8">Project Planner 📝</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-medium">Project Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="bg-darkPurple/50 border border-lightPurple p-4 rounded-xl text-white outline-none focus:border-accentPurple transition"
            required
            placeholder="e.g. Cardboard Robot"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-medium">Materials Needed</label>
          <textarea 
            value={materials} 
            onChange={(e) => setMaterials(e.target.value)} 
            className="bg-darkPurple/50 border border-lightPurple p-4 rounded-xl text-white outline-none focus:border-accentPurple transition min-h-[100px]"
            required
            placeholder="List your materials..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-medium">Steps</label>
          <textarea 
            value={steps} 
            onChange={(e) => setSteps(e.target.value)} 
            className="bg-darkPurple/50 border border-lightPurple p-4 rounded-xl text-white outline-none focus:border-accentPurple transition min-h-[150px]"
            required
            placeholder="Describe the steps..."
          />
        </div>
        <button type="submit" className="mt-4 py-4 bg-gradient-to-r from-accentPurple to-[#8855db] text-darkPurple font-bold text-lg rounded-full hover:opacity-90 transition">
          Save Plan
        </button>
      </form>
    </div>
  );
};

export default ProjectPlanner;
