import React from 'react';
import Sidebar from './Sidebar';
import PartTable from './Part/PartTable';
import './PartPage.css';

function PartPage(){
    return (
        <div className="parts-page">
            <Sidebar />
            <div className="content">
                <h1>Controle de Peças</h1>
                <PartTable/>
            </div>
        </div>
    );
};

export default PartPage;
