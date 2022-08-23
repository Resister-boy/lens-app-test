import React from 'react'
import Logo from './logo'
import Link from 'next/link'
import styles from '../styles/Header.module.scss'
import ABI from '../ABI/contractABI.json'

const CONTRACT_ADDRESS = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d"

function home() {

  const connectContract = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    })
    console.log(accounts)
  }

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
          <button className={styles.button} onClick={connectContract}>Connect Wallet</button>
        </nav>
        </div>
      </header>
    </>
  )
}

export default home