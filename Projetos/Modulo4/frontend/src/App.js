import React, { useState, useEffect } from 'react';

import InputCapital from './components/InputCapital';
import Parcelas from './components/Parcelas';
import InputJuros from './components/ProjetoBase/InputJuros';
import Periodo from './components/ProjetoBase/Periodo';

export default function App() {
  const [capitalInicial, setCapital] = useState([]);
  const [jurosInicial, setJuros] = useState([]);
  const [periodoInicial, setPeriodo] = useState([]);
  const [resultados, setResultados] = useState([]);
  let investimentoToCreate = [];
  let rendimentoPassado = 0;
  let ativar = null;

  /*useEffect(() => {
    const valoresIniciais = () => {
      setCapital(1500);
    };
    valoresIniciais();
  }, []);*/

  /*useEffect(() => {
    return () => {
      setResultados(resultados);
    };
  });*/

  const handleCapitalChange = (capitalChange) => {
    setCapital(capitalChange);
  };

  const handleJurosChange = (jurosChange) => {
    setJuros(jurosChange);
  };

  const handleInvestimentos = () => {
    setResultados([]);
    let jurosAtual = 0;
    let rendimentoAtual = 0;
    let montanteAtual = 0;
    console.log(periodoInicial);
    console.log(jurosInicial);
    console.log(capitalInicial);

    for (let i = 1; i < periodoInicial; i++) {
      jurosAtual = (1 + jurosInicial) ** i;
      rendimentoAtual = capitalInicial * jurosAtual;
      montanteAtual = rendimentoPassado + rendimentoAtual;
      rendimentoPassado = montanteAtual;

      setResultados([
        ...resultados,
        {
          id: i,
          jurosAtual: jurosAtual.toFixed(2),
          rendimentoAtual: rendimentoAtual.toFixed(2),
          montanteAtual: montanteAtual.toFixed(2),
        },
      ]);

      investimentoToCreate.push({
        id: i,
        jurosAtual: jurosAtual.toFixed(2),
        rendimentoAtual: rendimentoAtual.toFixed(2),
        montanteAtual: montanteAtual.toFixed(2),
      });
    }
  };

  const handlePeriodoChange = (periodoChange) => {
    setPeriodo(periodoChange);
    ativar = true;
    /*handleInvestimentos();

    console.log(resultados);
    console.log('----');
    console.log(investimentoToCreate);*/
    // investimentoToCreate.forEach((investimento) => return setResultados([... resultados, investimento]))
  };
  //
  return (
    <div>
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

      {{ ativar } && (
        <Parcelas
          montante={capitalInicial}
          juros={jurosInicial}
          periodo={periodoInicial}
        />
      )}
    </div>
  );
}
