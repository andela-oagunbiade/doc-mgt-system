/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import { getAssessUser, sendSMS } from '../../actions/assessUserActions';

class ViewAssessUsersPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      users: []
    };

    this.displayAllUsers = this.displayAllUsers.bind(this);
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

  displayAllUsers(users) {
    return users.map((user, index) => {
      return (
        <div key={index}>
          <br />
          <p><strong>Name: </strong>{user.name}</p>
          <p><strong>Phone Number: </strong>{user.phoneNumber}</p>
          <p><strong>Email: </strong>{user.email}</p>
          <p><strong>Relationship: </strong>{user.relationship}</p>
          <button onClick={() => sendSMS()}> Send SMS </button>
          <br />
        </div>
      );
    });
  }

  render() {
    const { users } = this.state;
    return (
      <div className="Jumbotron">
        <PageHeader>View Assessment Candidates</PageHeader>
        {users.length > 0 ? this.displayAllUsers(users) : ''}
      </div>
    );
  }
}

export default ViewAssessUsersPage;
