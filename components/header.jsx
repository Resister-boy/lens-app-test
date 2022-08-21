import React from 'react'
import Logo from './logo'
import styles from '../styles/Header.module.scss'

function home() {
  return (
    <>
      <header className={styles.container}>
        <div className={styles.inner}>
          <Logo />
          <nav className={styles.nav_container}>
          <div className={styles.nav_item}>
            Home
          </div>
          <div className={styles.nav_item}>
            Home
          </div>
          <div className={styles.nav_item}>
            Home
          </div>
        </nav>
        </div>
      </header>
    </>
  )
}

export default home