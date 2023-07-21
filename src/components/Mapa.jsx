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
  const [formData, setFormData] = useState({
    cantidad: 0,
    tipo: '',
    codigo: '',
    fechaHora: '',
  });
  const [tempLatitud, setTempLatitud] = useState(0);
  const [tempLongitud, setTempLongitud] = useState(0);

  useEffect(() => {
    getGarrapatas(fechaInicio, fechaFin)
      .then((response) => {
        setGarrapatas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las garrapatas:', error);
      });
  }, [fechaInicio, fechaFin]);

  const fetchGarrapatas = () => {
    getGarrapatas(fechaInicio, fechaFin)
      .then((response) => {
        setGarrapatas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las garrapatas:', error);
      });
  };

  const handleFormSubmit = (formData) => {
    const newGarrapataData = {
      ...formData,
      latitud: tempLatitud,
      longitud: tempLongitud,
    };
    createGarrapata(newGarrapataData)
      .then(() => {
        fetchGarrapatas(); // Actualizar la lista de garrapatas después de crear una nueva
        setShowPopup(false);
      })
      .catch((error) => {
        console.error('Error al añadir la garrapata:', error);
      });
  };


  const mapRef = useRef(null);

  const handleMapRightClick = useCallback((e) => {
    const { lat, lng } = e.latlng;
    setTempLatitud(lat);
    setTempLongitud(lng);
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
