import React, { useState } from 'react';
import './App.css';
import Mapa from './Mapa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePickerWrapper({ selected, onChange, placeholderText }) {
  return (
    <div className="date-picker-wrapper">
      <DatePicker selected={selected} onChange={onChange} placeholderText={placeholderText} />
    </div>
  );
}

function App() {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const handleFechaInicioChange = (date) => {
    setFechaInicio(date);
  };

  const handleFechaFinChange = (date) => {
    setFechaFin(date);
  };

  return (
    <div className="App">
      <h1>Garrapata Map App</h1>

      {/* Filtros de fecha */}
      <div className="filters">
        <div className="filter">
          <label>Fecha de inicio:</label>
          <DatePickerWrapper
            selected={fechaInicio}
            onChange={handleFechaInicioChange}
            placeholderText="Fecha de inicio"
          />
        </div>
        <div className="filter">
          <label>Fecha fin:</label>
          <DatePickerWrapper
            selected={fechaFin}
            onChange={handleFechaFinChange}
            placeholderText="Fecha fin"
          />
        </div>
      </div>

      {/* Mapa */}
      <Mapa fechaInicio={fechaInicio} fechaFin={fechaFin} />
    </div>
  );
}

export default App;
