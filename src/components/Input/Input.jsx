import React from 'react';

import './Input.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = ['InputElement'];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('Invalid');
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input 
        className={inputClasses.join(' ')}
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed}/>;
      break;
    case ('checkbox'):
      inputElement = (
        <div className="TermsCondition" style={{position: "absolute", bottom: "-86px"}}>
          <input
            className={inputClasses.join(' ')}
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed}
            type="checkbox" 
            style={{width: "5%"}} />
          <span style={{width: "400px"}}> I have read and agree to the terms and conditions.</span>
        </div>
      );
      break;
    case ('select'):
      inputElement = (
        <select 
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
        );
      break;
    default:
      inputElement = <input 
        className={inputClasses.join(' ')}
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed} />;
  }

  let error = null;
  if (props.invalid && props.touched) {
    error = <p className="ErrorMessage">{props.message}</p>
  }

  return (
    <div className="Input">
      {inputElement}
      {error}
    </div>
  );
};

export default input;