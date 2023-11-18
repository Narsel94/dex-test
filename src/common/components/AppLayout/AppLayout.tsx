import React from 'react'
import { Outlet } from 'react-router'
import styles from './AppLayout.module.css'

export const AppLayout = () => {
  return (
    <div className={styles.app}>{<Outlet/>}</div>
  )
}
