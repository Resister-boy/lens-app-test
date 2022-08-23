import React from 'react'
import Link from 'next/link'
import styles from '../styles/Chanel.module.scss'

function platform({ title }) {
  console.log('title', title)
  const chanels = title.attributes
  return (
    <div className={styles.container}>
      {chanels && chanels.map((chanel, index) => {
        return (<Link href={chanel.value} key={index}>
          <a>
            <div className={styles.items}>
              {chanel.key}
            </div>
          </a>
        </Link>
        )})}
    </div>
  )
}

export default platform