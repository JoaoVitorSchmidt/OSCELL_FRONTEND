import React from 'react';
import './Sidebar.css';
import CustomIcon from './cellphone.png'; // Caminho para o ícone que você baixou

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={CustomIcon} alt="Ícone OS CELL" style={{ width: '32px' }} />
        <span>OSCELL</span>
      </div>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">OS's</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
