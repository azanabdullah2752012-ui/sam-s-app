import React from 'react';
import Scroll3DWrapper from './Scroll3DWrapper';

const About = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-32 z-10 relative overflow-hidden">
      
      {/* Hero Section */}
      <Scroll3DWrapper className="max-w-4xl px-6 text-center mb-32">
        <h1 className="text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          The Eco Remix Manifesto
        </h1>
        <p className="text-xl text-white/70 leading-relaxed mb-8">
          We are not just a website. We are a global initiative designed to gamify, accelerate, and incentivize the upcycling of household waste into premium, functional art. Welcome to the Resistance.
        </p>
        <div className="w-24 h-1 bg-neoAccent mx-auto rounded-full shadow-[0_0_15px_rgba(202,156,225,0.6)]"></div>
      </Scroll3DWrapper>

      {/* Origin Story Section */}
      <Scroll3DWrapper className="max-w-5xl px-6 mb-32">
        <div className="glass p-12 rounded-3xl border border-neoBorder hover-lift flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-neoAccent">The Global Trash Crisis</h2>
            <p className="text-white/70 mb-4 leading-relaxed">
              Every year, over 2.12 billion tons of waste are dumped globally. We looked at the overflowing landfills, the plastic oceans, and the sheer volume of perfectly good cardboard and fabric being incinerated, and we decided: <strong>enough is enough.</strong>
            </p>
            <p className="text-white/70 leading-relaxed">
              Eco Remix Studio was born in the neon-lit depths of the NeoLab. We fused gamification with environmentalism. We built a platform that rewards you with NeoCoins for turning trash into treasure, effectively crowdsourcing planetary salvation.
            </p>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-neoAccent/20 blur-[100px] rounded-full"></div>
            <div className="glass p-6 rounded-2xl border border-white/10 text-center relative z-10 ai-scanner">
              <span className="text-6xl mb-4 block animate-float">🌍</span>
              <h3 className="font-bold text-xl mb-2">Planetary Defense System</h3>
              <p className="text-xs text-white/50">Active upcycling nodes online.</p>
            </div>
          </div>
        </div>
      </Scroll3DWrapper>

      {/* Core Pillars */}
      <Scroll3DWrapper className="max-w-6xl px-6 mb-32">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Core Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass p-8 rounded-2xl border border-neoBorder hover-lift delay-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neoBlue/10 rounded-bl-full group-hover:bg-neoBlue/20 transition-colors"></div>
            <span className="text-4xl mb-6 block animate-pulse">🛠️</span>
            <h3 className="text-2xl font-bold mb-4">Make</h3>
            <p className="text-white/60 leading-relaxed">
              We provide you with the most advanced, AI-generated blueprints in the world. Whether it's a simple desk organizer or a complex hydroponic system out of plastic bottles, we give you the exact steps.
            </p>
          </div>

          <div className="glass p-8 rounded-2xl border border-neoBorder hover-lift delay-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full group-hover:bg-green-500/20 transition-colors"></div>
            <span className="text-4xl mb-6 block animate-pulse">🌱</span>
            <h3 className="text-2xl font-bold mb-4">Sustain</h3>
            <p className="text-white/60 leading-relaxed">
              By keeping materials out of the landfill, we reduce the carbon footprint of manufacturing new goods. Every project built is a direct strike against hyper-consumerism.
            </p>
          </div>

          <div className="glass p-8 rounded-2xl border border-neoBorder hover-lift delay-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-bl-full group-hover:bg-yellow-500/20 transition-colors"></div>
            <span className="text-4xl mb-6 block animate-pulse">🏆</span>
            <h3 className="text-2xl font-bold mb-4">Earn</h3>
            <p className="text-white/60 leading-relaxed">
              We gamify the experience. Snap a photo of your completed project, let our Magic Brain AI scan it, and earn NeoCoins. Use your coins to unlock premium community blueprints in the Marketplace!
            </p>
          </div>

        </div>
      </Scroll3DWrapper>

      {/* The Future Section */}
      <Scroll3DWrapper className="max-w-4xl px-6 text-center">
        <div className="glass p-16 rounded-3xl border border-neoAccent/40 ai-scanner">
          <h2 className="text-4xl font-bold mb-6 text-white">The Future is 10X</h2>
          <p className="text-lg text-white/80 leading-relaxed mb-8">
            We are constantly evolving. Soon, we will deploy real-time Gemini AI vision tracking, WebGL interactive 3D models for your blueprints, and Augmented Reality projections so you can see your upcycled creations before you even build them.
          </p>
          <button className="px-8 py-4 bg-button-gradient border border-neoAccent/40 font-bold rounded-xl btn-spring">
            Join the Discord (Coming Soon)
          </button>
        </div>
      </Scroll3DWrapper>

    </div>
  );
};

export default About;
