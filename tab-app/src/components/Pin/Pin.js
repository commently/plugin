import React from 'react'
import { root } from './Pin.module.css'

function Pin({ clientX, clientY }) {
  const handlePinClick = event => {
    event.stopPropagation()
    console.log('conversation clicked');
  }

  return (
    <button
      className={root}
      style={{ left: `${clientX}px`, top: `${clientY}px` }}
      onClick={handlePinClick}
    />
  )
}

export default Pin
