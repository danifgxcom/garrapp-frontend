import React, { useCallback } from 'react';

const NuevoGarrapataForm = React.memo(({ newGarrapataData, handleFormChange, handleFormSubmit, handleCancel }) => {
    // Utilizamos useCallback para memorizar la función y evitar renderizados innecesarios
    const handleChange = (e) => {
        const { name, value } = e.target;
        handleFormChange(name, value);
      };
  
  const handleSubmit = useCallback(() => {
    handleFormSubmit();
  }, [handleFormSubmit]);

  return (
    <div>
      <h3>Nueva Garrapata</h3>
      <form>
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          type="number"
          id="cantidad"
          name="cantidad"
          value={newGarrapataData.cantidad}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="tipo">Tipo:</label>
        <input
          type="text"
          id="tipo"
          name="tipo"
          value={newGarrapataData.tipo}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="codigo">Código:</label>
        <input
          type="text"
          id="codigo"
          name="codigo"
          value={newGarrapataData.codigo}
          onChange={handleChange}
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
});

export default NuevoGarrapataForm;
