import React, { useState } from 'react';
import Scroll3DWrapper from './Scroll3DWrapper';

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
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-32 z-10 relative overflow-hidden">
      
      <Scroll3DWrapper className="text-center mb-16 max-w-4xl px-4">
        <h2 className="text-5xl font-bold mb-6 tracking-tight">Project Planner 📝</h2>
        <p className="text-lg text-white/60 leading-relaxed">
          The ultimate drafting table for your upcycling ideas. Write out your materials and map out your construction steps. Everything is saved locally to your device, ensuring your blueprints are always ready when you are.
        </p>
      </Scroll3DWrapper>

      <Scroll3DWrapper className="w-full max-w-3xl px-4 mb-24">
        <div className="glass p-12 rounded-3xl border border-neoBorder relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neoAccent/10 blur-3xl rounded-bl-full pointer-events-none"></div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Project Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g. Cardboard Arcade Cabinet"
                className="bg-[rgba(20,9,30,0.5)] border border-neoBorder p-4 rounded-xl text-sm text-white outline-none input-glow"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Materials Needed <span className="text-xs font-normal text-white/40 normal-case">(One item per line)</span></label>
              <textarea 
                value={materials} 
                onChange={(e) => setMaterials(e.target.value)} 
                placeholder="10x Heavy Cardboard Boxes&#10;Duct Tape&#10;Utility Knife"
                className="bg-[rgba(20,9,30,0.5)] border border-neoBorder p-4 rounded-xl text-sm text-white outline-none input-glow min-h-[120px] resize-y"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Construction Steps <span className="text-xs font-normal text-white/40 normal-case">(One step per line)</span></label>
              <textarea 
                value={steps} 
                onChange={(e) => setSteps(e.target.value)} 
                placeholder="1. Flatten all boxes and remove tape.&#10;2. Measure out the side panels.&#10;3. Assemble using duct tape."
                className="bg-[rgba(20,9,30,0.5)] border border-neoBorder p-4 rounded-xl text-sm text-white outline-none input-glow min-h-[180px] resize-y"
                required
              />
            </div>
            <button type="submit" className="mt-4 py-5 bg-button-gradient border border-neoAccent/40 font-bold text-base rounded-xl btn-spring flex items-center justify-center gap-2">
              <span className="text-xl">💾</span> Save Blueprint to Vault
            </button>
          </form>
        </div>
      </Scroll3DWrapper>

      {/* Saved Projects Gallery */}
      <Scroll3DWrapper className="w-full max-w-5xl px-4">
        <h3 className="text-4xl font-bold mb-12 flex items-center justify-center gap-4 text-center">
          <span className="text-neoAccent animate-pulse">✧</span> The Blueprint Vault <span className="text-neoAccent animate-pulse">✧</span>
        </h3>
        
        {savedProjects.length === 0 ? (
          <div className="p-16 glass rounded-3xl border border-dashed border-white/20 text-center text-white/50 text-lg">
            The vault is empty. Draft a master plan above to store it here permanently.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {savedProjects.map((proj, index) => (
              <div key={proj.id} className="glass p-8 rounded-3xl border border-neoBorder flex flex-col hover-lift h-full group">
                <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                  <h4 className="font-bold text-2xl group-hover:text-neoAccent transition-colors">{proj.title}</h4>
                  <span className="text-xs font-mono text-white/40 bg-black/40 px-3 py-1 rounded-full">{proj.date}</span>
                </div>
                
                {activeViewId === proj.id ? (
                  <div className="mt-2 animate-fade-in flex-grow flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h5 className="text-neoAccent font-bold text-xs mb-3 uppercase tracking-wider flex items-center gap-2">
                          <span>📦</span> Materials
                        </h5>
                        <ul className="list-disc pl-5 text-sm text-white/70 space-y-2">
                          {proj.materials.map((m, i) => <li key={i}>{m}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-neoAccent font-bold text-xs mb-3 uppercase tracking-wider flex items-center gap-2">
                          <span>🛠️</span> Steps
                        </h5>
                        <ol className="list-decimal pl-5 text-sm text-white/70 space-y-2">
                          {proj.steps.map((s, i) => <li key={i}>{s}</li>)}
                        </ol>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveViewId(null)}
                      className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm font-bold transition mt-auto"
                    >
                      Hide Details
                    </button>
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col justify-end">
                    <p className="text-sm text-white/50 mb-8">
                      {proj.materials.length} Materials Required • {proj.steps.length} Construction Steps
                    </p>
                    <button 
                      onClick={() => setActiveViewId(proj.id)}
                      className="w-full py-3 bg-[rgba(20,9,30,0.6)] border border-neoBorder font-bold rounded-xl text-sm btn-spring"
                    >
                      Open Blueprint
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Scroll3DWrapper>
    </div>
  );
};

export default ProjectPlanner;
