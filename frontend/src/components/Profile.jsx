import React from 'react'
import { Card ,ListGroup} from 'react-bootstrap';
import {BiCurrentLocation} from 'react-icons/bi';
import { CgMail } from 'react-icons/cg';
import { CgProfile } from 'react-icons/cg';
import {IoMdLogOut} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
const dispatch = useDispatch();

    const handleLogout = ()=>{
        dispatch(logout())
        navigate('/')
      }
    const userInfo = useSelector((state)=>state.authentication.userinfo)
  return (
    
     <ListGroup >
      <ListGroup.Item variant="info" className="text-capitalize"><CgProfile/> {userInfo.name}</ListGroup.Item>
      <ListGroup.Item variant="info"><CgMail /> {userInfo.email}</ListGroup.Item>
      <ListGroup.Item variant="info" className="text-capitalize"> <BiCurrentLocation /> {userInfo.location}</ListGroup.Item>
      <ListGroup.Item onClick={handleLogout} variant="info"> <IoMdLogOut /> Logout</ListGroup.Item>

    </ListGroup>
   
  )
}

export default Profile