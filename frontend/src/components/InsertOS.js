import React, { useState } from 'react';
import './InsertOS.css';

function InsertOS({ onClose }) {
  const [newOS, setNewOS] = useState({
    clientName: '',
    clientCPF: '',
    brand: '',
    model: '',
    situation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOS((prevOS) => ({
      ...prevOS,
      [name]: value
    }));
  };

  const handleInsert = () => {
    const token = localStorage.getItem('token'); // Obtenha o token JWT do armazenamento local
    const data = { ...newOS }; // Use o estado newOS como os dados a serem enviados
  
    fetch('http://localhost:8080/serviceOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Inclua o token JWT no cabeçalho da requisição
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));    
  };

  return (
    <div className="insert-os-overlay">
      <div className="insert-os-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Inserir nova OS</h2>
        <input
          type="text"
          name="clientName"
          placeholder="Nome Cliente"
          value={newOS.clientName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="clientCPF"
          placeholder="CPF Cliente"
          value={newOS.clientCPF}
          onChange={handleChange}
        />
        <input
          type="text"
          name="brand"
          placeholder="Marca"
          value={newOS.brand}
          onChange={handleChange}
        />
        <input
          type="text"
          name="model"
          placeholder="Modelo"
          value={newOS.model}
          onChange={handleChange}
        />
        <input
          type="text"
          name="situation"
          placeholder="Situação"
          value={newOS.situation}
          onChange={handleChange}
        />
        <button onClick={handleInsert}>Inserir OS</button>
      </div>
    </div>
  );
}

export default InsertOS;
