import React, { Component } from 'react';

import css from './counter.module.css';
import DecrementButton from './DecrementButton';
import IncrementButton from './IncrementButton';
import Steps from './Steps';
import Value from './Value';

export default class counter extends Component {
  constructor() {
    super();

    this.state = {
      currentCounter: 2,
      steps: 0,
    };
  }

  /* handleButtonDown = () => {
    console.log('cliquei');
    const { currentCounter, steps } = this.state;
    this.setState({
      currentCounter: currentCounter - 1,
      steps: steps + 1,
    });
    // this.render();
  };*/

  /*handleButtonUp = () => {
    console.log('cliquei');
    const { currentCounter, steps } = this.state;
    this.setState({
      currentCounter: currentCounter + 1,
      steps: steps + 1,
    });
    // this.render();
  };*/

  handleButtonClick = (clickType) => {
    console.log('cliquei');
    const { currentCounter, steps } = this.state;
    this.setState({
      currentCounter:
        clickType === '+' ? currentCounter + 1 : currentCounter - 1,
      steps: steps + 1,
    });
    // this.render();
  };

  render() {
    const { currentCounter, steps } = this.state;

    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleButtonClick} />
        <Value value={currentCounter} />
        <IncrementButton onIncrement={this.handleButtonClick} />
        <Steps currentStep={steps} />
      </div>
    );
  }
}
