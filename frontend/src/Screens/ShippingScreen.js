import React, { useState } from 'react';
import {Form,Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import FormContainer from '../Componentes/FormContainer.js';
import CheckoutSteps from '../Componentes/CheckoutSteps.js';
import {saveShippingAddress} from '../actions/cartActions.js'

const ShippingScreen = ({history}) => {

    const cart = useSelector(state=> state.cart);
    const {shippingAddress} = cart;
    console.log(shippingAddress);

    const [address, setaddress] = useState(shippingAddress.address || "");
    const [city, setcity] = useState(shippingAddress.city || "");
    const [postalCode, setpostalCode] = useState(shippingAddress.postalCode || "");
    const [country, setcountry] = useState(shippingAddress.country || "");

    const dispatch= useDispatch();

    console.log(address);

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({address,city,postalCode,country}));
        history.push('/payment')
        console.log(address);
    }
  return (
    <>
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <strong><Form.Label>Direccion</Form.Label></strong>
                    <Form.Control required className='back' type='text' placeholder='Ingrese su direccion' value={address} onChange={(e)=>setaddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <strong><Form.Label>Ciudad</Form.Label></strong>
                    <Form.Control required className='back' type='text' placeholder='Ingrese su ciudad' value={city} onChange={(e)=>setcity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='postal_code'>
                    <strong><Form.Label>Codigo Postal</Form.Label></strong>
                    <Form.Control required className='back' type='text' placeholder='Ingrese el codigo postal de su ciudad' value={postalCode} onChange={(e)=>setpostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='Country'>
                    <strong><Form.Label>País</Form.Label></strong>
                    <Form.Control required className='back' type='text' placeholder='Ingrese su país' value={country} onChange={(e)=>setcountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Button id='Continue' className='btn btn-success float-right' type='submit' variant='primary'>Continuar</Button>
            </Form>
        </FormContainer>
    </>
  )
}

export default ShippingScreen