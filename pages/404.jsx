import React from 'react'
import styles from '../styles/NotFound.module.scss'
import Layout from '../components/layout'

function NotFound() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.inner}>
          <span className={styles.page}>Page</span> <br /> <span className={styles.notFound}>Not Found</span>
        </div>
      </div>
    </Layout>
  )
}

export default NotFound