import React, { FC } from 'react'
import styles from './error-block.module.css'

type TErrorBlock = {
  errorMessage:string
}

export const ErrorBlock:FC<TErrorBlock> = ({errorMessage}) => {
  return (
    <div className={styles.errorWrapper}>{errorMessage}</div>

    )
}
