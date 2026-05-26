import React from 'react';
import { motion } from 'framer-motion';

const R4X = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-end pb-12 px-4 relative">
      
      {/* Full-Screen Spline Background (Specific to this page) */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[100%] h-[100%] relative">
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

      {/* Floating UI Elements over the 3D model */}
      <div className="fixed top-24 left-8 z-10 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-black/10 text-sm font-semibold text-gray-900 flex items-center gap-2 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        System Online
      </div>

      {/* Bottom Interface Mockup */}
      <div className="w-full max-w-3xl z-10 relative mt-auto">
        <div className="glass p-4 md:p-6 rounded-2xl flex items-center gap-4 border border-black/10 shadow-2xl">
          <input 
            type="text" 
            placeholder="Ask R4X anything..." 
            className="flex-grow bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 font-medium"
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
