import React from 'react'
import { useGetProductsQuery,useDeleteProductMutation } from '../features/productApi';
import {toast} from 'react-toastify'
import icon from '../constant/icons';
import { Table ,Button} from 'react-bootstrap';
import Dropdown from './Dropdown';

 const TableContainer = () => {

    const [deleteProduct]  = useDeleteProductMutation();
    const {data:products ,isLoading} =  useGetProductsQuery();

    const handleDelete = async(id)=>{
        const response =  await deleteProduct(id)
        if(response.data){
         toast.success('product deleted successfully')
        }
    }


   if(isLoading){
    return <div>Loading...</div>
   }
  return (
    <div>

        <Table bordered  variant='light'>
      <thead>
        <tr>
          <th>Sno.</th>
          <th>Product Name</th>
          <th>Image</th>
          <th>Details</th>
          <th>Category</th>
          <th>Actions</th>  
        </tr>
      </thead>
      <tbody>
        {products? products.map((item, index)=>(
            <tr key={index}>
            <td>{index +1}</td>
            <td style={{width:"15rem"}}>{item.title}</td>
            <td>
                <img src={item.image} alt="" style={{width:"10rem"}} />
            </td>
            <td>
             <Dropdown item={item}/>
            </td>
            <td>{item.category}</td>
            <td>
              <div className='d-flex justify-content-evenly'>
                 <icon.AiTwotoneDelete onClick={()=>handleDelete(item.id)} color='red' size='25px'/> 
                 <icon.MdUpdate  color='green' size='25px'/> 
                                 
                </div>                 
            </td>

          </tr>
        )) :'loading' }
        
      </tbody>
    </Table>

    </div>
  )
}
export default TableContainer
