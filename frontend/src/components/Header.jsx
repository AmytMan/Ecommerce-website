import React from 'react'
import { Navbar,Container,Nav,NavDropdown,Badge ,Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import {useNavigate ,Link} from 'react-router-dom';
import {CgProfile}from 'react-icons/cg'
import Profile from './Profile';
function Header() {
  const navigate = useNavigate();
  const userinfo = useSelector((state)=>state.authentication.userinfo)
  const dispatch = useDispatch();
  
  return (
    <div>
      <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect fixed='top' >
        <Container>
          <LinkContainer to={userinfo ? `/dashboard`:'/'}>
            <Navbar.Brand>Shooping</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
             
                <>
                {userinfo ? ( 
                  <>
                  <NavDropdown align='end' menuVariant='danger'  
                  title={<CgProfile fontSize="25px" />}
                  className='custom-dropdown'>                    
                  <NavDropdown.Item className='bg-light'>
                    <Profile/>
                  </NavDropdown.Item>                              
             </NavDropdown>
             <Button  to='/login' >my bag <Badge bg="secondary">new</Badge></Button>

             
              </>
                ) : (
                  <>
                  <LinkContainer to='/login'>
                  <Nav.Link>
                     Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <Nav.Link>
                    Sign Up
                  </Nav.Link>
                </LinkContainer>
</>
                ) }
                  
                
              
               
                 
                </>             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
 </div>
  )
}

export default Header