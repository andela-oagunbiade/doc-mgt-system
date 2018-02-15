/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import { PageHeader, Button, FormControl, FormGroup, ControlLabel, Alert } from 'react-bootstrap';
import { createAssessUser } from '../../actions/assessUserActions';

class CreateAssessUserPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      phoneNumber: '',
      email: '',
      relationship: 'co-worker',
      showAlert: false,
      errorMessage: null,
      successMessage: null,
      disableCreateUserButton: true
    };

    this.onChange = this.onChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.disableCreateUserButton = this.disableCreateUserButton.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.handleErrorDismiss = this.handleErrorDismiss.bind(this);
    this.handleSuccessDismiss = this.handleSuccessDismiss.bind(this);
    this.displayErrorAlert = this.displayErrorAlert.bind(this);
    this.displaySuccessAlert = this.displaySuccessAlert.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState(() => {
      return { [name]: value };
    });
  }

  handleNameChange(event) {
    const { value } = event.target;
    let nameValidationState;

    if (value.length > 2) {
      nameValidationState = 'success';
    } else {
      nameValidationState = 'error';
    }

    this.setState(() => {
      return {
        name: value,
        nameValidationState
      };
    });

    const disableCreateUserButton = this.disableCreateUserButton();
    this.setState(() => {
      return {
        disableCreateUserButton
      };
    });
  }

  handlePhoneNumberChange(event) {
    const { value } = event.target;
    let phoneValidationState;

    if (value.length === 11) {
      phoneValidationState = 'success';
    } else {
      phoneValidationState = 'error';
    }

    this.setState(() => {
      return {
        phoneNumber: value,
        phoneValidationState
      };
    });

    const disableCreateUserButton = this.disableCreateUserButton();
    this.setState(() => {
      return {
        disableCreateUserButton
      };
    });
  }

  validateEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  handleEmailChange(event) {
    const { value } = event.target;
    let emailValidationState;

    if (this.validateEmail(value)) {
      emailValidationState = 'success';
    } else {
      emailValidationState = 'error';
    }

    this.setState(() => {
      return {
        email: value,
        emailValidationState
      };
    });

    const disableCreateUserButton = this.disableCreateUserButton();
    this.setState(() => {
      return {
        disableCreateUserButton
      };
    });
  }

  disableCreateUserButton() {
    const {
      name,
      phoneNumber,
      email,
      nameValidationState,
      phoneValidationState,
      emailValidationState
    } = this.state;

    const checKFields = () => {
      if ((name === '') || (phoneNumber === '') || (email === '')) {
        return true;
      }
      return false;
    };

    const checkValidationStates = () => {
      const error = ('error' || undefined);

      if ((nameValidationState === error) || (phoneValidationState === error)
      || (emailValidationState === error)) {
        return true;
      }
      return false;
    };
    return (checKFields() || checkValidationStates());
  }

  onClickSave(event) {
    event.preventDefault();
    createAssessUser(this.state)
      .then(() => {
        this.setState(() => {
          return {
            showAlert: true,
            successMessage: 'Successfully added new user.'
          };
        });
      })
      .catch((errorMessage) => {
        this.setState(() => {
          return {
            showAlert: true,
            errorMessage
          };
        });
      });
  }

  handleErrorDismiss() {
    this.setState(() => {
      return {
        showAlert: false,
        errorMessage: null
      };
    });
  }

  handleSuccessDismiss() {
    this.setState(() => {
      return {
        showAlert: false,
        successMessage: null,
        name: '',
        phoneNumber: '',
        email: '',
      };
    });
  }

  displayErrorAlert() {
    return (
      <Alert bsStyle="danger" onDismiss={this.handleErrorDismiss}>
        <h4>Oh snap! You got an error!</h4>
        {this.state.errorMessage}
      </Alert>
    );
  }

  displaySuccessAlert() {
    return (
      <Alert bsStyle="success" onDismiss={this.handleSuccessDismiss}>
        <h4>Yay!!!</h4>
        {this.state.successMessage}
      </Alert>
    );
  }

  render() {
    const style = {
      paddingRight: 10,
      paddingLeft: 5
    };
    const { showAlert, errorMessage, successMessage } = this.state;

    return (
      <div className="Jumbotron">
        <PageHeader>Welcome To Assessment Page</PageHeader>
        <h3> Submit Info </h3>
        {showAlert && errorMessage ? this.displayErrorAlert() : null}
        {showAlert && successMessage ? this.displaySuccessAlert() : null}
        <div style={{ width: 500 }}>
          <FormGroup validationState={this.state.nameValidationState}>
            <ControlLabel>Name</ControlLabel>
            <FormControl
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </FormGroup>
          <br />
          <FormGroup validationState={this.state.phoneValidationState}>
            <ControlLabel>Phone Number</ControlLabel>
            <FormControl
              name="phoneNumber"
              type="number"
              value={this.state.phoneNumber}
              onChange={this.handlePhoneNumberChange}
            />
          </FormGroup>
          <br />
          <FormGroup validationState={this.state.emailValidationState}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </FormGroup>
          <br />
          <ControlLabel>Relationship</ControlLabel>
          <div style={style}>
            <input
              type="radio"
              name="relationship"
              value="co-worker"
              onClick={this.onChange}
            />
            <span style={style}>Co-worker</span>
            <input
              type="radio"
              name="relationship"
              value="friend"
              onClick={this.onChange}
            />
            <span style={style}>Friend</span>
          </div>
          <br />
          <Button
            bsStyle="primary"
            disabled={this.state.disableCreateUserButton}
            onClick={this.onClickSave}
          >
            Create User
          </Button>
        </div>
      </div>
    );
  }
}

export default CreateAssessUserPage;
