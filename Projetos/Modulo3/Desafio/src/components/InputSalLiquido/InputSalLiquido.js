import React, { Component } from 'react';

export default class InputSalLiquido extends Component {
  render() {
    const { currentRealIncome } = this.props;
    return (
      <div>
        <label for="inputSalLiquido">Salário Liquido</label>
        <input
          placeholder="Salário Liquido"
          id="inputSalLiquido"
          type="text"
          value={currentRealIncome}
          disabled
        />
      </div>
    );
  }
}
