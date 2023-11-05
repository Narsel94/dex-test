import React, { FC, useState } from "react";
import styles from "./password-input-label.module.css";
import { IconCloseEye, IconEye } from '../../../assests/icons/exports';
import { InvalidMessage } from "../exports";
import classNames from "classnames";

type TControledInput = {
  title: string,
  error?: string
  [x: string]: any
}

export const PasswordInputLabel:FC<TControledInput> = ({error, title, ...props }) => {
  const [showPass, setShowPass] = useState(false);

  const inputClassess = classNames(styles.input, {
    [styles.invalid]:Boolean(error)
  })
  
  const onIconClick = () => {
    setShowPass(!showPass);
    console.log(props);
  };



  return (
    <label className={styles.label}>
      {title}
         <input className={inputClassess} type={showPass? "text" : 'password' } {...props} autoComplete='password'/>
     
      <div className={styles.icon} onClick={onIconClick}>
        {showPass ? <IconEye type='primary' size={16} /> : <IconCloseEye type='primary' size={16}/>}
      </div>
      <InvalidMessage message={error}></InvalidMessage>
      
    </label>
  );
};
