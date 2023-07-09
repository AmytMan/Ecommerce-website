import React from 'react'
import {  NavDropdown } from 'react-bootstrap';

function Dropdown(props) {
  return (
    <>
    <NavDropdown title="Products Detail" >
        <NavDropdown.Item >Price : ${props.item.price}</NavDropdown.Item>
        <NavDropdown.Item >Rating : {props.item.rating.rate}</NavDropdown.Item>
        <NavDropdown.Item >Count: {props.item.rating.count}</NavDropdown.Item>
      </NavDropdown>
    </>
  )
}

export default Dropdown