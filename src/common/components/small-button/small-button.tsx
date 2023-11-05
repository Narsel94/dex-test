import React, {FC} from 'react'
import styles from './small-button.module.css'


type SmallButton = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & React.PropsWithChildren

export const SmallButton:FC<SmallButton> = ({children, ...rest}) => {
  return (
    <button className={styles.button} {...rest} type='button'>{children}</button>
  )
}
