import React, { Fragment, useState } from 'react'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'
import * as styles from './Panel.module.css'
import CheckCircleRegular from '../../icons/CheckCircleRegular'

function Panel({ clientX, clientY, comments, onPost, onCancel, onResolve }) {
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
      className={styles.root}
      style={{ left: `${clientX}px`, top: `${clientY}px` }}
      onClick={event => event.stopPropagation()}
    >
      {comments.length > 0 && (
        <Fragment>
          <div className={classNames(styles.paddingContainer, styles.header)}>
            <div>{/* spacer for now */}</div>
            <button className={styles.resolveButton} onClick={onResolve}>
              <CheckCircleRegular />
            </button>
          </div>

          <div className={styles.paddingContainer}>
            {comments.map(({ id, createdAt, text }) => (
              <div key={id} className={styles.comment}>
                <div className={styles.comment__time}>{new Date(createdAt).toLocaleString()}</div>
                <div className={styles.comment_text}>{text}</div>
              </div>
            ))}
          </div>

          <div className={styles.divider} />
        </Fragment>
      )}

      <div className={styles.paddingContainer}>
        <TextareaAutosize
          className={styles.inputField}
          placeholder="Add a comment"
          cacheMeasurements
          maxRows={10}
          value={commentText}
          onChange={event => setCommentText(event.target.value)}
        />

        <div className={styles.buttonsRow}>
          <button className={classNames(styles.button_default, styles.button_secondary)} onClick={handleCancelClick}>
            Cancel
          </button> 

          <button className={classNames(styles.button_default, styles.button_primary)} onClick={handlePostClick}>
            Post
          </button>  
        </div>
      </div>
    </div>
  )
}

export default Panel
