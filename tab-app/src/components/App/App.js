import React, { useState } from 'react'
import { uid } from 'uid'
import { root } from './App.css'
import Pin from '../Pin/Pin'
import Panel from '../Panel/Panel'

function App() {
  const [pins, setPins] = useState([])

  const handleRootClick = ({ clientX, clientY }) => {
    setPins(prevPins => [...prevPins, { clientX, clientY, id: uid() }])
  }
  
  return (
    <div onClick={handleRootClick} className={root}>
      {pins.map(({ clientX, clientY, id }) => (
        <div key={id}>
          <Pin clientX={clientX} clientY={clientY} />
          <Panel clientX={clientX} clientY={clientY + 8} />
        </div>
      ))}
    </div>
  )
}

export default App
