import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const CheckoutSteps = ({step1,step2,step3,step4}) => {
  return (
    <>
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 
                ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Ingresar</Nav.Link>
                    </LinkContainer>
                )
                :<Nav.Link disabled>Ingresar</Nav.Link>
                }
            </Nav.Item>
            <Nav.Item>
                {step2 
                ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Direccion</Nav.Link>
                    </LinkContainer>
                )
                :<Nav.Link disabled>Direccion</Nav.Link>
                }
            </Nav.Item>
            <Nav.Item>
                {step3 
                ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Metodo</Nav.Link>
                    </LinkContainer>
                )
                :<Nav.Link disabled>Metodo</Nav.Link>
                }
            </Nav.Item>
            <Nav.Item>
                {step4 
                ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Orden de compra</Nav.Link>
                    </LinkContainer>
                )
                :<Nav.Link disabled>Orden</Nav.Link>
                }
            </Nav.Item>
        </Nav>
    </>
  )
}

export default CheckoutSteps