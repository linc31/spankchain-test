import React, { Component } from 'react';

import './Form.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

class Form extends Component {
  state = {
    signupForm: {
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Username'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 4
        },
        valid: false,
        touched: false,
        message: "Minimum 4 characters or more"
      },
      birthday: {
        elementType: 'date',
        elementConfig: {
          type: 'date',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        message: "You are under 21, please go back to school"
      },
      gender: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: '', displayValue: 'Choose a Gender'},
            {value: 'female', displayValue: 'Female'},
            {value: 'male', displayValue: 'Male'},
            {value: 'transgender', displayValue: 'Transgender'},
            {value: 'nonBinary', displayValue: 'Non Binary'},
            {value: 'x', displayValue: 'X'}
          ]
        },
        value: '',
        validation: {
          required: true
        },
        valid: true
      },
      email: {
        elementType: 'email',
        elementConfig: {
          type: 'email',
          placeholder: 'email.com'
        },
        value: '',
        validation: {
          required: true,
          emailCheck: true
        },
        valid: false,
        touched: false,
        message: "Invalid email"
      },
      emailConfirm: {
        elementType: 'email',
        elementConfig: {
          type: 'email',
          placeholder: 'email.com'
        },
        value: '',
        validation: {
          required: true,
          match: true
        },
        valid: false,
        touched: false,
        message: "Email address doesn’t match"
      }
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
      for (let formElementId in this.state.signupForm) {
        formData[formElementId] = this.state.signupForm[formElementId].value;
      }
      console.log(formData);
  }

  checkValidation (value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.match) {
      isValid = value === this.state.signupForm.email.value;
    }
    if (rules.emailCheck) {
      isValid = value.split('').indexOf('!') === -1;
    }
    return isValid;
  }
  

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.signupForm
    };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIds in updatedForm) {
      formIsValid = updatedForm[inputIds].valid && formIsValid;
    }

    console.log(updatedFormElement);
    this.setState({signupForm: updatedForm, formIsValid});
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.signupForm) {
      formElementsArray.push ({
        id: key,
        config: this.state.signupForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => (
            <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            message={formElement.config.message}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
          ))}
          <Button disabled={!this.state.formIsValid} />
      </form>
    );
    return (
      <div>
        {form}
        
      </div>
    )
  };
};

export default Form;