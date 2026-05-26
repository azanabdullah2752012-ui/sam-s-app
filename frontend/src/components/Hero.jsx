import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MATERIALS = [
  { id: 1, label: 'Cardboard Boxes', icon: '📦' },
  { id: 2, label: 'Plastic Bottles', icon: '🧴' },
  { id: 3, label: 'Old Fabric', icon: '👕' },
  { id: 4, label: 'Glass Jars', icon: '🫙' },
];

const PROJECT_TYPES = [
  { id: 1, label: 'Stuff Holder', icon: '✏️' },
  { id: 2, label: 'Planter', icon: '🌱' },
  { id: 3, label: 'Toy/Game', icon: '🎲' },
  { id: 4, label: 'Decoration', icon: '✨' },
];

const Hero = () => {
  const navigate = useNavigate();
  
  // State for dropdowns
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState(null);
  const [selectedIdea, setSelectedIdea] = useState(null);
  
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);
  
  const fileInputRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setIsMaterialOpen(false);
        setIsProjectOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleGetIdeas = () => {
    setIsGenerating(true);
    setGeneratedIdeas(null);
    setSelectedIdea(null);
    setTimeout(() => {
      setGeneratedIdeas([
        { 
          title: `${material.label} Desk Organizer`, 
          difficulty: 'Easy',
          materials: [`2x ${material.label}`, 'Scissors', 'Glue', 'Markers'],
          steps: ['Cut the material into sections', 'Glue the sections together', 'Decorate with markers']
        },
        { 
          title: `Epic ${projectType.label} out of ${material.label}`, 
          difficulty: 'Medium',
          materials: [`3x ${material.label}`, 'Tape', 'Paint', 'Brushes'],
          steps: ['Assemble the base structure', 'Reinforce with tape', 'Paint and let dry']
        },
        { 
          title: `Recycled ${material.label} Masterpiece`, 
          difficulty: 'Hard',
          materials: [`5x ${material.label}`, 'Hot Glue Gun', 'Craft Knife', 'LED Lights'],
          steps: ['Carefully carve the intricate pieces', 'Assemble using hot glue', 'Install the LED lighting']
        }
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSnapPhoto = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      alert(`Awesome! You selected: ${e.target.files[0].name}. Click "Review My Work!" to scan it.`);
    }
  };

  const handleReview = async () => {
    setIsReviewing(true);
    setReviewResult(null);
    try {
      const response = await fetch('http://localhost:5000/api/review-work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData: 'base64_mock' })
      });
      const data = await response.json();
      setReviewResult(data.feedback || "Great job! Keep building!");
    } catch (err) {
      setReviewResult("Awesome build! (Local Mock Mode)");
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-20">
      
      {/* Title Section */}
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Fun DIY Projects! 🎨</h1>
        <p className="text-sm text-white/60 flex items-center justify-center gap-2">
          <span className="text-neoAccent">✧</span> 
          Pick what you have and find something cool to make! 
          <span className="text-neoAccent">✧</span>
        </p>
      </div>

      {/* Main Glass Panel */}
      <div className="relative w-full max-w-4xl z-10">
        <div className="absolute inset-0 rounded-2xl glass-mask pointer-events-none"></div>
        <div className="glass rounded-2xl p-10 relative overflow-visible">
          
          <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-neoBorder flex items-center justify-center opacity-40">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
          </div>

          {/* Row 1: Pick Your Stuff & Search */}
          <div className="mb-10">
            <h3 className="text-base font-semibold mb-6 flex items-center gap-2">
              1. Pick Your Stuff
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Material Dropdown */}
              <div className="flex flex-col gap-2 relative dropdown-container">
                <label className="text-xs text-white/60">What do you have?</label>
                <div 
                  onClick={() => {setIsMaterialOpen(!isMaterialOpen); setIsProjectOpen(false);}}
                  className="bg-[rgba(20,9,30,0.5)] border border-neoBorder rounded-lg p-3 flex items-center justify-between text-sm cursor-pointer hover:bg-[rgba(20,9,30,0.7)] transition"
                >
                  <div className="flex items-center gap-2 text-white/80">
                    <span>{material.icon}</span> {material.label}
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                {isMaterialOpen && (
                  <div className="absolute top-[100%] mt-2 left-0 w-full glass border border-neoBorder rounded-lg p-2 z-50 shadow-xl">
                    {MATERIALS.map(m => (
                      <div 
                        key={m.id} 
                        onClick={() => {setMaterial(m); setIsMaterialOpen(false);}}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 cursor-pointer text-sm text-white/80"
                      >
                        <span>{m.icon}</span> {m.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Type Dropdown */}
              <div className="flex flex-col gap-2 relative dropdown-container">
                <label className="text-xs text-white/60">What do you want to make?</label>
                <div 
                  onClick={() => {setIsProjectOpen(!isProjectOpen); setIsMaterialOpen(false);}}
                  className="bg-[rgba(20,9,30,0.5)] border border-neoBorder rounded-lg p-3 flex items-center justify-between text-sm cursor-pointer hover:bg-[rgba(20,9,30,0.7)] transition"
                >
                  <div className="flex items-center gap-2 text-white/80">
                    <span>{projectType.icon}</span> {projectType.label}
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                {isProjectOpen && (
                  <div className="absolute top-[100%] mt-2 left-0 w-full glass border border-neoBorder rounded-lg p-2 z-50 shadow-xl">
                    {PROJECT_TYPES.map(p => (
                      <div 
                        key={p.id} 
                        onClick={() => {setProjectType(p); setIsProjectOpen(false);}}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 cursor-pointer text-sm text-white/80"
                      >
                        <span>{p.icon}</span> {p.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-white/60">2. Search for something... <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></label>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter a word (like 'mask' or 'planter')" 
                  className="bg-[rgba(20,9,30,0.5)] border border-neoBorder rounded-lg p-3 text-sm text-white placeholder-white/30 outline-none w-full focus:border-neoAccent transition" 
                />
              </div>

            </div>
          </div>

          {/* Row 2: Actions */}
          <div>
            <h3 className="text-base font-semibold mb-6 flex items-center gap-2">
              3. Choose Your Action!
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
            </h3>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={handleGetIdeas}
                disabled={isGenerating}
                className="bg-button-gradient border border-neoAccent/40 rounded-lg px-6 py-3 text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition disabled:opacity-50"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neoAccent"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                {isGenerating ? 'Thinking...' : 'Get Project Ideas!'}
              </button>
              
              <span className="text-xs text-white/40">or</span>

              <div className="flex flex-col gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button 
                  onClick={handleSnapPhoto}
                  className="bg-[rgba(20,9,30,0.6)] border border-neoBorder rounded-lg px-6 py-2 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                  Snap Photo
                </button>
                <button 
                  onClick={handleReview}
                  disabled={isReviewing}
                  className="bg-review-gradient border border-neoBorder rounded-lg px-6 py-2 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition disabled:opacity-50"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  {isReviewing ? 'Scanning...' : 'Review My Work!'}
                </button>
              </div>
            </div>

            {/* Modals directly inside the card for sleekness */}
            {generatedIdeas && !selectedIdea && (
              <div className="mt-8 p-4 glass rounded-xl border border-neoAccent/40 animate-fade-in">
                <h4 className="text-neoAccent font-bold text-sm mb-3">Found 3 Project Ideas!</h4>
                <div className="flex flex-col gap-2">
                  {generatedIdeas.map((idea, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedIdea(idea)}
                      className="bg-[rgba(20,9,30,0.4)] p-3 rounded-lg flex justify-between items-center text-sm cursor-pointer hover:bg-[rgba(20,9,30,0.6)] transition border border-transparent hover:border-neoAccent/50"
                    >
                      <span className="text-white/90">{idea.title}</span>
                      <span className="text-[10px] uppercase tracking-wider text-neoBlue bg-neoBlue/10 px-2 py-1 rounded-full">{idea.difficulty}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedIdea && (
              <div className="mt-8 p-6 glass rounded-xl border border-neoAccent animate-fade-in">
                <button 
                  onClick={() => setSelectedIdea(null)}
                  className="text-xs text-white/40 hover:text-white mb-4 flex items-center gap-1 transition"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back to ideas
                </button>
                <h4 className="text-xl font-bold text-white mb-2">{selectedIdea.title}</h4>
                <div className="flex gap-2 mb-6">
                   <span className="text-[10px] uppercase tracking-wider text-neoBlue bg-neoBlue/10 px-2 py-1 rounded-full">{selectedIdea.difficulty}</span>
                </div>
                
                <h5 className="text-neoAccent font-bold text-sm mb-2">Materials Needed:</h5>
                <ul className="list-disc pl-5 mb-6 text-sm text-white/80 space-y-1">
                  {selectedIdea.materials.map((m, i) => <li key={i}>{m}</li>)}
                </ul>

                <h5 className="text-neoAccent font-bold text-sm mb-2">Steps:</h5>
                <ol className="list-decimal pl-5 text-sm text-white/80 space-y-2">
                  {selectedIdea.steps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
                
                <button 
                  onClick={() => navigate('/planner')}
                  className="w-full mt-6 py-2 bg-button-gradient border border-neoAccent/40 hover:bg-white/5 font-medium rounded-lg text-sm transition text-white"
                >
                  Save to Planner
                </button>
              </div>
            )}

            {reviewResult && (
              <div className="mt-8 p-4 glass rounded-xl border border-green-500/40 bg-green-900/20 animate-fade-in">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌟</span>
                  <div>
                    <h4 className="text-green-400 font-bold text-sm">Magic Brain Says:</h4>
                    <p className="text-green-100/80 text-sm mt-1">{reviewResult}</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Your Tools Section */}
      <div className="w-full max-w-4xl mt-12 z-10">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="text-neoAccent text-xl leading-none">✧</span> Your Tools 
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
        </h2>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Project Planner Card */}
          <div className="glass rounded-xl p-6 flex flex-col justify-between border border-neoBorder h-40">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full border border-neoBorder flex items-center justify-center bg-[rgba(20,9,30,0.3)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white/90">Project Planner 📝</h4>
                <p className="text-xs text-white/40 mt-1">Plan</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/planner')}
              className="w-full bg-[rgba(20,9,30,0.6)] border border-neoBorder rounded-lg py-2 text-xs font-medium text-white/70 hover:text-white transition flex justify-between px-4 items-center"
            >
              Open Tool!
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>

          {/* Stuff You Need Card */}
          <div className="glass rounded-xl p-6 flex flex-col justify-between border border-neoBorder h-40">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full border border-neoBorder flex items-center justify-center bg-[rgba(20,9,30,0.3)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white/90">Stuff You Need 📦</h4>
                <p className="text-xs text-white/40 mt-1">Maker Stuff</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/toolkit')}
              className="w-full bg-[rgba(20,9,30,0.6)] border border-neoBorder rounded-lg py-2 text-xs font-medium text-white/70 hover:text-white transition flex justify-between px-4 items-center"
            >
              Open Tool!
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;
