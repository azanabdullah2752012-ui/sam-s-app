import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-8 bg-darkPurple shadow-glass glass mb-8">
      <div className="text-2xl font-bold text-accentPurple">Eco Remix Studio</div>
      <div className="flex gap-6">
        <NavLink to="/" className={({ isActive }) => isActive ? 'text-accentPurple font-semibold' : 'text-gray-300'}>Home</NavLink>
        <NavLink to="/marketplace" className={({ isActive }) => isActive ? 'text-accentPurple font-semibold' : 'text-gray-300'}>Projects</NavLink>
        <NavLink to="/toolkit" className={({ isActive }) => isActive ? 'text-accentPurple font-semibold' : 'text-gray-300'}>Toolkit</NavLink>
        <NavLink to="/progress" className={({ isActive }) => isActive ? 'text-accentPurple font-semibold' : 'text-gray-300'}>My Progress</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'text-accentPurple font-semibold' : 'text-gray-300'}>About</NavLink>
      </div>
    </nav>
  );
}
