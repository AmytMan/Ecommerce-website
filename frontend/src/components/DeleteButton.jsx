import React from 'react'
import { Button } from 'react-bootstrap';
import { useDeleteProductMutation } from '../features/productApi';

const DeleteButton = (props) => {
    const [deleteProduct , {isSuccess}]= useDeleteProductMutation()
   
    const handleDelete = async ()=>{
        await deleteProduct(200)
    }
  return (
    <div>
        <Button onClick={()=>handleDelete()}>delete</Button>
    </div>
  )
}

export default DeleteButton