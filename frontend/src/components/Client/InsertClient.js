import React, { useState } from 'react';
import axios from 'axios';
import './InsertClient.css';

function InsertClient({ onClose, onClientInserted }) {
  const [newClient, setNewClient] = useState({
    clientName: '',
    clientCPF: '',
    clientCNPJ: '',
    clientCell: '',
    clientFixo: '',
    clientEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value
    }));
  };

  const handleInsert = () => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:8080/client', newClient, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        onClientInserted();
        onClose();
      }
    })
    .catch(error => {
      console.error('Error inserting client:', error);
    });
  };

  return (
    <div className="insert-client-overlay">
      <div className="insert-client-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Inserir Cliente</h2>
        <form>
          <label>
            Nome:
            <input
              type="text"
              name="clientName"
              value={newClient.clientName}
              onChange={handleChange}
            />
          </label>
          <label>
            CPF:
            <input
              type="text"
              name="clientCPF"
              value={newClient.clientCPF}
              onChange={handleChange}
            />
          </label>
          <label>
            CNPJ:
            <input
              type="text"
              name="clientCNPJ"
              value={newClient.clientCNPJ}
              onChange={handleChange}
            />
          </label>
          <label>
            Celular:
            <input
              type="text"
              name="clientCell"
              value={newClient.clientCell}
              onChange={handleChange}
            />
          </label>
          <label>
            Fixo:
            <input
              type="text"
              name="clientFixo"
              value={newClient.clientFixo}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="clientEmail"
              value={newClient.clientEmail}
              onChange={handleChange}
            />
          </label>
          <div className="button-section">
            <button type="button" onClick={handleInsert}>
              Inserir
            </button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InsertClient;
