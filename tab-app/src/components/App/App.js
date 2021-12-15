import React, { useState } from 'react'
import { uid } from 'uid'
import { root } from './App.css'
import Pin from '../Pin/Pin'
import Panel from '../Panel/Panel'
import produce from 'immer'

function closeAllPins(pins) {
  for (const draftPin of pins) {
    draftPin.isOpen = false
  }
}

function findPinById(pins, pinId) {
  const pin = pins.find(p => p.id === pinId)

  if (!pin) {
    throw new Error('pin is not found')
  }

  return pin
}

function App() {
  const [pins, setPins] = useState([])

  const handleRootClick = ({ clientX, clientY }) => {
    setPins(prevPins => produce(prevPins, draftPins => {
      closeAllPins(draftPins)
      draftPins.push({ clientX, clientY, id: uid(), comments: [], isOpen: true })
    }))
  }

  const handlePinClick = pinId => () => {
    setPins(prevPins => produce(prevPins, draftPins => {
      closeAllPins(draftPins)
      findPinById(draftPins, pinId).isOpen = true
    }))
  }

  const handlePanelPost = pinId => commentText => {
    setPins(prevPins => produce(prevPins, draftPins => {
      findPinById(draftPins, pinId).comments.push({ id: uid(), text: commentText })
    }))
  }
  
  return (
    <div onClick={handleRootClick} className={root}>
      {pins.map(({ clientX, clientY, id, comments, isOpen }) => (
        <div key={id}>
          <Pin clientX={clientX} clientY={clientY} isActive={isOpen} onClick={handlePinClick(id)} />
          {isOpen && <Panel clientX={clientX} clientY={clientY + 8} comments={comments} onPost={handlePanelPost(id)} />}
        </div>
      ))}
    </div>
  )
}

export default App
