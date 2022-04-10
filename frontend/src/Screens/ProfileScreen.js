import React, { useEffect, useState } from 'react';
import {Form,Row,Button,Col, Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../Componentes/message.js';
import Loader from '../Componentes/loader.js';
import { getUserDetails , UserUpDate } from '../actions/userActions.js';
import { USER_UPDATE_RESET } from '../constants/userConstants.js';
import {listMyOrders} from '../actions/orderActions.js'


const ProfileScreen = ({location, history}) => {

    const [name, setname] = useState('')
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmpass, setconfirmpass] = useState('');
    const [message, setmessage] = useState(null)

    const dispatch= useDispatch();

    const userDetails = useSelector(state => state.userDetails);

    const {loading,error,user,} = userDetails;

    const userLogin = useSelector(state => state.userLogin);

    const {userInfo} = userLogin;

    const userUpdate = useSelector(state => state.userUpdate);

    const {success} = userUpdate;


    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }else{
            if (!user||!user.name|| success) {
                dispatch({type: USER_UPDATE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setname(user.name)
                setemail(user.email)
            }
        }
      
      }, [dispatch,history,userInfo,user,success])

    const submitHandler = (e) =>{
        e.preventDefault();
        if (password!==confirmpass) {
            setmessage('Las contraseñas no coinciden')
        }else{
            dispatch(UserUpDate({id: user._id, name, email, password}))
        }
    }

    const orderListMy = useSelector(state => state.orderListMy);

    const {loading: loadingOrders,error: errorOrders,orders,} = orderListMy;
    
     
    return (
      <>
        <Row>
            <Col md={3}>
                <h2>Perfil</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Los cambios se han guardado</Message>}
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
                        <Form.Control className='back' type='password' placeholder='Ingrese su contraseña' value={password} onChange={(e)=>setpassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmpassword'>
                        <strong><Form.Label>Confirme su contraseña</Form.Label></strong>
                        <Form.Control className='back' type='password' placeholder='Ingrese su contraseña' value={confirmpass} onChange={(e)=>setconfirmpass(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button className='mt-3' type='submit' variant='primary'>Guardar cambios</Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>Mis Ordenes</h2>
                {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>FECHA</th>
                                <th>TOTAL</th>
                                <th>ESTADO COMPRA</th>
                                <th>ESTADO ENVIO</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order=>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td className={order.isPaid && 'verde'}>{order.isPaid ? order.paidAt.substring(0,10) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )} </td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )} </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>Detalles</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>

      </>
    )
}
export default ProfileScreen