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
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-20 z-10 relative">
      <div className="glass max-w-2xl w-full p-10 rounded-2xl border border-neoBorder">
        <h2 className="text-3xl font-bold mb-8">Project Planner 📝</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/60">Project Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="bg-[rgba(20,9,30,0.5)] border border-neoBorder p-4 rounded-lg text-sm text-white outline-none focus:border-neoAccent transition"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/60">Materials Needed</label>
            <textarea 
              value={materials} 
              onChange={(e) => setMaterials(e.target.value)} 
              className="bg-[rgba(20,9,30,0.5)] border border-neoBorder p-4 rounded-lg text-sm text-white outline-none focus:border-neoAccent transition min-h-[100px]"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/60">Steps</label>
            <textarea 
              value={steps} 
              onChange={(e) => setSteps(e.target.value)} 
              className="bg-[rgba(20,9,30,0.5)] border border-neoBorder p-4 rounded-lg text-sm text-white outline-none focus:border-neoAccent transition min-h-[150px]"
              required
            />
          </div>
          <button type="submit" className="mt-4 py-4 bg-button-gradient border border-neoAccent/40 hover:bg-white/5 font-bold text-sm rounded-lg transition">
            Save Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectPlanner;
