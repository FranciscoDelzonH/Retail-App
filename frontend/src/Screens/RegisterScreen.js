import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {Form,Row,Button,Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../Componentes/message.js';
import Loader from '../Componentes/loader.js';
import FormContainer from '../Componentes/FormContainer.js';
import { register } from '../actions/userActions.js';


const RegisterScreen = ({location, history}) => {

    const [name, setname] = useState('')
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmpass, setconfirmpass] = useState('');
    const [message, setmessage] = useState(null)

    const dispatch= useDispatch();

    const userRegister = useSelector(state => state.userRegister);

    const {loading,error,userInfo,} = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
      
      }, [history,userInfo,redirect])

    const submitHandler = (e) =>{
        e.preventDefault();
        if (password!==confirmpass) {
            setmessage('Las contraseñas no coinciden')
        }else{
            dispatch(register(name,email,password))
        }
    }
    
     
    return (
      <>
        <FormContainer>
            <h1>Registrate</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <strong><Form.Label>Nombre</Form.Label></strong>
                    <Form.Control className='back' type='text' placeholder='Ingrese su nombre' value={name} onChange={(e)=>setname(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <strong><Form.Label>Correo Electronico</Form.Label></strong>
                    <Form.Control className='back' type='email' placeholder='Ingrese su email' value={email} onChange={(e)=>setemail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <strong><Form.Label>Contraseña</Form.Label></strong>
                    <Form.Control className='back' type='password' placeholder='Crea tu contraseña' value={password} onChange={(e)=>setpassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmpassword'>
                    <strong><Form.Label>Confirme su contraseña</Form.Label></strong>
                    <Form.Control className='back' type='password' placeholder='Ingrese su contraseña' value={confirmpass} onChange={(e)=>setconfirmpass(e.target.value)}></Form.Control>
                </Form.Group>

                <Button className='mt-3' type='submit' variant='primary'>Registrarse</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                Ya tiene una cuenta? 
                    <Link to={ redirect 
                    ? `login?redirect=${redirect}` 
                    : `/login`}
                    >Ingresar
                    </Link>
                </Col>
            </Row>
        </FormContainer>

      </>
    )
}
export default RegisterScreen