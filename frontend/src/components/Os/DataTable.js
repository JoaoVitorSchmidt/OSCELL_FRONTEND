import React, { useState, useEffect } from 'react';
import './DataTable.css';
import InsertOS from './InsertOS';
import EditOS from './EditOs';
import axios from 'axios';
import { FaFilter } from "react-icons/fa";

function DataTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [clientNames, setClientNames] = useState([]);
  const [cpfValues, setCpfValues] = useState([]);
  const [brandValues, setBrandValues] = useState([]);
  const [modelValues, setModelValues] = useState([]);
  const [situationValues, setSituationValues] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedCPF, setSelectedCPF] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedSituation, setSelectedSituation] = useState('');
  const [isInsertOSOpen, setIsInsertOSOpen] = useState(false);
  const [insertOSData, setInsertOSData] = useState(null);
  const [isEditOSOpen, setIsEditOSOpen] = useState(false);
  const [editOSData, setEditOSData] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/serviceOrder', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setData(data);
        setFilteredData(data);

        const uniqueClientNames = Array.from(new Set(data.map((item) => item.clientName)));
        setClientNames(uniqueClientNames);

        const uniqueCpfValues = Array.from(new Set(data.map((item) => item.clientCPF)));
        setCpfValues(uniqueCpfValues);

        const uniqueBrandValues = Array.from(new Set(data.map((item) => item.brand)));
        setBrandValues(uniqueBrandValues);

        const uniqueModelValues = Array.from(new Set(data.map((item) => item.model)));
        setModelValues(uniqueModelValues);

        const uniqueSituationValues = Array.from(new Set(data.map((item) => item.situation)));
        setSituationValues(uniqueSituationValues);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openInsertOS = () => {
    setIsInsertOSOpen(true);
  };

  const closeInsertOS = () => {
    setIsInsertOSOpen(false);
    setInsertOSData(null);
  };

  const handleClientFilterChange = (event) => {
    setSelectedClient(event.target.value || '');
  };

  const handleCPFFilterChange = (event) => {
    setSelectedCPF(event.target.value || '');
  };

  const handleBrandFilterChange = (event) => {
    setSelectedBrand(event.target.value || '');
  };

  const handleModelFilterChange = (event) => {
    setSelectedModel(event.target.value || '');
  };

  const handleSituationFilterChange = (event) => {
    setSelectedSituation(event.target.value || '');
  };

  const applyFilters = () => {
    const filtered = data.filter((item) => {
      return (
        (selectedClient === '' || item.clientName === selectedClient) &&
        (selectedCPF === '' || item.clientCPF === selectedCPF) &&
        (selectedBrand === '' || item.brand === selectedBrand) &&
        (selectedModel === '' || item.model === selectedModel) &&
        (selectedSituation === '' || item.situation === selectedSituation)
      );
    });

    const sortedFiltered = filtered.sort((a, b) => b.sequence - a.sequence);
    setFilteredData(sortedFiltered);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedClient, selectedCPF, selectedBrand, selectedModel, selectedSituation]);

  const handleOSInserted = () => {
    fetchData();
    setIsInsertOSOpen(false);
  };

  const handleEditar = (osData) => {
    setEditOSData(osData);
    setIsEditOSOpen(true);
  };

  const handleExcluir = async (sequence) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta ordem de serviço?');
    if (confirmDelete) {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.delete(`http://localhost:8080/serviceOrder/${sequence}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          fetchData();
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
        <select value={selectedClient} onChange={handleClientFilterChange}>
          <option value="">Nome Cliente</option>
          {clientNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <select value={selectedCPF} onChange={handleCPFFilterChange}>
          <option value="">CPF Cliente</option>
          {cpfValues.map((cpf) => (
            <option key={cpf} value={cpf}>
              {cpf}
            </option>
          ))}
        </select>
        <select value={selectedBrand} onChange={handleBrandFilterChange}>
          <option value="">Marca</option>
          {brandValues.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <select value={selectedModel} onChange={handleModelFilterChange}>
          <option value="">Modelo</option>
          {modelValues.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
        <select value={selectedSituation} onChange={handleSituationFilterChange}>
          <option value="">Situação</option>
          {situationValues.map((situation) => (
            <option key={situation} value={situation}>
              {situation}
            </option>
          ))}
        </select>
        <button onClick={openInsertOS} className="insert-button-data-table">
          Inserir OS
        </button>
      </div>
      {isInsertOSOpen && <InsertOS onClose={closeInsertOS} onOSInserted={handleOSInserted} data={insertOSData} />}
      {isEditOSOpen && <EditOS onClose={() => setIsEditOSOpen(false)} onOSUpdated={fetchData} data={editOSData} />}
      <table className="data-table">
        <thead>
          <tr>
            <th>Nº Sequencia</th>
            <th>Nome Cliente</th>
            <th>CPF Cliente</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Situação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.sequence}</td>
              <td>{item.clientName}</td>
              <td>{item.clientCPF}</td>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>{item.situation}</td>
              <td>
                <button onClick={() => handleEditar(item)}>Editar</button>
                <button onClick={() => handleExcluir(item.sequence)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
