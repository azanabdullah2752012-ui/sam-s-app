import React, { useState } from 'react';

const ProjectPlanner = ({ savedProjects, setSavedProjects }) => {
  const [title, setTitle] = useState('');
  const [materials, setMaterials] = useState('');
  const [steps, setSteps] = useState('');
  
  const [activeViewId, setActiveViewId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProject = {
      id: Date.now().toString(),
      title,
      materials: materials.split('\\n').filter(m => m.trim() !== ''),
      steps: steps.split('\\n').filter(s => s.trim() !== ''),
      date: new Date().toLocaleDateString()
    };

    setSavedProjects(prev => [newProject, ...prev]);
    alert(`Project "${title}" saved successfully to your persistent Planner!`);
    setTitle(''); setMaterials(''); setSteps('');
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-20 z-10 relative">
      <div className="glass max-w-2xl w-full p-10 rounded-2xl border border-neoBorder mb-12">
        <h2 className="text-3xl font-bold mb-2">Project Planner 📝</h2>
        <p className="text-sm text-white/60 mb-8">Draft your own blueprints. They will be saved to your local storage.</p>
        
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
            <label className="text-sm text-white/60">Materials Needed (One per line)</label>
            <textarea 
              value={materials} 
              onChange={(e) => setMaterials(e.target.value)} 
              className="bg-[rgba(20,9,30,0.5)] border border-neoBorder p-4 rounded-lg text-sm text-white outline-none focus:border-neoAccent transition min-h-[100px]"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/60">Steps (One per line)</label>
            <textarea 
              value={steps} 
              onChange={(e) => setSteps(e.target.value)} 
              className="bg-[rgba(20,9,30,0.5)] border border-neoBorder p-4 rounded-lg text-sm text-white outline-none focus:border-neoAccent transition min-h-[150px]"
              required
            />
          </div>
          <button type="submit" className="mt-4 py-4 bg-button-gradient border border-neoAccent/40 hover:bg-white/5 font-bold text-sm rounded-lg transition">
            Save Blueprint
          </button>
        </form>
      </div>

      {/* Saved Projects Gallery */}
      <div className="w-full max-w-4xl">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-neoAccent">✧</span> Your Saved Blueprints
        </h3>
        
        {savedProjects.length === 0 ? (
          <div className="p-8 glass rounded-xl border border-neoBorder text-center text-white/50">
            No projects saved yet. Create one above!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedProjects.map(proj => (
              <div key={proj.id} className="glass p-6 rounded-xl border border-neoBorder flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-lg">{proj.title}</h4>
                  <span className="text-xs text-white/40">{proj.date}</span>
                </div>
                
                {activeViewId === proj.id ? (
                  <div className="mt-2 animate-fade-in">
                    <h5 className="text-neoAccent font-bold text-xs mb-2 uppercase">Materials</h5>
                    <ul className="list-disc pl-4 text-sm text-white/70 mb-4 space-y-1">
                      {proj.materials.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                    <h5 className="text-neoAccent font-bold text-xs mb-2 uppercase">Steps</h5>
                    <ol className="list-decimal pl-4 text-sm text-white/70 mb-4 space-y-1">
                      {proj.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                    <button 
                      onClick={() => setActiveViewId(null)}
                      className="text-xs text-neoAccent hover:text-white transition mt-2"
                    >
                      Hide Details
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setActiveViewId(proj.id)}
                    className="w-full py-2 bg-[rgba(20,9,30,0.6)] border border-neoBorder hover:bg-white/10 rounded-lg text-sm transition mt-auto"
                  >
                    View Details
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPlanner;
