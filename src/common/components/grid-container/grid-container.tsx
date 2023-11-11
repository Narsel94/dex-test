import React, { FC, PropsWithChildren } from 'react'
import styles from './grid-container.module.css'

export const GridContainer:FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.gridContainer}>{children}</div>
  )
}
