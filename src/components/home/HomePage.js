import React from 'react';
import {Link} from 'react-router';

class Homepage extends React.Component {
  render () {
    return (
      <div className="Jumbotron">
        <h1 My Genius React Test App></h1>
        <p> React-Redux for Ultra responsive Web Sites</p>
        <Link to="about" className="btn btn-primary btn-lg"> About US</Link>
      </div>
    );
  }
}

export default Homepage;