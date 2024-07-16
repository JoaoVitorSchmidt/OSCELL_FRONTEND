import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import CustomIcon from './photos/cellphone.png'; // Caminho para o ícone que você baixou

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={CustomIcon} alt="Ícone OS CELL" style={{ width: '32px' }} />
        <span>OSCELL</span>
      </div>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/os">OS's</Link></li>
        <li><Link to="/clients">Clientes</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
