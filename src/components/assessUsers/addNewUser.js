/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Button, FormControl, ControlLabel } from 'react-bootstrap';
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
    const style = {
      paddingRight: 10,
      paddingLeft: 5
    };

    return (
      <div className="Jumbotron">
        <PageHeader>Welcome To Assessment Page</PageHeader>
        <h3> Submit Info </h3>
        <div style={{ width: 500 }}>
          <ControlLabel>Name</ControlLabel>
          <FormControl
            name="name"
            type="text"
            onChange={this.onChange}
          />
          <br />
          <ControlLabel>Phone Number</ControlLabel>
          <FormControl
            name="phoneNumber"
            type="text"
            onChange={this.onChange}
          />
          <br />
          <ControlLabel>Email</ControlLabel>
          <FormControl
            name="email"
            type="email"
            onChange={this.onChange}
          />
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
