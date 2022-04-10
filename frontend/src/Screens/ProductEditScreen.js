import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../Componentes/message.js';
import Loader from '../Componentes/loader.js';
import FormContainer from '../Componentes/FormContainer.js';
import { listProductDetails, updateProduct } from '../actions/productActions.js';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants.js';


const ProductEditScreen = ({match, history}) => {

    const productId=match.params.id;

    const [name, setname] = useState('')
    const [price, setprice] = useState(0);
    const [image, setimage] = useState('');
    const [brand, setbrand] = useState('');
    const [category, setcategory] = useState('');
    const [countInStock, setcountInStock] = useState(0);
    const [description, setdescription] = useState('');
    const [uploading, setuploading] = useState(false);

    const dispatch= useDispatch();

    const productDetails = useSelector(state => state.productDetails);

    const {loading,error,product} = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);

    const {loading: loadingUpdate,error: errorUpdate,success: successUpdate} = productUpdate;

    useEffect(() => {
            if (successUpdate) {
                dispatch({type: PRODUCT_UPDATE_RESET});
                history.push('/admin/productlist')
            }else{

                if (!product.name || product._id !== productId) {
                  dispatch(listProductDetails(productId))
                } else {
                  setname(product.name)
                  setprice(product.price)
                  setimage(product.image)
                  setbrand(product.brand)
                  setcategory(product.category)
                  setcountInStock(product.countInStock)
                  setdescription(product.description)
                }
            }
          
        }, [dispatch, history, productId, product,successUpdate])

        const uploadFileHandler = async(e) =>{
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image',file);
            setuploading(true);

            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                const {data} = await axios.post('/api/upload',formData,config)

                setimage(data)
                setuploading(false)
            } catch (error) {
                console.log(error);
                setuploading(false)
            }
        }
      

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock,
        }))
        
    }
    
     
    return (
      <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
            Volver
        </Link>
        <FormContainer>
            <h1>Editar Producto</h1>
            {loadingUpdate && <Loader /> }
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
            (

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <strong><Form.Label>Nombre</Form.Label></strong>
                    <Form.Control className='back' type='text' placeholder='Ingrese el nombre del producto' value={name} onChange={(e)=>setname(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                    <strong><Form.Label>Precio</Form.Label></strong>
                    <Form.Control className='back' type='number' placeholder='Ingrese el Precio' value={price} onChange={(e)=>setprice(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <strong><Form.Label>Imagen</Form.Label></strong>
                    <Form.Control className='back' type='text' placeholder='Ingrese el URL o suba su imagen' value={image} onChange={(e)=>setimage(e.target.value)}></Form.Control>
                    <Form.Control type='file' /* id='image-file' */ label='Subir' custom onChange={uploadFileHandler}></Form.Control>
                    {uploading && <Loader/>}
                </Form.Group>

                <Form.Group controlId='brand'>
                    <strong><Form.Label>Marca</Form.Label></strong>
                    <Form.Control className='back' type='text' placeholder='Ingrese la marca del producto' value={brand} onChange={(e)=>setbrand(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                    <strong><Form.Label>Categoría</Form.Label></strong>
                    <Form.Control className='back' type='text' placeholder='Ingrese la categoría del producto' value={category} onChange={(e)=>setcategory(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='stock'>
                    <strong><Form.Label>Stock</Form.Label></strong>
                    <Form.Control className='back' type='number' placeholder='Ingrese el sotck del producto' value={countInStock} onChange={(e)=>setcountInStock(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <strong><Form.Label>Descripción</Form.Label></strong>
                    <Form.Control className='back' type='text' placeholder='Ingrese la descripcion del producto' value={description} onChange={(e)=>setdescription(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
              Update
                </Button>
            </Form>
            )}
        </FormContainer>

      </>
    )
}
export default ProductEditScreen