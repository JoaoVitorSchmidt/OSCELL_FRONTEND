import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditPart.css';

function EditPart({ data, onClose, onServiceUpdated }) {
    const [partName, setPartName] = useState(data.partName);
    const [partQuantity, setpartQuantity] = useState(data.partQuantity);
    const [partCost, setpartCost] = useState(data.partCost);
  
    useEffect(() => {
        setPartName(data.partName);
        setpartQuantity(data.partQuantity);
        setpartCost(data.partCost);
    }, [data]);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
  
      const updatedPart = {
        partName,
        partQuantity,
        partCost: parseFloat(partCost),
      };
  
      try {
        const response = await axios.put(`http://localhost:8080/part/${data.sequence}`, updatedPart, {
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
        <div className="edit-part-overlay">
          <div className="edit-part-modal">
            <button className="close-button" onClick={onClose}>X</button>
            <h2>Editar Peça</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Nome:
                <input
                  type="text"
                  value={partName}
                  onChange={(e) => setPartName(e.target.value)}
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

export default EditPart;
