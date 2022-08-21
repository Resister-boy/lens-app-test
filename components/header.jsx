import React from 'react'
import Logo from './logo'
import Link from 'next/link'
import styles from '../styles/Header.module.scss'

function home() {
  return (
    <>
      <header className={styles.container}>
        <div className={styles.inner}>
          <Link href="/">
            <a>
              <Logo />        
            </a>
          </Link>
          <nav className={styles.nav_container}>
            <Link href="/">
              <a  className={styles.nav_item}>
                Home
              </a>
            </Link>
            <Link href="/">
              <a className={styles.nav_item}>
                Home
              </a>
           </Link>
            <Link href="/">
              <a className={styles.nav_item}>
                Home
              </a>
            </Link>
        </nav>
        </div>
      </header>
    </>
  )
}

export default home