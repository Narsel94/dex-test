import React, { FC, PropsWithChildren } from 'react'
import styles from './info-wrapper.module.css'


export const InfoWrapper:FC<PropsWithChildren> = ({children, ...rest}) => {
  return (
    <div className={styles.wrapper} {...rest}>{children}</div>
  )
}
