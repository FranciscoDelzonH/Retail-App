import React, { useState } from 'react';
import {Form,Button, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import FormContainer from '../Componentes/FormContainer.js';
import {savePaymentMethod} from '../actions/cartActions.js'
import CheckoutSteps from '../Componentes/CheckoutSteps.js';

const PaymentScreen = ({history}) => {

    const cart = useSelector(state=> state.cart);
    const {shippingAddress} = cart;

    if (!shippingAddress) {
        history.push('/shipping')
    }
    console.log(shippingAddress);

    const [paymentMethod, setpaymentMethod] = useState('PayPal');

    const dispatch= useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder')
    }
  return (
    <>
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Metodo de Pago</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Selecciona tu metodo de pago</Form.Label>
                
                <Col>
                    <Form.Check type='radio' label='PayPal o tarjeta de credito' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e) => setpaymentMethod(e.target.value)}></Form.Check>
                    {/* <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' onChange={(e) => setpaymentMethod(e.target.value)}></Form.Check> */}
                </Col>
                </Form.Group>
                <Button id='Continue' className='btn btn-success float-right' type='submit' variant='primary'>Continuar</Button>
            </Form>
        </FormContainer>
    </>
  )
}

export default PaymentScreen