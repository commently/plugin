import React, { useState } from 'react'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'
import { root, inputField, buttonsRow, button_default, button_primary, button_secondary } from './Panel.module.css'

function Panel({ clientX, clientY, comments, onPost, onCancel }) {
  const [commentText, setCommentText] = useState('')

  const handleCancelClick = () => {
    onCancel()
  }

  const handlePostClick = () => {
    onPost(commentText)
    setCommentText('')
  }

  return (
    <div
      className={root}
      style={{ left: `${clientX}px`, top: `${clientY}px` }}
      onClick={event => event.stopPropagation()}
    >
      {comments.map(({ id, text }) => <div key={id}>{text}</div>)}

      <TextareaAutosize
        className={inputField}
        placeholder="Add a comment"
        cacheMeasurements
        maxRows={10}
        value={commentText}
        onChange={event => setCommentText(event.target.value)}
      />

      <div className={buttonsRow}>
        <button className={classNames(button_default, button_secondary)} onClick={handleCancelClick}>Cancel</button>  
        <button className={classNames(button_default, button_primary)} onClick={handlePostClick}>Post</button>  
      </div>
    </div>
  )
}

export default Panel
