import React from 'react'
import {Route} from 'react-router-dom'
import { Navbar,Nav,Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Search from './Search'
import { logout } from '../actions/userActions'

const Header = () => {
    const dispatch=useDispatch();

    const userLogin= useSelector(state => state.userLogin)
    const {userInfo} = userLogin;

    const logoutHandler = ()=>{
        dispatch(logout())
    }
  return (
    <>
        <header>
            <Navbar className='conhead' bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                    <Navbar.Brand>Retail App</Navbar.Brand>
                    </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Route render={({history})=> <Search history={history}/>}/>
                                <Nav className="me-auto">
                                    <LinkContainer to='/aboutus'>
                                        <Nav.Link >Nosotros</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/places'>
                                    <Nav.Link >Sucursales</Nav.Link>
                                    </LinkContainer>
                                </Nav>
                                <Nav className="mr-auto">
                                    <LinkContainer to='/cart'>
                                        <Nav.Link ><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
                                    </LinkContainer>

                                    {userInfo 
                                    ? (
                                        <NavDropdown  align={{ lg: 'end' }} title={userInfo.name} id='username'>
                                            
                                            <NavDropdown.Item className='tam'>Carrito de compras</NavDropdown.Item>
                                            <NavDropdown.Item className='tam'>Lista de deseos</NavDropdown.Item>
                                            <NavDropdown.Item className='tam'>Historial</NavDropdown.Item>
                                            <hr></hr>
                                            <NavDropdown.Item className='tam'>Notificaciones</NavDropdown.Item>
                                            <NavDropdown.Item className='tam'>Mensajes</NavDropdown.Item>
                                            <hr></hr>
                                            <LinkContainer to='/profile'>
                                                <NavDropdown.Item className='tam'>Configurar cuenta</NavDropdown.Item>
                                            </LinkContainer>
                                            <hr></hr>
                                            <NavDropdown.Item className='tam' onClick={logoutHandler}>Cerrar sesión</NavDropdown.Item>
                                        </NavDropdown>
                                    )
                                    :
                                        <LinkContainer to='/login'>
                                            <Nav.Link ><i className="fa-solid fa-cat"></i>Ingresar</Nav.Link>
                                        </LinkContainer>
                                    }
                                    
                                    {userInfo && userInfo.isAdmin && (
                                        <NavDropdown  align={{ lg: 'end' }} title='Admin' id='adminmenu'>
                                            

                                            <LinkContainer to='/admin/userlist'>
                                                <NavDropdown.Item className='tam'>Usuarios</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to='/admin/productlist'>
                                                <NavDropdown.Item className='tam'>Productos</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to='/admin/orderlist'>
                                                <NavDropdown.Item className='tam'>Ordenes</NavDropdown.Item>
                                            </LinkContainer>
                                            <hr></hr>
                                            <NavDropdown.Item className='tam' onClick={logoutHandler}>Cerrar sesión</NavDropdown.Item>
                                        </NavDropdown>
                                    )}
                                </Nav>
                            </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    </>
  )
}

export default Header