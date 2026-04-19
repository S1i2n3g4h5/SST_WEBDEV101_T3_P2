import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, BarChart3, PlusCircle } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass">
      <div className="nav-logo">
        <span className="logo-icon">🚀</span>
        <span className="logo-text">JobTracker</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/applications" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <Briefcase size={20} />
          <span>Applications</span>
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <BarChart3 size={20} />
          <span>Analytics</span>
        </NavLink>
      </div>
      <NavLink to="/applications/new" className="nav-btn">
        <PlusCircle size={20} />
        <span>Add Job</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
