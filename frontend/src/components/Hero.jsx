import React from 'react'

const Hero = () => {
  const imageUrl = 'http://localhost:5000/images/1687780774616_contact.png';
  return (
    <div>
      hero 
      <div>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  )
}

export default Hero