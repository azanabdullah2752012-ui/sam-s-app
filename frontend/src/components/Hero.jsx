import React from 'react';

const Hero = () => {
  return (
    <section className="text-center py-24 relative overflow-hidden">
      {/* Decorative floating shapes */}
      <div className="absolute top-10 left-10 text-5xl animate-bounce" style={{animationDuration: '3s'}}>☁️</div>
      <div className="absolute top-20 right-20 text-6xl animate-bounce" style={{animationDuration: '4s'}}>☀️</div>
      <div className="absolute bottom-10 left-32 text-4xl animate-bounce" style={{animationDuration: '2.5s'}}>✨</div>
      
      <h1 className="text-7xl font-bold mb-6 text-ecoDark drop-shadow-md relative z-10">
        Fun DIY Projects! <span className="inline-block animate-bounce" style={{animationDuration: '2s'}}>🎨</span>
      </h1>
      
      <p className="text-2xl text-ecoDark/80 font-medium flex items-center justify-center gap-4 bg-white/60 backdrop-blur-sm mx-auto w-max px-8 py-4 rounded-full border-4 border-ecoDark shadow-bouncy z-10 relative">
        <span className="text-ecoYellow">⭐</span> 
        Pick what you have and find something cool to make! 
        <span className="text-ecoYellow">⭐</span>
      </p>
    </section>
  );
};

export default Hero;
