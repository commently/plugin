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
      draftPins.push({ clientX, clientY, id: uid(), comments: [] })
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
      {pins.map(({ clientX, clientY, id, comments }) => (
        <div key={id}>
          <Pin clientX={clientX} clientY={clientY} />
          <Panel clientX={clientX} clientY={clientY + 8} comments={comments} onPost={handlePanelPost(id)} />
        </div>
      ))}
    </div>
  )
}

export default App
