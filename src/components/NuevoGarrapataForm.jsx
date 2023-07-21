import React, { useCallback, useState } from 'react';

const NuevoGarrapataForm = ({ handleFormSubmit, handleCancel }) => {
  const [formData, setFormData] = useState({
    cantidad: 1,
    tipo: '',
    codigo: '',
    fechaHora: new Date().toISOString().slice(0, 16),
  });

  const handleFormChange = useCallback((name, value) => {
    console.log('name: ', name, ' and value: ', value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = () => {
    handleFormSubmit(formData); // Pasar la información actualizada al componente Mapa al hacer clic en "Añadir"
  };

  return (
    <div>
      <h3>Nueva Garrapata</h3>
      <form>
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          type="number"
          id="cantidad"
          name="cantidad"
          value={formData.cantidad}
          onChange={(e) => handleFormChange(e.target.name, e.target.value)}
        />
        <br />
        <label htmlFor="tipo">Tipo:</label>
        <input
          type="text"
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={(e) => handleFormChange(e.target.name, e.target.value)}
        />
        <br />
        <label htmlFor="codigo">Código:</label>
        <input
          type="text"
          id="codigo"
          name="codigo"
          value={formData.codigo}
          onChange={(e) => handleFormChange(e.target.name, e.target.value)}
        />
        <br />
        {/* Campos de fecha y hora de solo lectura */}
        <label htmlFor="fechaHora">Fecha y Hora:</label>
        <input
          type="text"
          id="fechaHora"
          name="fechaHora"
          value={formData.fechaHora}
          readOnly
        />
        <br />
        <button type="button" onClick={handleSubmit}>
          Añadir
        </button>
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default NuevoGarrapataForm;
