import React, { FC } from 'react'
import styles from './ErrorBlock.module.css'
import { SerializedError } from '@reduxjs/toolkit'

type TErrorBlock = {
  errorMessage?:string,
  error?: SerializedError
}

export const ErrorBlock:FC<TErrorBlock> = ({errorMessage, error}) => {

  return (
    <div className={styles.errorWrapper}>
      <h1>{error?.name || 'Error'}: {error?.message || 'Something goes wrong!'}</h1>
    </div>
    
    )
}
