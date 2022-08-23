import React from 'react'
import styles from '../styles/Post.module.scss'

function post({ contents }) {
  console.log('contents', contents)
  return (
    <div className={styles.container}>
      <div className={styles.content_container}>{contents.map((content, index) => {
        return <div  key={index}>
          {!content 
          ? <div>{content.profile.name} did not post any content</div>
          : <div className={styles.content_item_container}>
              <span className={styles.content_title}>{content.profile.name}</span>
              <div className={styles.content_item}>{content.metadata.content}</div> 
              <div className={styles.other_information}>
                <span className={styles.content_author}>{content.metadata.name}</span>
                <span className={styles.content_time}>{content.createdAt.slice(0, 10)}</span>
              </div>
            </div>
        }

          </div>
      })} 
      </div>
    </div>
  )
}

export default post