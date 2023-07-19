import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';


const garrapataIcon = new Icon({
  iconUrl: 'garrapata_marker.png',
  iconSize: [30, 30], // Tamaño del icono [ancho, alto]
});

const Mapa = () => {
  const [garrapatas, setGarrapatas] = useState([]);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    // Llamada al servicio REST para obtener las garrapatas
    axios.get('http://localhost:8080/api/garrapatas')
      .then(response => {
        setGarrapatas(response.data);
        console.log(response.data);
        setMapInitialized(true); // Marcar el mapa como inicializado cuando los datos estén disponibles
      })
      .catch(error => {
        console.error('Error al obtener las garrapatas:', error);
      });
  }, []);

  if (!mapInitialized || garrapatas.length === 0) {
    return null; // No renderizar el mapa hasta que los datos estén disponibles y el mapa no se haya inicializado
  }

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
