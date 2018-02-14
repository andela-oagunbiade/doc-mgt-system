/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, ControlLabel } from 'react-bootstrap';
import { sendSMS } from '../../actions/assessUserActions';

class SendUserSMS extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      message: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState(() => {
      return { [name]: value };
    });
  }

  render() {
    const { message } = this.state;
    const { sender, receiver } = this.props;

    return (
      <div>
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
          onChange={this.onChange}
        />
        <br />
        <Button
          bsStyle="primary"
          onClick={() => sendSMS(sender, receiver, message)}
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
