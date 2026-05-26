import React, { useState } from 'react';
import Scroll3DWrapper from './Scroll3DWrapper';

const Marketplace = ({ coinBalance, setCoinBalance, purchasedProjects, setPurchasedProjects }) => {
  const [projects] = useState([
    { 
      _id: '1', 
      title: 'Cardboard Spaceship', 
      cost: 50,
      description: 'A massive 3-stage rocket blueprint designed for ultimate durability. Features internal cargo bays and a modular command capsule. Perfect for recycling large appliance boxes.',
      materials: ['10x Large Cardboard Boxes', 'Duct Tape (Silver & Black)', 'Silver Spray Paint', 'Craft Knife', 'Hot Glue Gun'],
      steps: ['Construct the primary booster tubes by rolling and reinforcing 3 large cardboard panels.', 'Assemble the aerodynamic nose cone and attach to the command module.', 'Mount the external thruster fins at precisely 120-degree intervals.', 'Apply 2 coats of silver paint and let cure for 24 hours.']
    },
    { 
      _id: '2', 
      title: 'Hydro-Planter System', 
      cost: 20,
      description: 'A self-watering hydroponic planter system that utilizes physics to keep your plants alive. Perfect for herbs and small indoor vegetables.',
      materials: ['2x 2L Plastic Bottles', 'Absorbent Cotton String', 'Potting Soil', 'Seeds', 'Utility Scissors'],
      steps: ['Sever the top third of the plastic bottle.', 'Invert the top half so the nozzle points downward into the base.', 'Thread the cotton string through the nozzle to act as a capillary wick.', 'Fill the top reservoir with soil and the bottom with water.']
    },
    { 
      _id: '3', 
      title: 'Premium Tote Bag', 
      cost: 100,
      description: 'Sew a high-end, durable grocery tote bag from old t-shirts. Features reinforced handles and a gusseted bottom for extra carrying capacity.',
      materials: ['3x Old Heavyweight T-Shirts', 'Heavy Duty Needle', 'Polyester Thread', 'Fabric Scissors', 'Pins'],
      steps: ['Remove the sleeves and neckline to create the bag opening and handles.', 'Turn the shirt inside out and pin the bottom hem securely.', 'Sew a double stitch across the bottom for maximum load strength.', 'Cut a 2-inch square from the bottom corners and stitch across to create a flat gusset base.']
    },
    { 
      _id: '4', 
      title: 'Glass Jar Terrarium', 
      cost: 150,
      description: 'Create a sealed, self-sustaining ecosystem inside a recycled glass jar. A beautiful piece of living art for your desk.',
      materials: ['1x Large Glass Jar with Lid', 'Activated Charcoal', 'Potting Soil', 'Moss & Small Ferns', 'Decorative Pebbles'],
      steps: ['Layer 1 inch of pebbles at the bottom for drainage.', 'Add a thin layer of activated charcoal to prevent mold growth.', 'Add 2 inches of slightly damp potting soil.', 'Carefully plant your moss and ferns using long tweezers, seal the jar, and place in indirect sunlight.']
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
    setMessage(`✅ Successfully purchased ${project.title}! You can now view the premium blueprint.`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-32 z-10 relative overflow-hidden">
      
      <Scroll3DWrapper className="text-center mb-16 max-w-4xl px-4">
        <h2 className="text-5xl font-bold mb-6 tracking-tight">Community Marketplace 🛒</h2>
        <p className="text-lg text-white/60 leading-relaxed">
          Access premium, highly-detailed blueprints curated by the NeoLab community. Spend the NeoCoins you've earned from upcycling to unlock permanent access to these advanced builds.
        </p>
      </Scroll3DWrapper>

      {message && (
        <Scroll3DWrapper className="w-full max-w-4xl px-4 mb-8">
          <div className="p-4 glass rounded-xl border border-neoAccent/50 text-sm animate-pulse-border text-center">
            {message}
          </div>
        </Scroll3DWrapper>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-5xl px-4">
        {projects.map((project, index) => {
          const isPurchased = purchasedProjects.includes(project._id);
          
          return (
            <Scroll3DWrapper key={project._id} className="h-full">
              <div className="glass p-10 rounded-3xl border border-neoBorder flex flex-col h-full hover-lift relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-neoAccent/5 rounded-bl-full group-hover:bg-neoAccent/10 transition-colors blur-2xl"></div>
                
                <h3 className="text-2xl font-bold mb-3 relative z-10">{project.title}</h3>
                <p className="text-sm text-white/60 mb-8 leading-relaxed relative z-10 flex-grow">{project.description}</p>
                
                <div className="relative z-10 mt-auto">
                  {!isPurchased ? (
                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Price</p>
                        <p className="text-xl text-neoAccent font-bold">{project.cost} Coins</p>
                      </div>
                      <button 
                        onClick={() => handlePurchase(project)}
                        className="px-8 py-3 bg-button-gradient border border-neoAccent/40 font-bold rounded-xl text-sm btn-spring"
                      >
                        Unlock Build
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                      <div>
                        <p className="text-sm text-green-400 font-bold flex items-center gap-2">
                          <span className="animate-pulse">🔓</span> Unlocked
                        </p>
                        <p className="text-xs text-white/40">Permanent Access</p>
                      </div>
                      <button 
                        onClick={() => setActiveBlueprint(activeBlueprint?._id === project._id ? null : project)}
                        className="px-8 py-3 bg-white/10 border border-white/20 font-bold rounded-xl text-sm btn-spring"
                      >
                        {activeBlueprint?._id === project._id ? 'Close Blueprint' : 'Open Blueprint'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Scroll3DWrapper>
          );
        })}
      </div>

      {activeBlueprint && (
        <Scroll3DWrapper className="mt-16 w-full max-w-5xl px-4">
          <div className="p-12 glass rounded-3xl border border-neoAccent/50 relative overflow-hidden ai-scanner">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neoAccent opacity-10 rounded-bl-full blur-3xl"></div>
            <h3 className="text-3xl font-bold mb-8 text-neoAccent">{activeBlueprint.title} Blueprint</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              <div className="md:col-span-1 glass p-6 rounded-2xl border border-white/10 h-fit">
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                  <span className="text-neoAccent">📦</span> Materials Required
                </h4>
                <ul className="list-disc pl-5 text-white/70 space-y-3 text-sm">
                  {activeBlueprint.materials.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                  <span className="text-neoAccent">🛠️</span> Construction Steps
                </h4>
                <ol className="list-decimal pl-5 text-white/70 space-y-6 text-sm leading-relaxed">
                  {activeBlueprint.steps.map((s, i) => <li key={i} className="pl-2">{s}</li>)}
                </ol>
              </div>
            </div>
          </div>
        </Scroll3DWrapper>
      )}
    </div>
  );
};

export default Marketplace;
