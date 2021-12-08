import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'
import { root, inputField, buttonsRow, button_default, button_primary, button_secondary } from './Panel.module.css'

function Panel() {
  return (
    <div className={root}>
      <TextareaAutosize className={inputField} placeholder="Add a comment" cacheMeasurements maxRows={10} />

      <div className={buttonsRow}>
        <button className={classNames(button_default, button_secondary)}>Cancel</button>  
        <button className={classNames(button_default, button_primary)}>Post</button>  
      </div>
    </div>
  )
}

export default Panel
