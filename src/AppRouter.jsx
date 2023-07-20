import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapPage from './components/MapPage';
import ListaGarrapatas from './components/ReportPage';
import SobreGarrApp from './components/SobreGarrApp';
import Menu from './components/Menu';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="app-container"> {/* Contenedor principal de la página */}
        <Menu />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/mapa" element={<MapPage />} />
            <Route path="/informes" element={<ListaGarrapatas />} />
            <Route path="/sobre-garrapp" element={<SobreGarrApp />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
