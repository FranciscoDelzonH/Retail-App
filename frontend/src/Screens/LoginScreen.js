import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {Form,Row,Button,Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../Componentes/message.js';
import Loader from '../Componentes/loader.js';
import { login } from '../actions/userActions.js';
import FormContainer from '../Componentes/FormContainer.js';


const LoginScreen = ({location, history}) => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const dispatch= useDispatch();

    const userLogin = useSelector(state => state.userLogin);

    const {loading,error,userInfo,} = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
      
      }, [history,userInfo,redirect])

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(login(email,password))
    }
    
    return (
      <>
        <FormContainer>
            <h1>Ingresar</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Correo Electronico</Form.Label>
                    <Form.Control type='text' placeholder='Ingrese su email' value={email} onChange={(e)=>setemail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type='password' placeholder='Ingrese su contraseña' value={password} onChange={(e)=>setpassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button className='mt-3' type='submit' variant='primary'>Ingresar</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                No tienes una cuenta? 
                    <Link to={ redirect 
                    ? `register?redirect=${redirect}` 
                    : `/register`}
                    >Registrate aquí
                    </Link>
                </Col>
            </Row>
        </FormContainer>

      </>
    )
}

export default LoginScreen