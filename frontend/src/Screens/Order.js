import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {Row,Col,ListGroup,Image,Card, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../Componentes/message.js'
import Loader from '../Componentes/loader.js'
import { getOrderDetails, payOrder,deliverOrder } from '../actions/orderActions.js';
import { Link } from 'react-router-dom';
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from '../constants/orderConstants.js';


const Order = ({match,history}) => {

    const orderId = match.params.id;

    const [sdkReady, setsdkReady] = useState(false)

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;
    
    const orderDetails = useSelector(state => state.orderDetails)
    const {order,loading,error} = orderDetails;

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    if (!loading) {
        order.itemsPrice= (order.orderItems.reduce((acc,item) => acc + item.price * item.qty,0)).toFixed(0)
    }
    
    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        }
        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async= true;
            script.onload= () => {
                setsdkReady(true)
            }
            document.body.appendChild(script)
        }


        if(!order || order._id !== orderId ||successPay || successDeliver) {
           
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
                
            
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setsdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, order,successDeliver]) 

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId,paymentResult))
    }

    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }
    
  return loading 
  ? <Loader /> 
  : error ? <Message variant='danger'>{error}</Message> 
  : <>
        <h1 className='titulo-orden'>Orden: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Orden de compra</h2>
                        <p>
                        <strong>Nombre: </strong> {order.user.name}
                        </p>
                        <p>
                        <a href={`email a: ${order.user.email}`}>   {order.user.email}</a>
                        </p>
                        <p>
                            <strong>Direccion: </strong>
                            {order.shippingAddress.address},{' '}{order.shippingAddress.city},{' '}{order.shippingAddress.postalCode},{' '}{order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant='success'>Entregado {order.deliveredAt}</Message>
                        :
                        <Message variant='danger'>No entregado</Message>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Metodo de Pago</h2>
                        <p>
                            <strong>Metodo: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant='success'>Pagado el {order.paidAt.substring(0,10)}</Message>
                        :
                        <Message variant='danger'>No pagado </Message>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Productos</h2>
                        {order.orderItems.length === 0 
                        ? <Message>Aun no tienes ordenes de compra</Message> 
                        : <ListGroup variant='flush'>
                            {order.orderItems.map((item,index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded></Image>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x ${item.price} = ${item.qty*item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                          </ListGroup>}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Resumen del pedido</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Envio</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>IVA</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                )}
                            </ListGroup.Item>
                        )}
                        {loadingDeliver && <Loader/>}
                        {
                            userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&(
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={deliverHandler}>Marcar como enviado</Button>
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
 }

export default Order