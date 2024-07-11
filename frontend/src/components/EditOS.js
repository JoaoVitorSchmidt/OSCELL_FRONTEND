import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditOS.css';

function EditOS({ onClose, onOSUpdated, data }) {
  const [formData, setFormData] = useState(data);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/client', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setClients(response.data);
    })
    .catch(error => console.error('Error fetching clients:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`http://localhost:8080/serviceOrder/${formData.sequence}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        onOSUpdated();
        onClose();
      } else {
        console.error('Failed to update:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  const handleClientChange = (e) => {
    const selectedClient = clients.find(client => client.clientName === e.target.value);
    if (selectedClient) {
      setFormData((prevData) => ({
        ...prevData,
        clientName: selectedClient.clientName,
        clientCPF: selectedClient.clientCPF,
        clientCell: selectedClient.clientCell,
        clientFixo: selectedClient.clientFixo,
        clientEmail: selectedClient.clientEmail
      }));
    }
  };

  return (
    <div className="edit-os-overlay">
      <div className="edit-os-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Editar OS</h2>
        <form>
          <label>
            Nome Cliente:
            <select name="clientName" value={formData.clientName} onChange={handleClientChange}>
              <option value="">Selecione</option>
              {clients.map(client => (
                <option key={client.sequence} value={client.clientName}>
                  {client.clientName}
                </option>
              ))}
            </select>
          </label>
          <label>
            CPF Cliente:
            <input
              type="text"
              name="clientCPF"
              value={formData.clientCPF}
              onChange={handleChange}
            />
          </label>
          <label>
            Marca:
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </label>
          <label>
            Modelo:
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
          </label>
          <label>
            Situação:
            <select
              name="situation"
              value={formData.situation}
              onChange={handleChange}
            >
              <option value="Pronto">Pronto</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Aguardando Peças">Aguardando Peças</option>
            </select>
          </label>
          <label>
            Informações passadas pelo cliente:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <div className="button-section">
            <button type="button" onClick={handleUpdate}>
              Atualizar
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

export default EditOS;
