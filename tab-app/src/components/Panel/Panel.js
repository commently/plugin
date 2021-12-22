import React, { Fragment, useState } from 'react'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'
import { root, header, paddingContainer, comment, inputField, buttonsRow, button_default, button_primary, button_secondary, divider, comment__time, comment_text } from './Panel.module.css'

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
          <div className={classNames(paddingContainer, header)}>
            <div>{/* spacer for now */}</div>
            <button>Resolve</button>
          </div>

          <div className={paddingContainer}>
            {comments.map(({ id, createdAt, text }) => (
              <div key={id} className={comment}>
                <div className={comment__time}>{new Date(createdAt).toLocaleString()}</div>
                <div className={comment_text}>{text}</div>
              </div>
            ))}
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
