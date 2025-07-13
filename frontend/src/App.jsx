import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FullFormsPage } from './Screens/FullFormsPage';
import { Dashboard } from './Screens/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/GlobalEffects.css';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<FullFormsPage formType="login" />} />
            <Route path="/register" element={<FullFormsPage formType="register" />} />
            <Route path="/recuperar" element={<FullFormsPage formType="recuperar" />} />
            <Route path="/menu" element={<Navigate to="/menu/clientes" replace />} />
            <Route path="/menu/clientes" element={<Dashboard rightType="clientes" />} />
            <Route path="/menu/ordenes" element={<Dashboard rightType="ordenes" />} />
            <Route path="/menu/inventario" element={<Dashboard rightType="inventario" />} />
            <Route path="/menu/informes" element={<Dashboard rightType="informes" />} />
            {/* Ruta catch-all para manejar 404s */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default App;
