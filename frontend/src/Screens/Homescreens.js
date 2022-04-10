import React, {useEffect} from 'react'  //utilizaremos useefect para hacer peticiones al servidor
import { Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import Product from '../Componentes/Product';
import {listProducts} from'../actions/productActions.js';
import Loader from '../Componentes/loader.js';
import Message from '../Componentes/message.js'
import Paginate from '../Componentes/Paginate';
import ProductTop from '../Componentes/ProductTop';
import Meta from '../Componentes/Meta';

const Homescreens = ({match}) => {

  const keyword = match.params.keyword

  const pageNumber= match.params.pageNumber || 1;

  const dispatch=useDispatch()

  const productList= useSelector(state=> state.productList);
  const {loading,error,products,page,pages} = productList

  useEffect(()=>{
    dispatch(listProducts(keyword,pageNumber))
  },[dispatch,keyword,pageNumber])



  return (
    <>
    <Meta />
    {!keyword ? <ProductTop /> : <Link to={`/`} className='btn btn-dark vol'>Volver</Link>}
        <h2>Productos </h2>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : 
        <>
        <Row>
        {products.map(p=>(
            <Col className="align-items-stretch d-flex" key={p._id} sm={12} md={6} lg={4} xl={3}>
                <Product key={p._id} data={p}/>
            </Col>
        ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </>
        }
        
    </>
  )
}

export default Homescreens