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
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
          setFilteredData(data);

          // Extract unique client names
          const uniqueClientNames = Array.from(new Set(data.map((item) => item.clientName)));
          setClientNames(uniqueClientNames);

          // Extract unique CPF values
          const uniqueCpfValues = Array.from(new Set(data.map((item) => item.clientCPF)));
          setCpfValues(uniqueCpfValues);

          // Extract unique brand values
          const uniqueBrandValues = Array.from(new Set(data.map((item) => item.brand)));
          setBrandValues(uniqueBrandValues);

          // Extract unique model values
          const uniqueModelValues = Array.from(new Set(data.map((item) => item.model)));
          setModelValues(uniqueModelValues);

          // Extract unique situation values
          const uniqueSituationValues = Array.from(new Set(data.map((item) => item.situation)));
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

    // Ordenando em ordem decrescente pelo número de sequência
    const sortedFiltered = filtered.sort((a, b) => b.sequence - a.sequence);

    setFilteredData(sortedFiltered);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedClient, selectedCPF, selectedBrand, selectedModel, selectedSituation]);

  const handleOSInserted = () => {
    // Fetch data again after insertion to update the table
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
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
          applyFilters(); // Aplicando filtros novamente após a inserção
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  };

  return (
    <div>
      <div className="filters">
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
        <button onClick={openInsertOS} className="insert-button">
          Inserir OS
        </button>
      </div>
      {isInsertOSOpen && <InsertOS onClose={closeInsertOS} onOSInserted={handleOSInserted} />}
      <table className="data-table">
        <thead>
          <tr>
            <th>Nº Sequencia</th>
            <th>Nome Cliente</th>
            <th>CPF Cliente</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Situação</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
