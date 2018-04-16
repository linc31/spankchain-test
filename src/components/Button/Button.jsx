import React from 'react';

import './Button.css';

const button = (props) => (
  <div style={{textAlign: "center"}}>
    <button
    disabled={props.disabled}
    className="Button"
    onClick={props.clocked}> Submit
    </button>
  </div>
)

export default button;