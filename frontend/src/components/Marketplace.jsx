import React, { useState } from 'react';

const Marketplace = ({ coinBalance, setCoinBalance, purchasedProjects, setPurchasedProjects }) => {
  const [projects] = useState([
    { 
      _id: '1', 
      title: 'Cardboard Spaceship', 
      cost: 50,
      description: 'A massive 3-stage rocket blueprint.',
      materials: ['10x Cardboard Boxes', 'Duct Tape', 'Silver Paint'],
      steps: ['Build the boosters', 'Assemble the command module', 'Paint everything silver!']
    },
    { 
      _id: '2', 
      title: 'Plastic Bottle Planter', 
      cost: 20,
      description: 'Self-watering hydro-planter.',
      materials: ['2x 2L Bottles', 'String', 'Soil'],
      steps: ['Cut the bottle in half', 'Invert top half', 'Add string wick and soil']
    },
    { 
      _id: '3', 
      title: 'Fabric Tote Bag', 
      cost: 100,
      description: 'Sew a premium grocery bag.',
      materials: ['Old T-Shirts', 'Needle & Thread', 'Scissors'],
      steps: ['Cut off the sleeves', 'Sew the bottom shut', 'Cut the neckline deeper']
    },
  ]);
  const [message, setMessage] = useState('');
  const [activeBlueprint, setActiveBlueprint] = useState(null);

  const handlePurchase = (project) => {
    if (coinBalance < project.cost) {
      setMessage(`❌ Insufficient coins for ${project.title}`);
      return;
    }
    
    // Deduct coins and add to purchased
    setCoinBalance(prev => prev - project.cost);
    setPurchasedProjects(prev => [...prev, project._id]);
    setMessage(`✅ Successfully purchased ${project.title}! You can now view the blueprint.`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-20 z-10 relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 tracking-tight">Community Marketplace 🛒</h2>
        <p className="text-sm text-white/60">Unlock new project blueprints with your coins!</p>
      </div>

      {message && <div className="mb-8 p-4 glass rounded-xl border border-neoBorder text-sm">{message}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {projects.map(project => {
          const isPurchased = purchasedProjects.includes(project._id);
          
          return (
            <div key={project._id} className="glass p-8 rounded-2xl border border-neoBorder flex flex-col items-center hover:bg-neoHover transition-colors">
              <h3 className="text-xl font-bold mb-2 text-center">{project.title}</h3>
              <p className="text-xs text-white/60 mb-4 text-center">{project.description}</p>
              
              {!isPurchased ? (
                <>
                  <p className="text-sm text-white/60 mb-6">Cost: <span className="text-neoAccent font-bold">{project.cost} Coins</span></p>
                  <button 
                    onClick={() => handlePurchase(project)}
                    className="w-full py-3 bg-button-gradient border border-neoAccent/40 hover:bg-white/5 font-semibold rounded-lg text-sm transition"
                  >
                    Purchase Project
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-green-400 mb-6 font-bold flex items-center gap-2">
                    <span>🔓</span> Unlocked
                  </p>
                  <button 
                    onClick={() => setActiveBlueprint(activeBlueprint?._id === project._id ? null : project)}
                    className="w-full py-3 bg-white/10 border border-white/20 hover:bg-white/20 font-semibold rounded-lg text-sm transition"
                  >
                    {activeBlueprint?._id === project._id ? 'Close Blueprint' : 'Open Blueprint'}
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>

      {activeBlueprint && (
        <div className="mt-12 p-8 glass w-full max-w-4xl rounded-2xl border border-neoAccent/50 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neoAccent opacity-10 rounded-bl-full"></div>
          <h3 className="text-2xl font-bold mb-6 text-neoAccent">{activeBlueprint.title} Blueprint</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-white mb-4">📦 Materials Required:</h4>
              <ul className="list-disc pl-5 text-white/70 space-y-2">
                {activeBlueprint.materials.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">🛠️ Construction Steps:</h4>
              <ol className="list-decimal pl-5 text-white/70 space-y-2">
                {activeBlueprint.steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
