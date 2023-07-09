import React from 'react'
import { Spinner } from 'react-bootstrap'
export default function SpinnerEffect() {
  return (
    <div className='text-center'>
        <h1>Data Loading....</h1>
        <Spinner animation="grow" variant="success" role="status" />
  
    </div>
  )
}
