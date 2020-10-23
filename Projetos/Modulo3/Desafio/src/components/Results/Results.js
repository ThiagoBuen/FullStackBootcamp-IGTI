import React, { Component } from 'react';

export default class Results extends Component {
  render() {
    const {
      currentBaseINSS,
      currentDiscountINSS,
      currentBaseIRPF,
      currentDiscountIRPF,
    } = this.props;
    return (
      <div>
        <label for="inputBaseINSS">Base INSS:</label>
        <input
          placeholder="Base INSS"
          id="inputBaseINSS"
          type="text"
          value={currentBaseINSS}
          readOnly
        />

        <label for="inputDescINSS">Desconto INSS:</label>
        <input
          placeholder="Base INSS"
          id="inputDescINSS"
          type="text"
          value={currentDiscountINSS}
          readOnly
        />

        <label for="inputBaseIRPF">Base IRPF:</label>
        <input
          placeholder="Base IRPF"
          id="inputBaseIRPF"
          type="text"
          value={currentBaseIRPF}
          readOnly
        />

        <label for="inputDescIRPF">Desconto IRPF:</label>
        <input
          placeholder="Desconto IRPF"
          id="inputDescIRPF"
          type="text"
          value={currentDiscountIRPF}
          readOnly
        />
      </div>
    );
  }
}
