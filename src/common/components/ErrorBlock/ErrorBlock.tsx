import React, { FC } from 'react'
import styles from './ErrorBlock.module.css'

type TErrorBlock = {
  errorMessage:string
}

export const ErrorBlock:FC<TErrorBlock> = ({errorMessage}) => {
  return (
    <div className={styles.errorWrapper}>{errorMessage}</div>

    )
}
