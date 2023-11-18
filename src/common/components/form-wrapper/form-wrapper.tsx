import React, { FC, PropsWithChildren } from 'react'
import styles from './form-wrapper.module.css'

export const FormWrapper:FC<PropsWithChildren> = ({children}) => {



  return (
    <section className={styles.wrapper}>{children}</section>
  )
}
