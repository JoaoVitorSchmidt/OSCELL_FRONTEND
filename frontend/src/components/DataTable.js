import React, { useState, useEffect } from 'react';
import './DataTable.css';
import InsertOS from './InsertOS';

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
          setData(data);
          setFilteredData(data);

          // Extract unique client names
          const uniqueClientNames = Array.from(new Set(data.map(item => item.clientName)));
          setClientNames(uniqueClientNames);

          // Extract unique CPF values
          const uniqueCpfValues = Array.from(new Set(data.map(item => item.clientCPF)));
          setCpfValues(uniqueCpfValues);

          // Extract unique brand values
          const uniqueBrandValues = Array.from(new Set(data.map(item => item.brand)));
          setBrandValues(uniqueBrandValues);

          // Extract unique model values
          const uniqueModelValues = Array.from(new Set(data.map(item => item.model)));
          setModelValues(uniqueModelValues);

          // Extract unique situation values
          const uniqueSituationValues = Array.from(new Set(data.map(item => item.situation)));
          setSituationValues(uniqueSituationValues);

        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openInsertOS = () => {
    setIsInsertOSOpen(true);
  };

  const closeInsertOS = () => {
    setIsInsertOSOpen(false);
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

  useEffect(() => {
    let filtered = [...data];

    if (selectedClient) {
      filtered = filtered.filter(item => item.clientName && item.clientName.toLowerCase().includes(selectedClient.toLowerCase()));
    }
    if (selectedCPF) {
      filtered = filtered.filter(item => item.clientCPF && item.clientCPF.toLowerCase().includes(selectedCPF.toLowerCase()));
    }
    if (selectedBrand) {
      filtered = filtered.filter(item => item.brand && item.brand.toLowerCase().includes(selectedBrand.toLowerCase()));
    }
    if (selectedModel) {
      filtered = filtered.filter(item => item.model && item.model.toLowerCase().includes(selectedModel.toLowerCase()));
    }
    if (selectedSituation) {
      filtered = filtered.filter(item => item.situation && item.situation.toLowerCase().includes(selectedSituation.toLowerCase()));
    }

    setFilteredData(filtered);
  }, [selectedClient, selectedCPF, selectedBrand, selectedModel, selectedSituation]);

  return (
    <div className="data-table">
      <div className="filters">
        <div className="filter">
          <label htmlFor="clientFilter">Cliente:</label>
          <select id="clientFilter" value={selectedClient} onChange={handleClientFilterChange}>
            <option value="">Todos</option>
            {clientNames.map((client, index) => (
              <option key={index} value={client}>{client}</option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="cpfFilter">CPF:</label>
          <select id="cpfFilter" value={selectedCPF} onChange={handleCPFFilterChange}>
            <option value="">Todos</option>
            {cpfValues.map((cpf, index) => (
              <option key={index} value={cpf}>{cpf}</option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="brandFilter">Marca:</label>
          <select id="brandFilter" value={selectedBrand} onChange={handleBrandFilterChange}>
            <option value="">Todos</option>
            {brandValues.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="modelFilter">Modelo:</label>
          <select id="modelFilter" value={selectedModel} onChange={handleModelFilterChange}>
            <option value="">Todos</option>
            {modelValues.map((model, index) => (
              <option key={index} value={model}>{model}</option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="situationFilter">Situação:</label>
          <select id="situationFilter" value={selectedSituation} onChange={handleSituationFilterChange}>
            <option value="">Todos</option>
            {situationValues.map((situation, index) => (
              <option key={index} value={situation}>{situation}</option>
            ))}
          </select>
        </div>
        <div className="buttons-container">
          <button className="open-insert-os-button" onClick={openInsertOS}>
            Inserir OS
          </button>
        </div>
      </div>
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
          {filteredData.map((row, index) => (
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
      {isInsertOSOpen && <InsertOS onClose={closeInsertOS} />}
    </div>
  );
}

export default DataTable;