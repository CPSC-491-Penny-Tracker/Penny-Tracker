import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserContext from "../context/UserContext";
import JwtService from "../service/JwtService";

const Tab = () => {
  const context = useContext(UserContext)
  const navigate = useNavigate();

  const logout = () => {
    context.processLogout()
    navigate('/users')
  }

  const loggedInNav = () => (
    <React.Fragment>
      <Nav.Link href="#/planner" className="align-middle">Planner</Nav.Link>
      <Nav.Link href="#/summary" className="align-middle">Summary</Nav.Link>
    </React.Fragment>
  )

  const loggedIn = () => 
    <Button variant="outline-danger" onClick={logout}>Logout</Button>
  
  const loggedOut = () => (
    <React.Fragment>
      <Nav.Link href="#/register" className="d-flex align-items-center me-3">Register</Nav.Link>
      <NavLink to="/users">
        <Button variant="outline-success">Login</Button>
      </NavLink>
    </React.Fragment>
  )

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand disabled>{JwtService.hasAuthToken() ? `Hello, ${context.user.username}` : 'Penny Tracker'} </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#/product" className="align-middle">Compare</Nav.Link>
            {JwtService.hasAuthToken() && loggedInNav()}
          </Nav>
          <div className="d-flex">
            {JwtService.hasAuthToken() ? loggedIn() : loggedOut()}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Tab
