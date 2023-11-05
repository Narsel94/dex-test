import React, {FC} from 'react'
import classNames from 'classnames';
import { useMobileMediaQuery } from '../../../../common/hooks/useMobileMediaQuery';
import styles from './empty-list.module.css'

type EmptyList = {
  image: string,
  message: string
}

export const EmptyList:FC<EmptyList> = ({image, message, ...props}) => {



  const isMobile = useMobileMediaQuery();
  const titleClasses = classNames(styles.title, {
    [styles.titleMobile]: isMobile,
    [styles.titleDescto]: !isMobile
  })

  const subtitleClasses = classNames(styles.subtitle, {
    [styles.subtitleMobile]:isMobile,
    [styles.subtitleDesctop]:!isMobile,
  })

  const imageClasses = classNames({
    [styles.imageMobile]: isMobile,
    [styles.imageDesctop]: !isMobile
  })

  return (
    <div className={styles.wrapper} {...props}>
      <img className={imageClasses} src={image} alt='Empty here'></img>
      <h1 className={titleClasses}>Empty here</h1>
      <p className={subtitleClasses}>{message}</p>
    </div>
  )
}
