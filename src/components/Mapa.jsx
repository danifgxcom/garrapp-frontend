import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import './custom-marker-cluster.css';
import GarrapataMarker from './GarrapataMarker';
import NuevoGarrapataForm from './NuevoGarrapataForm';
import { getGarrapatas, createGarrapata } from './api';

const Mapa = ({ fechaInicio, fechaFin }) => {
  const [garrapatas, setGarrapatas] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newGarrapataData, setNewGarrapataData] = useState({
    latitud: 0,
    longitud: 0,
    cantidad: 0,
    tipo: '',
    codigo: '',
    fechaHora: '',
  });

  useEffect(() => {
    getGarrapatas(fechaInicio, fechaFin)
      .then((response) => {
        setGarrapatas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las garrapatas:', error);
      });
  }, [fechaInicio, fechaFin]);

  // Utilizamos useCallback para memorizar la función y evitar renderizados innecesarios
  const handleFormChange = useCallback((name, value) => {
    setNewGarrapataData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleFormSubmit = () => {
    createGarrapata(newGarrapataData)
      .then((response) => {
        const { latitud, longitud } = newGarrapataData;
        const newGarrapata = {
          id: response.data.id,
          latitud,
          longitud,
          cantidad: newGarrapataData.cantidad,
          tipo: newGarrapataData.tipo,
          codigo: newGarrapataData.codigo,
          fechaHora: newGarrapataData.fechaHora,
        };
        setGarrapatas((prevGarrapatas) => [...prevGarrapatas, newGarrapata]);
        setShowPopup(false);
      })
      .catch((error) => {
        console.error('Error al añadir la garrapata:', error);
      });
  };

  const mapRef = useRef(null);

  // Función para manejar el clic derecho en el mapa
  const handleMapRightClick = (e) => {
    console.log(e);
    const { lat, lng } = e.latlng;
    setNewGarrapataData({
      ...newGarrapataData,
      latitud: lat,
      longitud: lng,
    });
    setShowPopup(true);
  };

  // Componente para manejar el evento de clic derecho en el mapa
  const MapRightClickHandler = () => {
    const map = useMap();
    useEffect(() => {
      map.addEventListener('contextmenu', handleMapRightClick);

      return () => {
        map.removeEventListener('contextmenu', handleMapRightClick);
      };
    }, [map]);

    return null;
  };

  const MemoizedNuevoGarrapataForm = React.memo(NuevoGarrapataForm);

  return (
    <div>
      <MapContainer
        center={[40.408170, -3.585831]}
        zoom={10}
        style={{ width: '100%', height: '600px' }}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MarkerClusterGroup>
          {garrapatas.map((garrapata) => (
            <GarrapataMarker key={garrapata.id} garrapata={garrapata} />
          ))}
        </MarkerClusterGroup>

        {showPopup && (
          <Popup position={[newGarrapataData.latitud, newGarrapataData.longitud]}>
            <MemoizedNuevoGarrapataForm
              newGarrapataData={newGarrapataData}
              handleFormChange={handleFormChange}
              handleFormSubmit={handleFormSubmit}
              handleCancel={() => setShowPopup(false)}
            />
          </Popup>
        )}

        <MapRightClickHandler />
      </MapContainer>
    </div>
  );
};

export default Mapa;
