import React, {FC, PropsWithChildren} from 'react'
import styles from './form-container.module.css'

const FormContainer:FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default FormContainer