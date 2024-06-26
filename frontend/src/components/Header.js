import React from 'react';
import './Header.css';
import { ReactComponent as CellphoneIcon } from './cellphone.svg'; // Ensure you have a SVG file named 'cellphone.svg'

function Header() {
  return (
    <div className="header">
      <div className="sidebar">
        <CellphoneIcon className="logo" />
        <h1>OS CELL</h1>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/os">OS Page</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
