import React, { Fragment, useState } from 'react'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'
import { root, paddingContainer, comment, inputField, buttonsRow, button_default, button_primary, button_secondary, divider } from './Panel.module.css'

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
      {comments.length > 0 && (
        <Fragment>
          <div className={paddingContainer}>
            {comments.map(({ id, text }) => <div key={id} className={comment}>{text}</div>)}
          </div>

          <div className={divider} />
        </Fragment>
      )}

      <div className={paddingContainer}>
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
    </div>
  )
}

export default Panel
