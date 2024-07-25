import React from 'react';
import Sidebar from './Sidebar';
import PartTable from './Part/PartTable';
import './PartPage.css';

const PartPage = () => {
    return (
        <div>
            <Sidebar />
            <div>
                <h1>Controle de Peças</h1>
                <PartTable />
            </div>
        </div>
    );
};

export default PartPage;
