import React from 'react';
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    
    navigate('/');
  };

  return (
        
        <button onClick={handleLogout} className="logout-button">
        <IoLogOut className='IoLogOut'/>
        Sair
        </button>
  );
};

export default LogoutButton;
