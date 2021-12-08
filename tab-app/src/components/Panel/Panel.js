import { root, inputField } from './Panel.module.css'

function Panel() {
  return (
    <div className={root}>
      <textarea className={inputField} placeholder="Add a comment" />
    </div>
  )
}

export default Panel
