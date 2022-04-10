import React from 'react'
import { Card, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Raiting from './Raiting'

const Product = ({data}) => {
  return (
    <>
        <Card  className='my-3 p-3 rounded'>
            <Link to={`/product/${data._id}`}>
                <Card.Img className='cardd' src={data.image} variant='top'/>
            </Link>
            <Card.Body>
            <Link to={`/product/${data._id}`}>
                <Card.Title as='div'><strong>{data.name}</strong></Card.Title>
            </Link>

            <Card.Text as='div'>
                <Raiting rating={data.rating} num={` ${data.numReviews} reseñas`}/>
            </Card.Text>

            <Card.Text as='h3'>${data.price}</Card.Text>
            </Card.Body>
        </Card>
    </>
  )
}

export default Product