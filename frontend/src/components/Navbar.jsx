import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ coinBalance }) => {
  const linkBase = "px-5 py-2.5 rounded-full font-semibold border-2 transition-all duration-200 bouncy-hover";
  const getLinkClass = ({ isActive }) => 
    isActive 
      ? `${linkBase} bg-ecoYellow border-ecoDark shadow-bouncy translate-y-[-2px]` 
      : `${linkBase} bg-white border-ecoDark/20 text-ecoDark/70 hover:border-ecoDark hover:text-ecoDark hover:shadow-bouncy`;

  return (
    <nav className="flex justify-between items-center p-6 bg-white border-b-4 border-ecoDark shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-ecoGreen rounded-full border-4 border-ecoDark flex items-center justify-center text-white text-2xl shadow-bouncy">
          ♻️
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Eco Remix <span className="text-ecoPink">Studio</span></h1>
      </div>
      
      <div className="hidden md:flex space-x-4">
        <NavLink to="/" className={getLinkClass}>🏠 Home</NavLink>
        <NavLink to="/marketplace" className={getLinkClass}>🛍️ Projects</NavLink>
        <NavLink to="/planner" className={getLinkClass}>📝 Planner</NavLink>
      </div>

      <div className="bg-ecoBlue px-5 py-2.5 rounded-full border-4 border-ecoDark font-bold text-xl flex items-center gap-2 shadow-bouncy">
        <span>🪙</span> {coinBalance}
      </div>
    </nav>
  );
};

export default Navbar;
