import React from 'react'
import { Outlet } from 'react-router'
import styles from './app-layout.module.css'

export const AppLayout = () => {
  return (
    <div className={styles.app}>{<Outlet/>}</div>
  )
}
