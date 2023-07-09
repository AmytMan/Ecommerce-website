import React from 'react'
import  TableContainer  from '../components/TableContainer'
import { Button } from 'react-bootstrap';
import{ LinkContainer} from 'react-router-bootstrap'
function AdminDashboard() {
  return (
    <div>
        <LinkContainer to='/admin/addproduct'>
        <Button variant='success' className='my-4'>Add new product</Button>
        </LinkContainer>
        <TableContainer/>
    </div>
  )
}

export default AdminDashboard