/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import { createAssessUser } from '../../actions/assessUserActions';

class CreateAssessUserPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      phoneNumber: '',
      email: '',
      relationship: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState(() => {
      return { [name]: value };
    });
  }

  onClickSave(event) {
    event.preventDefault();
    createAssessUser(this.state);
  }

  render() {
    return (
      <div className="Jumbotron">
        <PageHeader>Welcome To Assessment Page</PageHeader>
        <h3> Submit Info </h3>
        <div>
          Name: <input
            name="name"
            type="text"
            onChange={this.onChange}
          />
          <br />
          Phone Number: <input
            name="phoneNumber"
            type="text"
            onChange={this.onChange}
          />
          <br />
          Email: <input
            name="email"
            type="email"
            onChange={this.onChange}
          />
          <br />
          Relationship: <input
            name="relationship"
            type="text"
            onChange={this.onChange}
          />
          <br />
          <input
            type="submit"
            onClick={this.onClickSave}
          />
        </div>
      </div>
    );
  }
}

export default CreateAssessUserPage;
