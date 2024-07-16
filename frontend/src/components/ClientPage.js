import React from 'react';
import Sidebar from './Sidebar';
import ClientTable from './Client/ClientTable';
import './ClientPage.css';

function ClientsPage() {
  return (
    <div className="clients-page">
      <Sidebar />
      <div className="content">
        <h1>Clientes Cadastrados</h1>
        <ClientTable/>
      </div>
    </div>
  );
}

export default ClientsPage;
