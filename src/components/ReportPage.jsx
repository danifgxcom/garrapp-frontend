import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const ListaGarrapatas = () => {
  const [garrapatas, setGarrapatas] = useState([]);
  const [sortBy, setSortBy] = useState('fechaHora');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    // Lógica para obtener los datos de las garrapatas desde el endpoint utilizando axios
    axios
      .get('http://localhost:8080/api/garrapatas')
      .then((response) => {
        setGarrapatas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las garrapatas:', error);
      });
  }, []);

  // Función para ordenar los datos por la columna seleccionada
  const handleSort = (column) => {
    setSortBy(column);
  };

  // Función para filtrar los datos por el texto ingresado en el input
const handleFilter = (event) => {
    const searchText = event.target.value;
    setFilterText(searchText);
  };
  
  // Lógica para ordenar y filtrar los datos
  const sortedAndFilteredGarrapatas = garrapatas
    .filter((garrapata) => {
      // Asegurarse de que garrapata.fechaHora no sea nulo antes de aplicar toLowerCase()
      return garrapata.fechaHora && garrapata.fechaHora.toLowerCase().includes(filterText.toLowerCase());
    })
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });

  const garrapataIcon = new L.Icon({
    iconUrl: 'garrapata_marker.png',
    iconSize: [30, 30], // Tamaño del icono [ancho, alto]
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
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('cantidad')}>Cantidad</th>
            <th onClick={() => handleSort('codigo')}>Código</th>
            <th onClick={() => handleSort('tipo')}>Tipo</th>
            <th>Localización</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredGarrapatas.map((garrapata) => (
            <tr key={garrapata.id}>
              <td>{garrapata.fechaHora}</td>
              <td>{garrapata.id}</td>
              <td>{garrapata.cantidad}</td>
              <td>{garrapata.codigo}</td>
              <td>{garrapata.tipo}</td>
              <td>
                <MapContainer
                  center={[garrapata.latitud, garrapata.longitud]}
                  zoom={13}
                  style={{ width: '100%', height: '200px' }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[garrapata.latitud, garrapata.longitud]} icon={garrapataIcon}>
                    <Popup>{garrapata.fechaHora}</Popup>
                  </Marker>
                </MapContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListaGarrapatas;
