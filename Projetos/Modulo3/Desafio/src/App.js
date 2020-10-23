import React, { Component } from 'react';
import InputSalBruto from './components/inputSalBruto/InputSalBruto';
import InputSalLiquido from './components/InputSalLiquido/InputSalLiquido';
import ProgressBar from './components/progressBar/ProgressBar';
import Results from './components/Results/Results';
import { calculateSalaryFrom } from './salary';

const COLOR_INSS = 'e67e22';
const COLOR_IRPF = 'c0392b';
const COLOR_SAL = '16a085';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      salarioBruto: '1000',
      salarioLiquido: '0',
      baseINSS: '0',
      discountINSS: '0',
      baseIRPF: '0',
      discountIRPF: '0',
      netSalary: '0',
      percINSS: '0',
      percIRPF: '0',
      percSal: '0',
    };
  }

  componentDidMount() {
    this.setState({
      salarioBruto: '1000',
    });

    document.querySelector('#inputSalBruto').value = this.state.salarioBruto;
  }

  handleChangeSalario = (valueSalBruto) => {
    console.log(valueSalBruto);

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(valueSalBruto);

    console.log(netSalary);
    console.log(
      'Teste ' + (parseInt(discountINSS) / parseInt(valueSalBruto)) * 100
    );

    const percINSS = (parseInt(discountINSS) / parseInt(valueSalBruto)) * 100;
    const percIRPF = (parseInt(discountIRPF) / parseInt(valueSalBruto)) * 100;
    const percSal = (parseInt(netSalary) / parseInt(valueSalBruto)) * 100;

    this.setState({
      salarioBruto: valueSalBruto,
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      salarioLiquido: netSalary,
      percINSS,
      percIRPF,
      percSal,
    });
  };

  render() {
    const {
      salarioBruto,
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      salarioLiquido,
      percINSS,
      percIRPF,
      percSal,
    } = this.state;

    console.log('Inss ' + percINSS);
    console.log('percIRPF ' + percIRPF);
    console.log('percSal ' + percSal);

    return (
      <div>
        <h1>React Salário</h1>
        <InputSalBruto
          className="inputSalBruto"
          handleChangeSalario={this.handleChangeSalario}
          currentSalario={salarioBruto}
        />

        <Results
          currentBaseINSS={baseINSS}
          currentDiscountINSS={discountINSS}
          currentBaseIRPF={baseIRPF}
          currentDiscountIRPF={discountIRPF}
        />

        <InputSalLiquido currentRealIncome={salarioLiquido} />

        <ProgressBar currentPosition={percINSS} colorINSS={COLOR_INSS} />
        <ProgressBar currentPosition={percIRPF} colorIRPF={COLOR_IRPF} />
        <ProgressBar currentPosition={percSal} colorSal={COLOR_SAL} />
      </div>
    );
  }
}
