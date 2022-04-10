import React, {useEffect} from 'react'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../Componentes/message.js'
import CheckoutSteps from '../Componentes/CheckoutSteps.js';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions.js';

const OrderScreen = ({history}) => {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)

    if (!cart.shippingAddress.address) {
        history.push('/shipping')
      } else if (!cart.paymentMethod) {
        history.push('/payment')
      }

    cart.itemsPrice= (cart.cartItems.reduce((acc,item) => acc + item.price * item.qty,0)).toFixed(0)

    cart.shippingPrice= cart.itemsPrice > 100 ? 0 : 100;
    
    cart.taxPrice = Number((0.19 * cart.itemsPrice).toFixed(0))

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(0)

    const orderCreate = useSelector(state => state.orderCreate)
    const {order,success,error} = orderCreate;

    useEffect(() => {
      if (success) {
          history.push(`/order/${order._id}`)
      }
      // eslint-disable-next-line
    }, [history, success])
    

    const placeOrderHandler = (e) => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    console.log(cart.shippingAddress.address);

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4/> 
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Orden de compra</h2>
                        <p>
                            <strong>Direccion: </strong>
                            {cart.shippingAddress.address},{' '}{cart.shippingAddress.city},{' '}{cart.shippingAddress.postalCode},{' '}{cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Metodo de Pago</h2>
                        <strong>Metodo: </strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Productos</h2>
                        {cart.cartItems.length === 0 
                        ? <Message>Carrito vacio</Message> 
                        : <ListGroup variant='flush'>
                            {cart.cartItems.map((item,index) => (
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
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Envio</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>IVA</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item className='d-grid gap-2'>
                            <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Continuar</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default OrderScreen