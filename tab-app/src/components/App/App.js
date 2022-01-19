import React, { useEffect, useState } from 'react'
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

function getCurrentKey() {
  return 'commently_' + window.location.href
}

function App() {
  const [isOn, setIsOn] = useState(false)

  const [pins, setPins] = useState([])

  useEffect(
    () => {
      const json = localStorage.getItem(getCurrentKey())

      if (!json) {
        return []
      }

      const storagePins = JSON.parse(json)

      if (storagePins.length > 0) {
        setIsOn(true)
      }
      
      setPins(storagePins)
    },
    [],
  )

  useEffect(
    () => {
      const messageListener = ({ type }) => {
        if (type === 'toggle') {
          setIsOn(prev => !prev)
        }
        
        return true
      }

      chrome.runtime.onMessage.addListener(messageListener)

      return () => {
        chrome.runtime.onMessage.removeListener(messageListener)
      }
    },
    [],
  )

  useEffect(
    () => {
      localStorage.setItem(getCurrentKey(), JSON.stringify(pins))
    },
    [pins],
  )

  useEffect(
    () => {
      chrome.runtime.sendMessage({ type: 'status', payload: { isOn } })
    },
    [isOn],
  )

  function updatePins(recipe) {
    setPins(prevPins => produce(prevPins, recipe))
  }

  const handleRootClick = ({ clientX, clientY }) => {
    updatePins(draftPins => {
      if (draftPins.some(p => p.isOpen)) {
        return getClosedPins(draftPins)
      }

      draftPins.push({
        clientX,
        clientY,
        id: draftPins.length + 1,
        createdAt: Date.now(),
        comments: [],
        isOpen: true,
        isResolved: false,
      })
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
      comments.push({ id: comments.length + 1, createdAt: Date.now(), text: commentText })
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

  const handlePanelResolve = pinId => () => {
    updatePins(draftPins => {
      findPinById(draftPins, pinId).isResolved = true
    })
  }

  if (isOn === false) {
    return null
  }
  
  return (
    <div onClick={handleRootClick} className={classNames(root, { [root_active]: !pins.some(p => p.isOpen) })}>
      {pins.filter(({ isResolved }) => !isResolved).map(({ clientX, clientY, id, comments, isOpen }) => (
        <div key={id}>
          <Pin clientX={clientX} clientY={clientY} isActive={isOpen} text={id} onClick={handlePinClick(id)} />

          {isOpen && (
            <Panel
              clientX={clientX}
              clientY={clientY + 8}
              comments={comments}
              onPost={handlePanelPost(id)}
              onCancel={handlePanelCancel(id)}
              onResolve={handlePanelResolve(id)}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default App
