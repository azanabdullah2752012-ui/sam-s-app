import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ coinBalance }) => {
  const linkBase = "px-4 py-1.5 rounded-full text-sm font-medium transition-colors";
  const getLinkClass = ({ isActive }) => 
    isActive 
      ? `${linkBase} bg-[rgba(89,46,131,0.6)] text-gray-900 border border-neoBorder` 
      : `${linkBase} text-gray-600 hover:text-gray-900`;

  return (
    <nav className="flex justify-between items-center px-12 py-6 w-full absolute top-0 left-0 z-50">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 border border-black/20 rounded-full flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
            <path d="M2 12c0-5.52 4.48-10 10-10 5.52 0 10 4.48 10 10 0 5.52-4.48 10-10 10-5.52 0-10-4.48-10-10z"></path>
            <path d="M12 8v4l3 3"></path>
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-wide">Eco Remix Studio</h1>
          <p className="text-[10px] tracking-[0.2em] text-neoAccent uppercase">Neo Lab</p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <NavLink to="/" className={getLinkClass}>Home</NavLink>
        <NavLink to="/assistant" className={getLinkClass}>Assistant</NavLink>
        <NavLink to="/marketplace" className={getLinkClass}>Projects</NavLink>
        <NavLink to="/toolkit" className={getLinkClass}>Toolkit</NavLink>
        <NavLink to="/progress" className={getLinkClass}>My Progress</NavLink>
        <NavLink to="/about" className={getLinkClass}>About</NavLink>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-black/50 px-4 py-1.5 rounded-full border border-neoBorder text-sm font-medium flex items-center gap-2">
          <span className="text-neoAccent font-bold">S</span> Coins: {coinBalance}
        </div>
        <div className="bg-black/50 px-4 py-1.5 rounded-full border border-neoBorder text-sm font-medium flex items-center gap-2">
          <span>🔥</span> Streak: 7-day
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
