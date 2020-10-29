import React, { useState } from 'react';

export default function InputJuros({
  juros,
  minValue,
  maxValue,
  step,
  onJurosChange,
}) {
  const [jurosInicial, setJuros] = useState(juros);

  const handleJurosChange = (event) => {
    //console.log(event.target.value);
    setJuros(+event.target.value);
    onJurosChange(+event.target.value);
  };

  return (
    <div className="input-field">
      <input
        id="inputJuros"
        type="number"
        min={minValue}
        max={maxValue}
        value={jurosInicial}
        step={step}
        onChange={handleJurosChange}
      />
      <label className="active" htmlFor="inputJuros">
        Taxa de juros mensal:
      </label>
    </div>
  );
}
