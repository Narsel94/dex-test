import React, {FC, PropsWithChildren, } from 'react'
import styles from './form-container.module.css'

type TForm = React.DetailedHTMLProps<
React.FormHTMLAttributes<HTMLFormElement>,
HTMLFormElement
> &
PropsWithChildren

const FormContainer:FC<TForm> = ({children}) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default FormContainer