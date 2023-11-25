import React, { FC } from 'react'

import styles from './notification.module.css'

type TNotification = {
  message?: string
}

export const Notification:FC<TNotification> = ({message}) => {
  
  if (message) {
    return <div className={styles.error}>{message}</div>
  }
  
 
  
  return null
}
