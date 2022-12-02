import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserContext from "../context/UserContext";
import JwtService from "../service/JwtService";
import "./tab.css";

const Tab = () => {
  const context = useContext(UserContext)
  const navigate = useNavigate();

  const logout = () => {
    context.processLogout()
    navigate('/users')
  }

  const loggedInNav = () => {
    return (
      <React.Fragment>
        <div className="tabs">
          <Nav.Link href="#/planner" className="tab">Planner</Nav.Link>
          <Nav.Link href="#/summary" className="tab">Summary</Nav.Link>
        </div>
      </React.Fragment>
    );
  }

  const loggedIn = () => {
    return (
      <React.Fragment>
        <div className="log3">
          <Button variant="outline-danger" onClick={logout}>Logout</Button>
        </div>
      </React.Fragment>
    );
  }
  
  const loggedOut = () => {
    return(
      <React.Fragment>
        <div className="log">
          <Nav.Link href="#/register">
            <Button variant="outline-success">Sign up</Button>
          </Nav.Link>
        </div>
        <div className="log2">
          <NavLink to="/users">
            <Button variant="outline-success">Login</Button>
          </NavLink>
        </div>
      </React.Fragment>
    );
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand disabled>{JwtService.hasAuthToken() ? `Hello, ${context.user.username}` : 'Penny Tracker'} </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll">
          <div className="tab-tab">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <div className="tabs">
                <Nav.Link href="#/product" className="tab">Compare</Nav.Link>
                {JwtService.hasAuthToken() && loggedInNav()}
              </div>
            </Nav>
          </div>
          <div className="d-flex">
            {JwtService.hasAuthToken() ? loggedIn() : loggedOut()}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Tab
