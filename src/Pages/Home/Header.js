import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Header = () => {
   const   [user] =useAuthState(auth)
   const logOut = () =>{
         signOut(auth)

   }

      return (
            <div>
                  <div className="nav-section bg-white sticky-top">
                  <Navbar collapseOnSelect expand="lg" >
                        <Container>
                              <Navbar.Brand as={Link} to='/'>
                                    TO DO APP
                                    
                                   
                              </Navbar.Brand>
                              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                              <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto">


                                    </Nav>
                                    <Nav className='text-center'>
                                    

                                          {
                                                user &&  <button onClick={logOut} className=' primary-btn'>Logut</button>
                                          }

                                        
                                       

                                    </Nav>
                              </Navbar.Collapse>
                        </Container>
                  </Navbar>
            </div>
            </div>
      );
};

export default Header;