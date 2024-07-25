import React, { useState } from 'react';
import axios from 'axios';
import './InsertPart.css';

function InsertPart({ onClose, onpartInserted }) {
    const [partName, setpartName] = useState('');
    const [partQuantity, setpartQuantity] = useState('');
    const [partCost, setpartCost] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
  
      const newpart = {
        partName,
        partQuantity,
        partCost: parseFloat(partCost),
      };
  
      try {
        const response = await axios.post('http://localhost:8080/part', newpart, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 201) {
          onpartInserted(); // Atualiza a tabela
          onClose(); // Fecha a overlay após a inserção bem-sucedida
        } else {
          console.error('Failed to insert data:', response.statusText);
        }
      } catch (error) {
        console.error('Error inserting data:', error);
      }
    };
  
    return (
      <div className="insert-part-overlay">
        <div className="insert-part-modal">
          <button className="close-button" onClick={onClose}>X</button>
          <h2>Inserir Serviço</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input
                type="text"
                value={partName}
                onChange={(e) => setpartName(e.target.value)}
                required
              />
            </label>
            <label>
              Quantidade:
              <input
                type="number"
                value={partQuantity}
                onChange={(e) => setpartQuantity(e.target.value)}
                required
              />
            </label>
            <label>
              Custo:
              <input
                type="number"
                value={partCost}
                onChange={(e) => setpartCost(e.target.value)}
                required
              />
            </label>
            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    );
  }

export default InsertPart;
