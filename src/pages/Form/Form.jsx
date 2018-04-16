import React, { Component } from 'react';

import './Form.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import PhotoUpload from '../../components/PhotoUpload/PhotoUpload';

import selfieID from '../../assets/img/selfie-id.png';
import yourID from '../../assets/img/your-id.png';

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
          type: 'password',
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
          required: true,
          age: true
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
        message: "Invalid character has been detected"
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
        message: "Email address doesn't match"
      },
      checkbox: {
        elementType: 'checkbox',
        elementConfig: {
          type: 'checkbox',
          placeholder: ''
        },
        value: '',
        validation: {
          required: true,
          checked: true
        },
        valid: false,
        touched: false,
        message: "Must accept Terms & Conditions"
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
      isValid = value.split('').indexOf('!') === -1 && value.split('').indexOf('#') === -1 && value.split('').indexOf('$') === -1 && value.split('').indexOf('%') === -1 && value.split('').indexOf('&') === -1 && value.split('').indexOf('*') === -1;
    }
    if (rules.age) {
      isValid = (2018 - parseInt(value.split('').map((e, i) => i < 4 ? e : null).join('')) >= 21)
    }
    if (rules.checked) {
      isValid = value !== this.state.signupForm.checkbox.checked;
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
    updatedFormElement.valid = event.target.type === 'checkbox' ? event.target.checked : this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
    console.log(updatedFormElement.valid)
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIds in updatedForm) {
      formIsValid = updatedForm[inputIds].valid && formIsValid;
    }
    // console.log(updatedFormElement);
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
          <div style={{display: "flex", justifyContent: "center"}}>
            <PhotoUpload title='Your ID' IDPhoto={yourID}/>
            <PhotoUpload title='Selfie + ID' IDPhoto={selfieID}/>
          </div>
          <Button disabled={!this.state.formIsValid} />
      </form>
    );
    return (
      <div>
        <div className="Message">All entered information is hidden from users. <br/> This is for age verification purposes only.</div>
        {form}
      </div>
    )
  };
};

export default Form;