import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {  useSelector } from 'react-redux';
import icons from '../constant/icons';
import Profile from './Profile';

function Header() {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const userinfo = useSelector((state) => state.authentication.userinfo);
  


  return (
    <div>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect fixed="top">
          <Container>
            <LinkContainer to={userinfo ? `/dashboard` : '/'}>
              <Navbar.Brand>Shopping</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {userinfo ? (
                  <>
                    <div onClick={handleShow}>
                      <icons.CgProfile fontSize="25px" color="white" />
                    </div>
                  </>
                ) : (
                  <>
                    <LinkContainer to="/login">
                      <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/register">
                      <Nav.Link>Sign Up</Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      {userinfo && <Profile value={show} onHide={handleClose} />}
    </div>
  );
}

export default Header;
