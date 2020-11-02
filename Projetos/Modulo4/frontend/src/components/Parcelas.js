import React, { useState } from 'react';

export default function Parcelas({ children: parcela }) {
  const { id, jurosAtual, rendimentoAtual, montanteAtual } = parcela;

  console.log(id);

  return (
    <div className="col s6 m3 l2">
      <div>
        <span>
          <strong>{id}</strong>
        </span>

        <div>
          <span>
            <strong>{montanteAtual}</strong>
          </span>

          <span>
            <strong>{rendimentoAtual}</strong>
          </span>
          <span>{jurosAtual}</span>
        </div>
      </div>
    </div>
  );
}
