import React, { useCallback, useState } from 'react';

const NuevoGarrapataForm = ({ handleFormSubmit, handleFormChange,handleCancel }) => {
  const [formData, setFormData] = useState({
    cantidad: 1,
    tipo: '',
    codigo: '',
    fechaHora: new Date().toISOString().slice(0, 16),
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    handleFormSubmit(formData);
  }, [handleFormSubmit, formData]);

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
          onChange={handleChange}
        />
        <br />
        <label htmlFor="tipo">Tipo:</label>
        <input
          type="text"
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="codigo">Código:</label>
        <input
          type="text"
          id="codigo"
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
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
