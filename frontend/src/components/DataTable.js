import React, { useEffect, useState } from 'react';
import './DataTable.css';

function DataTable() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/serviceOrder', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setData(Array.isArray(data) ? data : []);
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Número Sequência</th>
            <th>Nome Cliente</th>
            <th>CPF Cliente</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map((row, index) => (
            <tr key={index}>
              <td>{row.sequence}</td>
              <td>{row.clientName}</td>
              <td>{row.clientCPF}</td>
              <td>{row.brand}</td>
              <td>{row.model}</td>
              <td>{row.situation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
