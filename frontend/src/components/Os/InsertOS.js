import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InsertOS.css';

function InsertOS({ onClose, onOSInserted }) {
  const [newOS, setNewOS] = useState({
    clientName: '',
    clientCPF: '',
    brand: '',
    model: '',
    situation: 'Aguardando Peças',
    clientCell: '',
    clientFixo: '',
    clientEmail: '',
    description: '',
    laborCost: '',
    partsCost: ''
  });

  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Carrega a lista de clientes para seleção no formulário
    axios.get('http://localhost:8080/client', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setClients(response.data);
    })
    .catch(error => console.error('Error fetching clients:', error));
  }, []);

  // Função para lidar com a mudança de cliente selecionado
  const handleClientChange = (e) => {
    const selectedClient = clients.find(client => client.clientName === e.target.value);
    if (selectedClient) {
      setNewOS((prevOS) => ({
        ...prevOS,
        clientName: selectedClient.clientName,
        clientCPF: selectedClient.clientCPF,
        clientCell: selectedClient.clientCell,
        clientFixo: selectedClient.clientFixo,
        clientEmail: selectedClient.clientEmail
      }));
    }
  };

  // Função para lidar com a mudança de qualquer outro campo no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOS((prevOS) => ({
      ...prevOS,
      [name]: value
    }));
  };

  // Função para inserir a OS
  const handleInsert = () => {
    const token = localStorage.getItem('token');
    const userSys = localStorage.getItem('username');
  
    axios.post('http://localhost:8080/serviceOrder', { ...newOS, userSys }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data);
      if (response.status === 200 || response.status === 201) {
        setMessage('Ordem de serviço inserida com sucesso!');
        onOSInserted();
        setTimeout(() => {
          setMessage('');
          onClose();
        }, 2000);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setMessage('Erro ao inserir a ordem de serviço.');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    });
  };  

  return (
    <div className="insert-os-overlay">
      <div className="insert-os-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Nova OS</h2>
        {message && <p className="message">{message}</p>}
        <div className="os-header">
          <div className="client-info">
            <label>Selecione o Cliente:</label>
            <select name="clientName" value={newOS.clientName} onChange={handleClientChange}>
              <option value="">Selecione</option>
              {clients.map(client => (
                <option key={client.sequence} value={client.clientName}>
                  {client.clientName}
                </option>
              ))}
            </select>
            <p>Telefone: {newOS.clientCell}</p>
            <p>CPF: {newOS.clientCPF}</p>
            <p>E-mail: {newOS.clientEmail}</p>
          </div>
          <div className="os-status">
            <label>Situação da OS:</label>
            <select name="situation" value={newOS.situation} onChange={handleChange}>
              <option value="Pronto">Pronto</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Aguardando Peças">Aguardando Peças</option>
              <option value="Sem Solução">Sem Solução</option>
            </select>
          </div>
        </div>
        <div className="tab-container">
          <div className="tab-header">
            <button className="tab-button active">APARELHO</button>
            <button className="tab-button">PEÇAS ESTOQUE</button>
            <button className="tab-button">SERVIÇOS REALIZADOS</button>
          </div>
          <div className="tab-content">
            <div className="tab-pane active">
              <label>Marca</label>
              <input
                type="text"
                name="brand"
                value={newOS.brand}
                onChange={handleChange}
              />
              <label>Modelo</label>
              <input
                type="text"
                name="model"
                value={newOS.model}
                onChange={handleChange}
              />
              <label>Informações passadas pelo cliente</label>
              <textarea
                name="description"
                value={newOS.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="os-footer">
          <div className="cost-section">
            <label>Mão-de-Obra</label>
            <input
              type="text"
              name="laborCost"
              value={newOS.laborCost}
              onChange={handleChange}
            />
            <label>Peças</label>
            <input
              type="text"
              name="partsCost"
              value={newOS.partsCost}
              onChange={handleChange}
            />
            <p className="total-cost">R$200,00</p>
          </div>
          <div className="button-section">
            <button onClick={handleInsert}>Salvar</button>
            <button onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsertOS;
