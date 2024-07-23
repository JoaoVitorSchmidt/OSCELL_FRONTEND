import React, { useState, useEffect } from 'react';
import { FaFilter } from "react-icons/fa";
import './ServiceTable.css';
import InsertService from './InsertService';
import EditService from './EditService';
import axios from 'axios';

function ServiceTable() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [serviceNames, setServiceNames] = useState([]);
  const [selectedServiceName, setSelectedServiceName] = useState('');
  const [isInsertServiceOpen, setIsInsertServiceOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [editServiceData, setEditServiceData] = useState(null);

  const fetchServices = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/services', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const servicesData = response.data;
        setServices(servicesData);
        setFilteredServices(servicesData);

        const uniqueServiceNames = Array.from(new Set(servicesData.map((item) => item.serviceName)));
        setServiceNames(uniqueServiceNames);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const applyFilters = () => {
    const filtered = services.filter((service) => {
      return (
        selectedServiceName === '' || service.serviceName === selectedServiceName
      );
    });

    setFilteredServices(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedServiceName]);

  const handleServiceNameFilterChange = (event) => {
    setSelectedServiceName(event.target.value || '');
  };

  const openInsertService = () => {
    setIsInsertServiceOpen(true);
  };

  const closeInsertService = () => {
    setIsInsertServiceOpen(false);
  };

  const handleServiceInserted = () => {
    fetchServices();
    closeInsertService();
  };

  const handleEditService = (serviceData) => {
    setEditServiceData(serviceData);
    setIsEditServiceOpen(true);
  };

  const handleDeleteService = async (serviceId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este serviço?');
    if (confirmDelete) {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.delete(`http://localhost:8080/services/${serviceId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          fetchServices();
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
        <select value={selectedServiceName} onChange={handleServiceNameFilterChange}>
          <option value="">Nome Serviço</option>
          {serviceNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button onClick={openInsertService} className="insert-button">
          Inserir Serviço
        </button>
      </div>
      {isInsertServiceOpen && <InsertService onClose={closeInsertService} onServiceInserted={handleServiceInserted} />}
      {isEditServiceOpen && <EditService onClose={() => setIsEditServiceOpen(false)} onServiceUpdated={fetchServices} data={editServiceData} />}
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service, index) => (
            <tr key={index}>
              <td>{service.sequence}</td>
              <td>{service.serviceName}</td>
              <td>{service.serviceDescription}</td>
              <td>{service.serviceValue}</td>
              <td>
                <button onClick={() => handleEditService(service)}>Editar</button>
                <button onClick={() => handleDeleteService(service.sequence)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceTable;
