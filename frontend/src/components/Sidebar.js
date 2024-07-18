import React from 'react';
import { IoPhonePortraitOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './Sidebar.css';
import LogoutButton from './LogoutButton';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <IoPhonePortraitOutline className="icon" />
        <span className="logo-text">OSCELL</span>
      </div>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/os">OS's</Link></li>
        <li><Link to="/clients">Clientes</Link></li>
      </ul>
      <div className="logout-container">
        <LogoutButton />
      </div>
    </div>
  );
}

export default Sidebar;
