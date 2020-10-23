import React, { Component } from 'react';

export default class ProgressBar extends Component {
  render() {
    const { currentPosition } = this.props;
    console.log('Progress: ' + currentPosition);

    return <div class="progress"></div>;
  }
}
