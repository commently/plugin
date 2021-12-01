import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { uid } from 'uid'

function App() {
  const [pins, setPins] = useState([])

  const handleRootClick = ({ clientX, clientY }) => {
    setPins(prevPins => [...prevPins, { clientX, clientY, id: uid() }])
  }

  const handlePinClick = () => {
    console.log('conversation clicked');
  }
  
  return (
    <div onClick={handleRootClick} style={{ flexGrow: 1 }}>
      {pins.map(({ clientX, clientY, id }) => (
        <div key={id}>
          <button
            onClick={handlePinClick}
            style={{
              position: 'absolute',
              left: `${clientX}px`,
              top: `${clientY}px`,
              width: '20px',
              height: '20px',
              borderRadius: '10px',
              borderBottomLeftRadius: '0px',
              backgroundColor: 'green',
              transform: 'translateY(-20px)',
              zIndex: '1',
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>
      ))}
    </div>
  )
}

const root = document.createElement('div')
root.id = 'commently'
root.style.position = 'fixed'
root.style.inset = '0'
root.style.display = 'flex'
document.body.appendChild(root)

ReactDom.render(<App />, root);
