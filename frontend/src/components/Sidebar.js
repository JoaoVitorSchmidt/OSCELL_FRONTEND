import React from 'react';
import { MdOutlineDesignServices } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { FaTools } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './Sidebar.css';
import LogoutButton from './LogoutButton';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-text">OSCELL</span>
      </div>
      <ul>
        <li><Link to="/home"><IoHome className='icons'/>Home</Link></li>
        <li><Link to="/os"><MdOutlineDesignServices className='icons'/>OS's</Link></li>
        <li><Link to="/clients"><IoPeopleSharp className='icons'/>Clientes</Link></li>
        <li><Link to="/services"><FaTools className='icons'/>Serviços</Link></li>
        <li><Link to="/parts"><FaGear className='icons'/>Peças</Link></li>
      </ul>
      <div className="logout-container">
        <LogoutButton />
      </div>
    </div>
  );
}

export default Sidebar;
