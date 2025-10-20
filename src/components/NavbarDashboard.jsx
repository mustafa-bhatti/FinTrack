import React from 'react';
import logo from '../assets/logo.png';
import { MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
export default function NavbarDashboard({ toggleSidebar }) {
  return (
    <div className="navbar-dashboard flex items-center gap-4 p-2 shadow-md">
      <button className="cursor-pointer">
        <MdMenu
          size={'2rem'}
          className="cursor-pointer"
          onClick={toggleSidebar}
        />
      </button>
      <Link to="/">
        <img
          src={logo} 
          alt="FinTrack Logo"
          className="w-[125px] cursor-pointer"
        />
      </Link>
    </div>
  );
}
