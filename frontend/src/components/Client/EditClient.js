import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditClient.css';

function EditClient({ onClose, onClientUpdated, data }) {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`http://localhost:8080/client/${formData.sequence}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        onClientUpdated();
        onClose();
      } else {
        console.error('Failed to update:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  return (
    <div className="edit-client-overlay">
      <div className="edit-client-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Editar Cliente</h2>
        <form>
          <label>
            Nome:
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
            />
          </label>
          <label>
            CPF:
            <input
              type="text"
              name="clientCPF"
              value={formData.clientCPF}
              onChange={handleChange}
            />
          </label>
          <label>
            CNPJ:
            <input
              type="text"
              name="clientCNPJ"
              value={formData.clientCNPJ}
              onChange={handleChange}
            />
          </label>
          <label>
            Celular:
            <input
              type="text"
              name="clientCell"
              value={formData.clientCell}
              onChange={handleChange}
            />
          </label>
          <label>
            Fixo:
            <input
              type="text"
              name="clientFixo"
              value={formData.clientFixo}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="clientEmail"
              value={formData.clientEmail}
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

export default EditClient;
