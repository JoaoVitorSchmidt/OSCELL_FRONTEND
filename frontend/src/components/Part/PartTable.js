import React, { useState, useEffect } from 'react';
import { FaFilter } from "react-icons/fa";
import './PartTable.css';
import InsertPart from './InsertPart';
import EditPart from './EditPart';
import axios from 'axios';

function PartTable() {
  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [partNames, setPartNames] = useState([]);
  const [selectedPartName, setSelectedPartName] = useState('');
  const [isInsertPartOpen, setIsInsertPartOpen] = useState(false);
  const [isEditPartOpen, setIsEditPartOpen] = useState(false);
  const [editPartData, setEditPartData] = useState(null);

  const fetchParts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/part', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const partsData = response.data;
        setParts(partsData);
        setFilteredParts(partsData);

        const uniquePartNames = Array.from(new Set(partsData.map((item) => item.partName)));
        setPartNames(uniquePartNames);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  const applyFilters = () => {
    const filtered = parts.filter((part) => {
      return selectedPartName === '' || part.partName === selectedPartName;
    });

    setFilteredParts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedPartName]);

  const handlePartNameFilterChange = (event) => {
    setSelectedPartName(event.target.value || '');
  };

  const openInsertPart = () => {
    setIsInsertPartOpen(true);
  };

  const closeInsertPart = () => {
    setIsInsertPartOpen(false);
  };

  const handlePartInserted = () => {
    fetchParts();
    setIsInsertPartOpen(false);
  };

  const handleEditPart = (partData) => {
    setEditPartData(partData);
    setIsEditPartOpen(true);
  };

  const handleDeletePart = async (partId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta peça?');
    if (confirmDelete) {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.delete(`http://localhost:8080/part/${partId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          fetchParts();
        } else {
          console.error('Failed to delete:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  return (
    <div>
      <div className="filters">
        <FaFilter className='filterIcon'/>
        <select value={selectedPartName} onChange={handlePartNameFilterChange}>
          <option value="">Nome Peça</option>
          {partNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button onClick={openInsertPart} className="insert-button-part-table">
          Inserir Peça
        </button>
      </div>
      {isInsertPartOpen && <InsertPart onClose={closeInsertPart} onPartInserted={handlePartInserted} />}
      {isEditPartOpen && <EditPart onClose={() => setIsEditPartOpen(false)} onPartUpdated={fetchParts} data={editPartData} />}
      <table className="part-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Custo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredParts.map((part, index) => (
            <tr key={index}>
              <td>{part.sequence}</td>
              <td>{part.partName}</td>
              <td>{part.partQuantity}</td>
              <td>{part.partCost}</td>
              <td>
                <button onClick={() => handleEditPart(part)}>Editar</button>
                <button onClick={() => handleDeletePart(part.sequence)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PartTable;
