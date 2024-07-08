import React from 'react';
import Sidebar from './Sidebar';
import DataTable from './DataTable';
import './OSPage.css';

function OSPage() {
  return (
    <div className="os-page">
      <Sidebar />
      <div className="content">
        <h1>OS's Cadastradas</h1>
        <DataTable />
      </div>
    </div>
  );
}

export default OSPage;
