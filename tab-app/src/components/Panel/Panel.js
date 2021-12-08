import TextareaAutosize from 'react-textarea-autosize'
import { root, inputField } from './Panel.module.css'

function Panel() {
  return (
    <div className={root}>
      <TextareaAutosize className={inputField} placeholder="Add a comment" cacheMeasurements maxRows={10} />
    </div>
  )
}

export default Panel
