import React, { FC, PropsWithChildren } from 'react'
import { useMobileMediaQuery } from '../../../../common/hooks/useMobileMediaQuery'
import classNames from 'classnames'
import styles from './info-container.module.css'

export const InfoContainer:FC<PropsWithChildren> = ({children}) => {
  const isMobile = useMobileMediaQuery();

  const container = classNames({
    [styles.infoContainer]: !isMobile,
    [styles.mobile]: isMobile
  })


  return (
    <div className={container}>{children}</div>
  )
}
