import React from 'react';
import Sidebar from './Sidebar';
import ServiceTable from './Service/ServiceTable';
import './ServicesPage.css';

function ServicesPage() {
  return (
    <div className="services-page">
      <Sidebar />
      <div className="content">
        <h1>Serviços Cadastrados</h1>
        <ServiceTable/>
      </div>
    </div>
  );
}

export default ServicesPage;
