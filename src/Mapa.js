import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';


const garrapataIcon = new Icon({
  iconUrl: 'garrapata_marker.png',
  iconSize: [30, 30], // Tamaño del icono [ancho, alto]
});

const Mapa = ({ fechaInicio, fechaFin }) => {
  const [garrapatas, setGarrapatas] = useState([]);

  useEffect(() => {
   
      let url = 'http://localhost:8080/api/garrapatas';
      // Llamada al servicio REST para obtener las garrapatas con las fechas filtradas

      if (fechaInicio && fechaFin) {
        url += '/startDate/' + formatDate(fechaInicio) + '/endDate/' + formatDate(fechaFin);
      }
    axios
      .get(url)
      .then(response => {
        setGarrapatas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las garrapatas:', error);
      });
  }, [fechaInicio, fechaFin]);

  const formatDate = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <MapContainer center={[40.123456, -74.987654]} zoom={5} style={{ width: '100%', height: '600px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {garrapatas.map(garrapata => (
        <Marker key={garrapata.id} position={[garrapata.latitud, garrapata.longitud]}  icon={garrapataIcon}>
          <Popup>{garrapata.fechaHora}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Mapa;
