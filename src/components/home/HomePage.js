/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */

import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router';

class Homepage extends React.Component {
  render() {
    return (
      <Jumbotron>
        <h1> Document Management System </h1>
        <p> React-Redux for Ultra responsive Web Sites </p>
        <Link to="about" className="btn btn-primary btn-lg"> About US</Link>
      </Jumbotron>
    );
  }
}

export default Homepage;