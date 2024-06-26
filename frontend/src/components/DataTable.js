import React, { useEffect, useState } from 'react';
import './DataTable.css';

function DataTable() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8080/serviceOrder')
      .then(response => response.json())
      .then(data => setData(Array.isArray(data) ? data : []))
      .catch(error => console.error('Error fetching data:', error));
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