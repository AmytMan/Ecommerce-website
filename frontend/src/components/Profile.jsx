import React,{useState} from 'react';
import icon from '../constant/icons'
import {ListGroup,Offcanvas} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

function Profile(props) {
  
    const navigate = useNavigate();
const dispatch = useDispatch();

    const handleLogout = ()=>{
        dispatch(logout())
        navigate('/')
      }
    const userInfo = useSelector((state)=>state.authentication.userinfo)
  return (
    <>
   { props.value && (
      <Offcanvas show={props.value } onHide={props.onHide} placement='end' >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title><icon.CgProfile/>{userInfo.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <ListGroup >
    <ListGroup.Item variant="info"><icon.CgMail /> {userInfo.email}</ListGroup.Item>
    <ListGroup.Item variant="info" className="text-capitalize"> <icon.BiCurrentLocation /> {userInfo.location}</ListGroup.Item>
    <ListGroup.Item onClick={handleLogout} variant="info"> <icon.IoMdLogOut /> Logout</ListGroup.Item>
  </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
   
   )}
    </>
   
  )
}

export default Profile