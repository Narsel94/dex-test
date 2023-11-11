import React, { FC, PropsWithChildren } from 'react'
import { useMobileMediaQuery } from '../../hooks/useMobileMediaQuery'
import classNames from 'classnames'
import styles from './form-wrapper.module.css'

export const FormWrapper:FC<PropsWithChildren> = ({children}) => {

  const isMobile = useMobileMediaQuery()
  const classes = classNames(styles.wrapper, {
    [styles.desctop]: !isMobile,
    [styles.mobile]: isMobile
  })


  return (
    <section className={classes}>{children}</section>
  )
}
