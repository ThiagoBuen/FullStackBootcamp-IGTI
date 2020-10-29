import React, { useState } from 'react';

export default function Periodo({ periodo, minValue, step, onPeriodoChange }) {
  const [periodoInicial, setPeriodo] = useState(periodo);

  const handlePeriodoChange = (event) => {
    //console.log(event.target.value);
    setPeriodo(+event.target.value);
    onPeriodoChange(+event.target.value);
  };

  return (
    <div className="input-field">
      <input
        id="inputJuros"
        type="number"
        min={minValue}
        value={periodoInicial}
        step={step}
        onChange={handlePeriodoChange}
      />
      <label className="active" htmlFor="inputJuros">
        Periodo (meses):
      </label>
    </div>
  );
}
