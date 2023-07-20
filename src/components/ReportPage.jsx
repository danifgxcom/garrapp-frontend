import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const ListaGarrapatas = () => {
  const [garrapatas, setGarrapatas] = useState([]);
  const [sortBy, setSortBy] = useState('fechaHora'); // Ordenar por fechaHora de manera predeterminada
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    // Lógica para obtener los datos de las garrapatas desde el endpoint utilizando axios
    axios
      .get('http://localhost:8080/api/garrapatas')
      .then(response => {
        setGarrapatas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las garrapatas:', error);
      });
  }, []);

  // Función para ordenar los datos por la columna seleccionada
  const handleSort = (column) => {
    setSortBy(column);
  };

  // Función para filtrar los datos por el texto ingresado en el input
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };

  // Lógica para ordenar y filtrar los datos
  const sortedAndFilteredGarrapatas = garrapatas
    .filter(garrapata =>
      garrapata.fechaHora.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });

  return (
    <div>
      {/* Input para filtrar por texto */}
      <input
        type="text"
        placeholder="Buscar por fecha"
        value={filterText}
        onChange={handleFilter}
      />

      {/* Tabla */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort('fechaHora')}>Fecha</th>
            <th onClick={() => handleSort('otraColumna')}>Otra columna</th>
            {/* Agrega más columnas según los datos de tu API */}
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredGarrapatas.map(garrapata => (
            <tr key={garrapata.id}>
              <td>{garrapata.fechaHora}</td>
              <td>{garrapata.otraColumna}</td>
              {/* Agrega más columnas según los datos de tu API */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListaGarrapatas;
