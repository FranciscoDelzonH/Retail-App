import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {listProductDetails,createProductReview} from '../actions/productActions.js'
import { Row,Col,Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap'
import Raiting from '../Componentes/Raiting';
import Loader from '../Componentes/loader.js';
import Message from '../Componentes/message.js'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants.js';
import Meta from '../Componentes/Meta.js';

const ProductScreen = ({history,match}) => {

    //cantidades para el carrito de compra
    const [qty, setqty] = useState(1);
    const [rating, setrating] = useState(0);
    const [comment, setcomment] = useState('');

    const dispatch= useDispatch()

    const productDetails = useSelector(state => state.productDetails);
    const {loading,error,product}=productDetails

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo}=userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const {success: successProductReview,error: errorProductReview}=productReviewCreate

    useEffect(()=>{
        if (successProductReview) {
            alert('Reseña enviada!, gracias por compartir su opinion >.<')
            setrating(0);
            setcomment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(listProductDetails(match.params.id))
      },[dispatch,match,successProductReview]) 

    const addToCart = ()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
       
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }

  return (
    <>
        
        <Link className='btn btn-dark my-3' to='/'>Volver</Link>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <>
              <Meta title={product.name} description={product.description}/>
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Raiting rating={product.rating} num={` ${product.numReviews} reseñas`}/>
                            </ListGroupItem>
                            <ListGroupItem >
                                Descripción: {product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Precio: 
                                        </Col>
                                        <Col>
                                            <strong>{product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Stock: 
                                        </Col>
                                        <Col>
                                        <strong>{product.countInStock===0 ? 'No Disponible' : product.countInStock>10 ? 'En Stock' : 'Ultimas unidades'}</strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                                {/* //mostrar si hay stock del producto y mostrar un select con la cantidad de productos existentes
                                para asi de esta manera el usuario seleccione cuantos productos desea llevar */}
                                {product.countInStock > 0 &&(
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={(e)=>
                                                setqty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map(x =>(
                                                     <option key={x + 1} value={x+1}>
                                                     {x+1}
                                                     </option>
                                                 ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}

                                <ListGroupItem className="d-grid gap-2">
                                    <Button onClick={addToCart} className='btn-block btn-dark' type='button' disabled={product.countInStock===0}>Añadir al Carrito</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                        <ListGroup variant= 'flush'>
                            {product.reviews.map(review => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Raiting rating={review.rating} value={review.rating}/>
                                    <p>{review.createdAt.substring(0,10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item>
                                <h2>Escriba su opinion acerca del producto</h2>
                                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as='select' value={rating} onChange={(e)=>setrating(e.target.value)}>
                                                <option value=''>Seleccione...</option>
                                                <option value='1'>1 - Muy Malo</option>
                                                <option value='2'>2 - Malo</option>
                                                <option value='3'>3 - Bueno</option>
                                                <option value='4'>4 - Muy Bueno</option>
                                                <option value='5'>5 - Excelente</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setcomment(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Button type='submit' variant='primary'>Enviar</Button>
                                    </Form>
                                ) 
                                : 
                                    <Message>Para compartir su reseña del producto debe <Link to='/login'>Iniciar Sesión</Link></Message>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </>
        )}
    </>
  )
}

export default ProductScreen