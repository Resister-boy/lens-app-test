import React from 'react'
import styles from '../styles/Footer.module.scss';
import Logo from '../components/logo'

function footer() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Logo />
        <div>
          <span>github</span>
        </div>
      </div>
    </div>
  )
}

export default footer