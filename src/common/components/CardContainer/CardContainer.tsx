import React, {FC, PropsWithChildren} from 'react'
import styles from './CardContainer.module.css'
export const CardContainer:FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.container}>{children}</div>
  )
}
