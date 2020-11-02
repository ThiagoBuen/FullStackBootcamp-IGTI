import React, { useState, useEffect } from 'react';

import InputCapital from './components/InputCapital';
import Parcelas from './components/Parcelas';
import InputJuros from './components/ProjetoBase/InputJuros';
import Periodo from './components/ProjetoBase/Periodo';

export default function App() {
  const [capitalInicial, setCapital] = useState(1000);
  const [jurosInicial, setJuros] = useState(0.5);
  const [periodoInicial, setPeriodo] = useState(1);
  const [resultados, setResultados] = useState([]);
  let rendimentoPassado = 0;
  let ativar = null;

  useEffect(() => {
    calculateInterest(capitalInicial, jurosInicial, periodoInicial);
  }, [capitalInicial, jurosInicial, periodoInicial]);

  const handleCapitalChange = (capitalChange) => {
    setCapital(capitalChange);
  };

  const handleJurosChange = (jurosChange) => {
    setJuros(jurosChange);
  };

  const calculateInterest = () => {
    const newResults = [];

    let jurosAtual = 0;
    let rendimentoAtual = 0;
    let montanteAtual = 0;
    let lucro = jurosInicial > 0;

    console.log(periodoInicial);
    console.log(jurosInicial);
    console.log(capitalInicial);

    for (let i = 1; i <= periodoInicial; i++) {
      jurosAtual = (1 + jurosInicial) ** i;
      rendimentoAtual = capitalInicial * jurosAtual;
      montanteAtual =
        lucro >= 0
          ? rendimentoPassado + rendimentoAtual
          : rendimentoPassado - rendimentoAtual;
      rendimentoPassado = montanteAtual;

      newResults.push([
        {
          id: i,
          jurosAtual: jurosAtual.toFixed(2),
          rendimentoAtual: rendimentoAtual.toFixed(2),
          montanteAtual: montanteAtual.toFixed(2),
        },
      ]);
    }
    console.log(newResults);

    setResultados(newResults);
  };

  const handlePeriodoChange = (periodoChange) => {
    setPeriodo(periodoChange);
  };

  return (
    <div className="container center">
      <h1>Juros Compostos </h1>
      <h2>Desafio React Hooks</h2>
      <InputCapital
        capital={capitalInicial}
        minValue={0}
        step={50}
        onCapitalChange={handleCapitalChange}
      />
      <InputJuros
        juros={jurosInicial}
        minValue={-12}
        maxValue={12}
        step={0.5}
        onJurosChange={handleJurosChange}
      />

      <Periodo
        periodo={periodoInicial}
        minValue={0}
        step={1}
        onPeriodoChange={handlePeriodoChange}
      />

      <div>
        {resultados.map((resultado, i) => {
          return <Parcelas key={i}> {resultado} </Parcelas>;
        })}
      </div>
    </div>
  );
}
