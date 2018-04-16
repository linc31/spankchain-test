import React from 'react';

import './Button.css';

const button = (props) => (
  <button
  disabled={props.disabled}
  className="Button"
  onClick={props.clocked}>
  </button>
)

export default button;