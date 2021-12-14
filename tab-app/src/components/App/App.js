import React, { useState } from 'react'
import { uid } from 'uid'
import { root } from './App.css'
import Pin from '../Pin/Pin'
import Panel from '../Panel/Panel'
import produce from 'immer'

function App() {
  const [pins, setPins] = useState([])

  const handleRootClick = ({ clientX, clientY }) => {
    setPins(prevPins => produce(prevPins, draftPins => {
      for (const draftPin of draftPins) {
        draftPin.isOpen = false
      }

      draftPins.push({ clientX, clientY, id: uid(), comments: [], isOpen: true })
    }))
  }

  const handlePanelPost = pinId => commentText => {
    setPins(prevPins => produce(prevPins, draftPins => {
      const draftPin = draftPins.find(p => p.id === pinId)

      if (!draftPin) {
        throw new Error('pin is not found')
      }

      draftPin.comments.push({
        id: uid(),
        text: commentText,
      })
    }))
  }
  
  return (
    <div onClick={handleRootClick} className={root}>
      {pins.map(({ clientX, clientY, id, comments, isOpen }) => (
        <div key={id}>
          <Pin clientX={clientX} clientY={clientY} isActive={isOpen} />
          <Panel clientX={clientX} clientY={clientY + 8} comments={comments} onPost={handlePanelPost(id)} />
        </div>
      ))}
    </div>
  )
}

export default App
