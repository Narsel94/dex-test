import React, {FC} from 'react'
import styles from './EmptyList.module.css'

type EmptyList = {
  image: string,
  message: string
}

export const EmptyList:FC<EmptyList> = ({image, message, ...props}) => {

  return (
    <div className={styles.wrapper} {...props}>
      <img className={styles.image} src={image} alt='Empty here'></img>
      <h1 className={styles.title}>Empty here</h1>
      <p className={styles.subtitle}>{message}</p>
    </div>
  )
}
