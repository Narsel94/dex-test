import React, { FC, SyntheticEvent } from "react";
import styles from "./button.module.css";
import classNames from "classnames";


export interface IButton
extends React.PropsWithChildren<Omit<React.HTMLProps<HTMLButtonElement>, 'type'>> {
onClick?: (() => void) | ((e: SyntheticEvent) => void);
mode?: 'small' | 'big',
isPrime?: boolean;
htmlType: "button" | "submit" | "reset";
}



export const Button: FC<IButton> = ({ children, onClick, htmlType, isPrime, mode, ...rest }) => {
  
  const buttonClasses = classNames(styles.button, {
    [styles.primary]: isPrime,  
    [styles.secondary]: !isPrime,
    [styles.small]: (mode === 'small')
})

  return (
    <button type={htmlType} onClick={onClick} className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};


