import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import garrapataIcon from './garrapataIcon';


const GarrapataMarker = ({ garrapata }) => {
    if (!garrapata || !garrapata.latitud || !garrapata.longitud) {
        // Si garrapata no está definido o no tiene latitud/longitud, no renderizamos nada
        return null;
    }
    return (
        <Marker position={[garrapata.latitud, garrapata.longitud]} icon={garrapataIcon}>
            <Popup>
                <div className="popup-content">
                <h4>Garrapata ID: {garrapata.id}</h4>
                <p>Fecha y Hora: {garrapata.fechaHora}</p>
                <p>Cantidad: {garrapata.cantidad}</p>
                <p>Tipo: {garrapata.tipo}</p>
                <p>Código: {garrapata.codigo}</p>
                {/* Agrega aquí más campos que desees mostrar en el popup */}
                </div>
            </Popup>
        </Marker>
  );
};

export default GarrapataMarker;
