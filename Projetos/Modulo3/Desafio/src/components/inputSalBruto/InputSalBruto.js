import React, { Component } from 'react';

export default class inputSalBruto extends Component {
  handleInputChangeSalario = (event) => {
    //
    console.log(event.target.value);
    const newSal = event.target.value;

    this.props.handleChangeSalario(newSal);
    // this.props.onChangeFilter(newSal);
  };

  render() {
    return (
      <div>
        <label for="inputSalBruto">Salário Bruto</label>

        <input
          placeholder="Salário Bruto"
          id="inputSalBruto"
          type="number"
          min="1000"
          step="200"
          onChange={this.handleInputChangeSalario}
        />
      </div>
    );
  }
}
