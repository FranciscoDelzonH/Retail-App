import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../Componentes/message.js';
import Loader from '../Componentes/loader.js';
import FormContainer from '../Componentes/FormContainer.js';
import { getUserDetails, updateUser } from '../actions/userActions.js';
import { USER_UPDATEE_RESET } from '../constants/userConstants.js';


const UserEditScreen = ({match, history}) => {

    const userId=match.params.id;

    const [name, setname] = useState('')
    const [email, setemail] = useState('');
    const [isAdmin, setisAdmin] = useState(false);

    const dispatch= useDispatch();

    const userDetails = useSelector(state => state.userDetails);

    const {loading,error,user,} = userDetails;

    const userUpdatee = useSelector(state => state.userUpdatee);

    const {loading: loadingUpdate,error: errorUpdate,success: successUpdate} = userUpdatee;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATEE_RESET })
            history.push('/admin/userlist')
          } else {
            if (!user.name || user._id !== userId) {
              dispatch(getUserDetails(userId))
            } else {
              setname(user.name)
              setemail(user.email)
              setisAdmin(user.isAdmin)
            }
          }
        }, [dispatch, history, userId, user, successUpdate])
      

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(updateUser({_id: userId,name,email,isAdmin}))
        
    }
    
     
    return (
      <>
        <Link to='/admin/userlist' className='btn btn-light my-3'>
            Volver
        </Link>
        <FormContainer>
            <h1>Editar datos de Usuario</h1>
            {loadingUpdate && <Loader /> }
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
            (

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <strong><Form.Label>Nombre</Form.Label></strong>
                    <Form.Control className='back' type='text' placeholder='Ingrese su nombre' value={name} onChange={(e)=>setname(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <strong><Form.Label>Correo Electronico</Form.Label></strong>
                    <Form.Control className='back' type='email' placeholder='Ingrese su email' value={email} onChange={(e)=>setemail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='isadmin'>
                    <Form.Check  type='checkbox' label='Es Administrador' checked={isAdmin} onChange={(e)=>setisAdmin(e.target.checked)}></Form.Check>
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
export default UserEditScreen