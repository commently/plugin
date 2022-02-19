import classNames from 'classnames';
import React from 'react'
import { root, root_active } from './Pin.module.css'

function Pin({ clientX, clientY, isActive, text, onClick }) {
  const handlePinClick = event => {
    event.stopPropagation()
    onClick(event)
  }

  return (
    <button
      className={classNames(root, { [root_active]: isActive })}
      style={{ left: `${clientX}px`, top: `${clientY}px` }}
      onClick={handlePinClick}
    >
      {text}
    </button>
  )
}

export default Pin
