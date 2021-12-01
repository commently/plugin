import * as React from 'react'
import * as ReactDom from 'react-dom'

function App() {
  return (
    <div>
      <h2>Welcome to React components</h2>
    </div>
  )
}

const root = document.createElement('div')
root.id = 'commently-plugin'
root.style.position = 'fixed'
root.style.inset = '0'
document.body.appendChild(root)

ReactDom.render(<App />, root);
