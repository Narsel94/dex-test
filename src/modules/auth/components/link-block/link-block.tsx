import React, {FC} from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styles from './link-block.module.css'

type LinkBlock =  Omit<LinkProps, 'to'> & {
  message: string, 
  text: string,
  to: string
}

export const LinkBlock:FC<LinkBlock> = ({message, text, to, ...rest}) => {
  return (
    <span className={styles.linkWrapper}>{message}<Link className={styles.link} {...rest} to={to}>{text}</Link></span>
  )
}
