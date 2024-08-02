import React, { useState, useEffect } from 'react';
import { FaFilter } from "react-icons/fa";
import './ClientTable.css';
import InsertClient from './InsertClient';
import EditClient from './EditClient';
import axios from 'axios';

function ClientTable() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [clientNames, setClientNames] = useState([]);
  const [cpfValues, setCpfValues] = useState([]);
  const [cnpjValues, setCnpjValues] = useState([]);
  const [clientCellValues, setClientCellValues] = useState([]);
  const [clientFixoValues, setClientFixoValues] = useState([]);
  const [clientEmailValues, setClientEmailValues] = useState([]);
  const [selectedClientName, setSelectedClientName] = useState('');
  const [selectedClientCPF, setSelectedClientCPF] = useState('');
  const [selectedClientCNPJ, setSelectedClientCNPJ] = useState('');
  const [selectedClientCell, setSelectedClientCell] = useState('');
  const [selectedClientFixo, setSelectedClientFixo] = useState('');
  const [selectedClientEmail, setSelectedClientEmail] = useState('');
  const [isInsertClientOpen, setIsInsertClientOpen] = useState(false);
  const [isEditClientOpen, setIsEditClientOpen] = useState(false);
  const [editClientData, setEditClientData] = useState(null);

  const fetchClients = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/client', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const clientsData = response.data;
        setClients(clientsData);
        setFilteredClients(clientsData);

        const uniqueClientNames = Array.from(new Set(clientsData.map((item) => item.clientName)));
        setClientNames(uniqueClientNames);

        const uniqueCpfValues = Array.from(new Set(clientsData.map((item) => item.clientCPF)));
        setCpfValues(uniqueCpfValues);

        const uniqueCnpjValues = Array.from(new Set(clientsData.map((item) => item.clientCNPJ)));
        setCnpjValues(uniqueCnpjValues);

        const uniqueClientCellValues = Array.from(new Set(clientsData.map((item) => item.clientCell)));
        setClientCellValues(uniqueClientCellValues);

        const uniqueClientFixoValues = Array.from(new Set(clientsData.map((item) => item.clientFixo)));
        setClientFixoValues(uniqueClientFixoValues);

        const uniqueClientEmailValues = Array.from(new Set(clientsData.map((item) => item.clientEmail)));
        setClientEmailValues(uniqueClientEmailValues);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const applyFilters = () => {
    const filtered = clients.filter((client) => {
      return (
        (selectedClientName === '' || client.clientName === selectedClientName) &&
        (selectedClientCPF === '' || client.clientCPF === selectedClientCPF) &&
        (selectedClientCNPJ === '' || client.clientCNPJ === selectedClientCNPJ) &&
        (selectedClientCell === '' || client.clientCell === selectedClientCell) &&
        (selectedClientFixo === '' || client.clientFixo === selectedClientFixo) &&
        (selectedClientEmail === '' || client.clientEmail === selectedClientEmail)
      );
    });

    setFilteredClients(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedClientName, selectedClientCPF, selectedClientCNPJ, selectedClientCell, selectedClientFixo, selectedClientEmail]);

  const handleClientNameFilterChange = (event) => {
    setSelectedClientName(event.target.value || '');
  };

  const handleClientCPFFilterChange = (event) => {
    setSelectedClientCPF(event.target.value || '');
  };

  const handleClientCNPJFilterChange = (event) => {
    setSelectedClientCNPJ(event.target.value || '');
  };

  const handleClientCellFilterChange = (event) => {
    setSelectedClientCell(event.target.value || '');
  };

  const handleClientFixoFilterChange = (event) => {
    setSelectedClientFixo(event.target.value || '');
  };

  const handleClientEmailFilterChange = (event) => {
    setSelectedClientEmail(event.target.value || '');
  };

  const openInsertClient = () => {
    setIsInsertClientOpen(true);
  };

  const closeInsertClient = () => {
    setIsInsertClientOpen(false);
  };

  const handleClientInserted = () => {
    fetchClients();
    setIsInsertClientOpen(false);
  };

  const handleEditClient = (clientData) => {
    setEditClientData(clientData);
    setIsEditClientOpen(true);
  };

  const handleDeleteClient = async (clientId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este cliente?');
    if (confirmDelete) {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.delete(`http://localhost:8080/client/${clientId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          fetchClients();
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
        <select value={selectedClientName} onChange={handleClientNameFilterChange}>
          <option value="">Nome Cliente</option>
          {clientNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <select value={selectedClientCPF} onChange={handleClientCPFFilterChange}>
          <option value="">CPF Cliente</option>
          {cpfValues.map((cpf) => (
            <option key={cpf} value={cpf}>
              {cpf}
            </option>
          ))}
        </select>
        <select value={selectedClientCNPJ} onChange={handleClientCNPJFilterChange}>
          <option value="">CNPJ Cliente</option>
          {cnpjValues.map((cnpj) => (
            <option key={cnpj} value={cnpj}>
              {cnpj}
            </option>
          ))}
        </select>
        <select value={selectedClientCell} onChange={handleClientCellFilterChange}>
          <option value="">Celular Cliente</option>
          {clientCellValues.map((cell) => (
            <option key={cell} value={cell}>
              {cell}
            </option>
          ))}
        </select>
        <select value={selectedClientFixo} onChange={handleClientFixoFilterChange}>
          <option value="">Fixo Cliente</option>
          {clientFixoValues.map((fixo) => (
            <option key={fixo} value={fixo}>
              {fixo}
            </option>
          ))}
        </select>
        <select value={selectedClientEmail} onChange={handleClientEmailFilterChange}>
          <option value="">Email Cliente</option>
          {clientEmailValues.map((email) => (
            <option key={email} value={email}>
              {email}
            </option>
          ))}
        </select>
        <button onClick={openInsertClient} className="insert-button-client-table">
          Inserir Cliente
        </button>
      </div>
      {isInsertClientOpen && <InsertClient onClose={closeInsertClient} onClientInserted={handleClientInserted} />}
      {isEditClientOpen && <EditClient onClose={() => setIsEditClientOpen(false)} onClientUpdated={fetchClients} data={editClientData} />}
      <table className="client-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>CNPJ</th>
            <th>Celular</th>
            <th>Fixo</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client, index) => (
            <tr key={index}>
              <td>{client.sequence}</td>
              <td>{client.clientName}</td>
              <td>{client.clientCPF}</td>
              <td>{client.clientCNPJ}</td>
              <td>{client.clientCell}</td>
              <td>{client.clientFixo}</td>
              <td>{client.clientEmail}</td>
              <td>
                <button onClick={() => handleEditClient(client)}>Editar</button>
                <button onClick={() => handleDeleteClient(client.sequence)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientTable;
