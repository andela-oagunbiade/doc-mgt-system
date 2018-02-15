import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuDropDown, MenuItem, Breadcrumb } from 'react-bootstrap';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <IndexLink to="/" activeClassName="active"> Document Management System </IndexLink>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1}>
          <Link to="documents" activeClassName="active">Documents</Link>
        </NavItem>
        <NavItem eventKey={2}>
          <Link to="about" activeClassName="active">About</Link>
        </NavItem>
        <NavItem eventKey={3}>
          <Link to="createUser" activeClassName="active">Create User</Link>
        </NavItem>
        <NavItem eventKey={4}>
          <Link to="viewUsers" activeClassName="active">View Users</Link>
        </NavItem>
      </Nav>
      <Nav pullRight>
        <NavDropdown eventKey={5} title="Login Actions" id="basic-nav-dropdown">
          <MenuItem eventKey={5.1}>Login</MenuItem>
          <MenuItem eventKey={5.2}>Sign Up</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={5.3}>Request Admin Access</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default Header;
