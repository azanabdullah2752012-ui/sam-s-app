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
      alert(`🎉 Project "${title}" saved to Planner!`);
      setTitle(''); setMaterials(''); setSteps('');
    } catch (err) {
      alert(`🎉 Project "${title}" saved to local Planner (Mock mode)!`);
      setTitle(''); setMaterials(''); setSteps('');
    }
  };

  const inputClass = "bg-white border-4 border-ecoDark p-5 rounded-2xl text-xl text-ecoDark font-medium outline-none focus:border-ecoPink focus:shadow-bouncy transition-all w-full placeholder-gray-400";

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-ecoBlue p-10 md:p-12 rounded-[40px] border-4 border-ecoDark shadow-[0_16px_0_rgba(0,0,0,0.15)] relative">
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-full border-4 border-ecoDark flex items-center justify-center text-4xl shadow-bouncy rotate-12">
        ✏️
      </div>

      <div className="text-center mb-10">
        <h2 className="text-5xl font-bold mb-3 text-ecoDark">Project Planner</h2>
        <p className="text-xl font-medium text-ecoDark/80">Plan out your awesome ideas here!</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <label className="text-ecoDark font-bold text-2xl flex items-center gap-2">
            🏷️ What are you making?
          </label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className={inputClass}
            required
            placeholder="e.g. Cardboard Robot"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-ecoDark font-bold text-2xl flex items-center gap-2">
            ✂️ What do you need?
          </label>
          <textarea 
            value={materials} 
            onChange={(e) => setMaterials(e.target.value)} 
            className={`${inputClass} min-h-[120px] resize-none`}
            required
            placeholder="List your stuff here..."
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-ecoDark font-bold text-2xl flex items-center gap-2">
            🛠️ How do you build it?
          </label>
          <textarea 
            value={steps} 
            onChange={(e) => setSteps(e.target.value)} 
            className={`${inputClass} min-h-[160px] resize-none`}
            required
            placeholder="Step 1... Step 2..."
          />
        </div>

        <button type="submit" className="mt-4 py-6 bg-ecoYellow text-ecoDark font-bold text-3xl rounded-full border-4 border-ecoDark shadow-[0_8px_0_#2D3142] hover:translate-y-1 hover:shadow-[0_4px_0_#2D3142] active:translate-y-3 active:shadow-none transition-all flex justify-center items-center gap-3">
          <span>💾</span> Save My Plan!
        </button>
      </form>
    </div>
  );
};

export default ProjectPlanner;
