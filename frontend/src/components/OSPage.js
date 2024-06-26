import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DataTable from './DataTable';
import './OSPage.css';
import SearchBar from './SearchBar';
import InsertOS from './InsertOS';

function OSPage() {
  const [isInsertOSOpen, setIsInsertOSOpen] = useState(false);

  const openInsertOS = () => {
    setIsInsertOSOpen(true);
  };

  const closeInsertOS = () => {
    setIsInsertOSOpen(false);
  };

  return (
    <div className="os-page">
      <Sidebar />
      <div className="content">
        <h1>OS's Cadastradas</h1>
        <div className="buttons-container">
          <SearchBar />
          <button className="open-insert-os-button" onClick={openInsertOS}>
            Inserir OS
          </button>
        </div>
        {isInsertOSOpen && <InsertOS onClose={closeInsertOS} />}
        <DataTable />
      </div>
    </div>
  );
}

export default OSPage;
