import React from 'react';
import Sidebar from './Sidebar'; // Importando o componente Sidebar
import './Home.css';

function Home() {
  return (
    <div className="home">
      <Sidebar /> {/* Incluindo o Sidebar na página Home */}
      <div className="content">
        <h1>Home</h1>
        <p>Bem-vindo à página inicial!</p>
      </div>
    </div>
  );
}

export default Home;
