import classNames from 'classnames';
import React from 'react'
import { root, root_active } from './Pin.module.css'

function Pin({ clientX, clientY, isActive }) {
  const handlePinClick = event => {
    event.stopPropagation()
    console.log('conversation clicked');
  }

  return (
    <button
      className={classNames(root, { [root_active]: isActive })}
      style={{ left: `${clientX}px`, top: `${clientY}px` }}
      onClick={handlePinClick}
    />
  )
}

export default Pin
