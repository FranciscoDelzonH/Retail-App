import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

const Search = ({history}) => {
    const [keyword, setkeyword] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }
  return (
    <>
        <Form onSubmit={submitHandler} inline className='d-flex search'>
            <Form.Control className='mr-sm-2 ml-sm-5' type='text' name='q' onChange={(e) => setkeyword(e.target.value)} placeholder='Buscar producto..'></Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>Buscar</Button>
        </Form>
    </>
  )
}

export default Search