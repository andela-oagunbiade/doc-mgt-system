/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, ControlLabel, Alert } from 'react-bootstrap';
import { sendSMS } from '../../actions/assessUserActions';

class SendUserSMS extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      message: '',
      showAlert: false,
      errorMessage: null,
      successMessage: null,
    };

    this.onChange = this.onChange.bind(this);
    this.displayErrorAlert = this.displayErrorAlert.bind(this);
    this.displaySuccessAlert = this.displaySuccessAlert.bind(this);
    this.sendSMSToUser = this.sendSMSToUser.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState(() => {
      return { [name]: value };
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

  sendSMSToUser(event) {
    event.preventDefault();
    const { message } = this.state;
    const { sender, receiver } = this.props;

    return sendSMS(sender, receiver, message)
      .then(() => {
        this.setState(() => {
          return {
            showAlert: true,
            successMessage: 'Successfully sent SMS.'
          };
        });
      })
      .catch(() => {
        this.setState(() => {
          return {
            showAlert: true,
            errorMessage: 'Unable to send SMS.'
          };
        });
      });
  }

  render() {
    const { message, showAlert, errorMessage, successMessage } = this.state;
    const { sender, receiver } = this.props;

    return (
      <div>
        {showAlert && errorMessage ? this.displayErrorAlert() : null}
        {showAlert && successMessage ? this.displaySuccessAlert() : null}
        <ControlLabel>Sender</ControlLabel>
        <FormControl
          disabled
          placeholder={sender}
          value={sender}
        />
        <br />
        <ControlLabel>Receiver</ControlLabel>
        <FormControl
          disabled
          value={receiver}
        />
        <br />
        <ControlLabel>Message</ControlLabel>
        <FormControl
          name="message"
          type="text"
          componentClass="textarea"
          placeholder="Write SMS text here."
          onChange={this.onChange}
        />
        <br />
        <Button
          bsStyle="primary"
          onClick={this.sendSMSToUser}
        >
          Send SMS
        </Button>
      </div>
    );
  }
}

SendUserSMS.propTypes = {
  sender: PropTypes.string.isRequired,
  receiver: PropTypes.string.isRequired,
};

export default SendUserSMS;
