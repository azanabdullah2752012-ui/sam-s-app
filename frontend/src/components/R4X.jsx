import React from 'react';
import Scroll3DWrapper from './Scroll3DWrapper';
import { motion } from 'framer-motion';

const R4X = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-20 px-4">
      
      {/* Top Header */}
      <div className="w-full max-w-7xl mb-10 z-10 text-center">
        <h1 className="text-5xl font-bold mb-4 tracking-tight text-gray-900">
          R4X AI Assistant
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your personal 3D assistant. R4X is here to help you brainstorm eco-friendly projects and organize your toolkit.
        </p>
      </div>

      {/* Main Spline Container */}
      <div className="w-full max-w-7xl h-[700px] relative z-10 flex items-center justify-center bg-white/40 border border-black/10 rounded-3xl shadow-xl overflow-hidden glass hover-lift">
        
        {/* Floating UI Elements over the 3D model */}
        <div className="absolute top-8 left-8 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-black/10 text-sm font-semibold text-gray-900 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Online
        </div>

        {/* The R4X Bot */}
        <div className="w-[120%] h-[120%] relative flex items-center justify-center">
          <iframe 
            src="https://my.spline.design/r4xbot-N8mQ7Th4l37mz2C8pg1NIfQK/" 
            frameBorder="0" 
            width="100%" 
            height="100%"
            title="R4X Bot"
            className="pointer-events-auto"
          ></iframe>
        </div>

      </div>

      {/* Bottom Interface Mockup */}
      <div className="w-full max-w-3xl mt-12 z-10">
        <div className="glass p-6 rounded-2xl flex items-center gap-4 border border-black/10 shadow-lg">
          <input 
            type="text" 
            placeholder="Ask R4X anything about your eco-projects..." 
            className="flex-grow bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
          />
          <button className="bg-neoAccent text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition shadow-md">
            Send
          </button>
        </div>
      </div>

    </div>
  );
};

export default R4X;
