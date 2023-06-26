import React from 'react'
import DeleteButton from './DeleteButton';

const Hero = () => {
  const imageUrl = 'http://localhost:5000/images/1687780774616_contact.png';
  return (
    <div>
      hero 
      <div>
        <img src={imageUrl} alt="" />
      </div>
      <DeleteButton/>
    </div>
  )
}

export default Hero