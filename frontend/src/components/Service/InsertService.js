import React, { useState } from 'react';
import axios from 'axios';
import './InsertService.css';

function InsertService({ onClose, onServiceInserted }) {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceValue, setServiceValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const newService = {
      serviceName,
      serviceDescription,
      serviceValue: parseFloat(serviceValue),
    };

    try {
      const response = await axios.post('http://localhost:8080/services', newService, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        onServiceInserted(); // Atualiza a tabela
        onClose(); // Fecha a overlay após a inserção bem-sucedida
      } else {
        console.error('Failed to insert data:', response.statusText);
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <div className="insert-service-overlay">
      <div className="insert-service-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Inserir Serviço</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              required
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Valor:
            <input
              type="number"
              value={serviceValue}
              onChange={(e) => setServiceValue(e.target.value)}
              required
            />
          </label>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default InsertService;
