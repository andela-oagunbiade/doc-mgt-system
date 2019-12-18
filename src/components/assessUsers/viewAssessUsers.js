/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import SendUserSMS from './sendUserSms';
import { getAssessUser } from '../../actions/assessUserActions';

class ViewAssessUsersPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      users: [],
      sendMessage: false,
      sender: null,
      receiver: null,
    };

    this.displayAllUsers = this.displayAllUsers.bind(this);
    this.showSMSPage = this.showSMSPage.bind(this);
  }

  componentWillMount() {
    return getAssessUser().then((response) => {
      this.setState(() => {
        return {
          users: response.data
        };
      });
    });
  }

  showSMSPage(sender, receiver) {
    this.setState(() => {
      return {
        sendMessage: true,
        sender,
        receiver
      };
    });
  }

  displayAllUsers(users) {
    return users.map((user, index) => {
      const { name, phoneNumber, email, relationship } = user;
      return (
        <div key={index}>
          <br />
          <p><strong>Name: </strong>{name}</p>
          <p><strong>Phone Number: </strong>{phoneNumber}</p>
          <p><strong>Email: </strong>{email}</p>
          <p><strong>Relationship: </strong>{relationship}</p>
          <button onClick={() => this.showSMSPage(name, phoneNumber)}> Send SMS </button>
          <br />
        </div>
      );
    });
  }

  render() {
    const { users, sender, receiver } = this.state;
    if (this.state.sendMessage) {
      return (
        <div className="Jumbotron">
          <PageHeader>Send SMS</PageHeader>
          <SendUserSMS
            sender={sender}
            receiver={receiver}
          />
        </div>
      );
    }
    return (
      <div className="Jumbotron">
        <PageHeader>View Assessment Candidates</PageHeader>
        {users.length > 0 ? this.displayAllUsers(users) : ''}
      </div>
    );
  }
}

export default ViewAssessUsersPage;
