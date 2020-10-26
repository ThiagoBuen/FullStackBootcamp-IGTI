import React, { Component } from 'react';

export default function IncrementButton(props) {
  const handleButtonClick = () => {
    props.onIncrement('+');
  };

  return (
    <button
      onClick={handleButtonClick}
      className="waves-effect waves-light btn green darken-4"
    >
      +
    </button>
  );
}
