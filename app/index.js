import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App/App'

const root = document.createElement('div')
root.id = 'commently'
document.body.appendChild(root)

ReactDom.render(<App />, root);
