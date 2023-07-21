import { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import axios from 'axios';

const MapEventHandlers = ({ fechaInicio, fechaFin, setGarrapatas, setShowPopup, setNewGarrapataData }) => {
  const formatDate = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  // Función para manejar el clic derecho en el mapa
  const handleMapRightClick = (e) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    setNewGarrapataData((prev) => ({
      ...prev,
      latitud: lat,
      longitud: lng,
      fechaHora: new Date().toISOString(),
    }));
    setShowPopup(true);
  };

  useEffect(() => {
    // Lógica para obtener las garrapatas desde el endpoint utilizando axios
    let url = 'http://localhost:8080/api/garrapatas';

    // Llamada al servicio REST para obtener las garrapatas con las fechas filtradas
    if (fechaInicio && fechaFin) {
      url += '/startDate/' + formatDate(fechaInicio) + '/endDate/' + formatDate(fechaFin);
    }

    axios
      .get(url)
      .then((response) => {
        setGarrapatas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las garrapatas:', error);
      });
  }, [fechaInicio, fechaFin]);

  return useMapEvents({
    contextmenu: handleMapRightClick,
  });
};

export default MapEventHandlers;
