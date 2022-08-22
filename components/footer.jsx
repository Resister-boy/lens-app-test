import React from 'react'
import styles from '../styles/Footer.module.scss';

function footer() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
          <span>ⓒ{ new Date().getFullYear() }  LensProtocol</span>
      </div>
    </div>
  )
}

export default footer