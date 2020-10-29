import React, { useState, useEffect } from 'react';

export default function InputCapital({
  capital,
  minValue,
  step,
  onCapitalChange,
}) {
  const [capitalInicial, setCapital] = useState(capital);
  /*
  useEffect(() => {
    setCapital(capitalInicial);
  }, [capitalInicial, setCapital]);
*/
  const handleCapitalChange = (event) => {
    //console.log(event.target.value);
    setCapital(+event.target.value);
    onCapitalChange(+event.target.value);
  };

  return (
    <div className="input-field">
      <input
        id="inputCapital"
        type="number"
        min={minValue}
        max={50000}
        value={capitalInicial}
        step={step}
        onChange={handleCapitalChange}
      />
      <label className="active" htmlFor="inputCapital">
        Montante Inicial
      </label>
    </div>
  );
}
