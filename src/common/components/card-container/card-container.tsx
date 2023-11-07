import React, {FC, PropsWithChildren} from 'react'
import { useMobileMediaQuery } from '../../hooks/useMobileMediaQuery'
import classNames from 'classnames'
import styles from './card-container.module.css'

export const CardContainer:FC<PropsWithChildren> = ({children}) => {

  const isMobile = useMobileMediaQuery()
  const containerClasses =classNames(styles.container, {
    [styles.desctop]:!isMobile,
    [styles.mobile]: isMobile
  })

  return (
    <div className={containerClasses}>{children}</div>
  )
}
