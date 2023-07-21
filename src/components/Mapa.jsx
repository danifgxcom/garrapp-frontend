import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import './custom-marker-cluster.css';
import GarrapataMarker from './GarrapataMarker';
import NuevoGarrapataForm from './NuevoGarrapataForm';
import { getGarrapatas, createGarrapata } from './api';

const Mapa = ({ fechaInicio, fechaFin }) => {
  const [garrapatas, setGarrapatas] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleFormSubmit = useCallback(() => {
    console.log(formData);
    createGarrapata(formData)
      .then((response) => {
        console.log(formData);
        const { latitud, longitud } = formData;
        const newGarrapata = {
          id: response.data.id,
          latitud,
          longitud,
          cantidad: formData.cantidad,
          tipo: formData.tipo,
          codigo: formData.codigo,
          fechaHora: formData.fechaHora,
        };
        setGarrapatas((prevGarrapatas) => [...prevGarrapatas, newGarrapata]);
        setShowPopup(false);
      })
      .catch((error) => {
        console.error('Error al añadir la garrapata:', error);
      });
  }, [formData]); // Agregar formData aquí como dependencia
  const mapRef = useRef(null);

  const handleMapRightClick = useCallback((e) => {
    const { lat, lng } = e.latlng;
    setFormData((prevData) => ({
      ...prevData,
      latitud: lat,
      longitud: lng,
      cantidad: 0,
      tipo: '',
      codigo: '',
      fechaHora: new Date().toISOString().slice(0, 16),
    }));
    setShowPopup(true);
  }, []);

  const MapRightClickHandler = () => {
    const map = useMap();
    useEffect(() => {
      map.addEventListener('contextmenu', handleMapRightClick);

      return () => {
        map.removeEventListener('contextmenu', handleMapRightClick);
      };
    }, [map, handleMapRightClick]);

    return null;
  };

  const handleFormChange = useCallback((name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

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
          <Popup position={[formData.latitud, formData.longitud]}>
            <NuevoGarrapataForm
              handleFormChange={handleFormChange} // Asegúrate de pasar la función aquí
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
