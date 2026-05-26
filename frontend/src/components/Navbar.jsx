import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ coinBalance }) => {
  return (
    <nav className="flex justify-between items-center p-6 border-b border-lightPurple">
      <h1 className="text-2xl font-bold tracking-tight">Eco Remix <span className="text-accentPurple">NEO</span></h1>
      <div className="space-x-4">
        <NavLink to="/" className={({isActive}) => isActive ? "bg-lightPurple px-4 py-2 rounded-full" : "px-4 py-2 hover:bg-lightPurple rounded-full transition"}>Home</NavLink>
        <NavLink to="/marketplace" className={({isActive}) => isActive ? "bg-lightPurple px-4 py-2 rounded-full" : "px-4 py-2 hover:bg-lightPurple rounded-full transition"}>Marketplace</NavLink>
        <NavLink to="/planner" className={({isActive}) => isActive ? "bg-lightPurple px-4 py-2 rounded-full" : "px-4 py-2 hover:bg-lightPurple rounded-full transition"}>Planner</NavLink>
      </div>
      <div className="bg-lightPurple px-4 py-2 rounded-full flex items-center gap-2 border border-accentPurple/30">
        <span>🪙</span> {coinBalance} Coins
      </div>
    </nav>
  );
};

export default Navbar;
