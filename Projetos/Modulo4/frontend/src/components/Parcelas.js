import React, { useState } from 'react';

export default function Parcelas({ montante, juros, periodo }) {
  console.log(montante);
  console.log(juros);
  console.log(periodo);

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
  return <div>TEste tabela</div>;
}
