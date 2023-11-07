import React, { FC, PropsWithChildren } from 'react'
import styles from './list-footer.module.css'

export const ListFooter:FC<PropsWithChildren> = ({children}) => {
  return (
    <footer className={styles.footer}>{children}</footer>
  )
}
