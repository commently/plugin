import React, { useState } from 'react'
import { uid } from 'uid'
import { root, root_active } from './App.css'
import Pin from '../Pin/Pin'
import Panel from '../Panel/Panel'
import produce from 'immer'
import classNames from 'classnames'

function getClosedPins(pins) {
  return pins.map(p => ({ ...p, isOpen: false })).filter(p => p.comments.length > 0)
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

  function updatePins(recipe) {
    setPins(prevPins => produce(prevPins, recipe))
  }

  const handleRootClick = ({ clientX, clientY }) => {
    updatePins(draftPins => {
      if (draftPins.some(p => p.isOpen)) {
        return getClosedPins(draftPins)
      }

      draftPins.push({ clientX, clientY, id: draftPins.length + 1, comments: [], isOpen: true })
    })
  }

  const handlePinClick = pinId => () => {
    updatePins(draftPins => {
      const closedPins = getClosedPins(draftPins)
      findPinById(closedPins, pinId).isOpen = true

      return closedPins
    })
  }

  const handlePanelPost = pinId => commentText => {
    updatePins(draftPins => {
      const { comments } = findPinById(draftPins, pinId)
      comments.push({ id: comments.length + 1, text: commentText })
    })
  }

  const handlePanelCancel = pinId => () => {
    updatePins(draftPins => {
      const draftPin = findPinById(draftPins, pinId)

      if (draftPin.comments.length > 0) {
        draftPin.isOpen = false
        return
      }

      draftPins.splice(draftPins.indexOf(draftPin), 1)
    })
  }
  
  return (
    <div onClick={handleRootClick} className={classNames(root, { [root_active]: !pins.some(p => p.isOpen) })}>
      {pins.map(({ clientX, clientY, id, comments, isOpen }) => (
        <div key={id}>
          <Pin clientX={clientX} clientY={clientY} isActive={isOpen} text={id} onClick={handlePinClick(id)} />

          {isOpen && (
            <Panel
              clientX={clientX}
              clientY={clientY + 8}
              comments={comments}
              onPost={handlePanelPost(id)}
              onCancel={handlePanelCancel(id)}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default App
