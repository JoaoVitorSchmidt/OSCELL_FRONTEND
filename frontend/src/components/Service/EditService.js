import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditService.css';

function EditService({ data, onClose, onServiceUpdated }) {
  const [serviceName, setServiceName] = useState(data.serviceName);
  const [serviceDescription, setServiceDescription] = useState(data.serviceDescription);
  const [serviceValue, setServiceValue] = useState(data.serviceValue);

  useEffect(() => {
    setServiceName(data.serviceName);
    setServiceDescription(data.serviceDescription);
    setServiceValue(data.serviceValue);
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const updatedService = {
      serviceName,
      serviceDescription,
      serviceValue: parseFloat(serviceValue),
    };

    try {
      const response = await axios.put(`http://localhost:8080/services/${data.sequence}`, updatedService, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        onServiceUpdated();
        onClose();
      } else {
        console.error('Failed to update data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="edit-service-overlay">
      <div className="edit-service-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Editar Serviço</h2>
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

export default EditService;
