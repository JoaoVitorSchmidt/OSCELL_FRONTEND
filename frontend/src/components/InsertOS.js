import React, { useState } from 'react';
import './InsertOS.css';

function InsertOS({ onClose }) {
  const [newOS, setNewOS] = useState({
    clientName: '',
    clientCPF: '',
    brand: '',
    model: '',
    situation: '',
    clientCell: '',
    clientFixo: '',
    clientEmail: '',
    description: '',
    userSys: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOS((prevOS) => ({
      ...prevOS,
      [name]: value
    }));
  };

  const handleInsert = () => {
    const token = localStorage.getItem('token');
    const userSys = localStorage.getItem('username'); // Obtém o nome do usuário do localStorage
    const data = { ...newOS, userSys }; // Adiciona o nome do usuário aos dados a serem enviados
  
    fetch('http://localhost:8080/serviceOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
        <input
          type="text"
          name="clientCell"
          placeholder="Celular Cliente"
          value={newOS.clientCell}
          onChange={handleChange}
        />
        <input
          type="text"
          name="clientFixo"
          placeholder="Telefone Fixo Cliente"
          value={newOS.clientFixo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="clientEmail"
          placeholder="Email Cliente"
          value={newOS.clientEmail}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Descrição do Defeito"
          value={newOS.description}
          onChange={handleChange}
        />
        <button onClick={handleInsert}>Inserir OS</button>
      </div>
    </div>
  );
}

export default InsertOS;
