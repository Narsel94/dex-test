import React, { FC, SyntheticEvent } from "react";
import styles from "./button.module.css";
import classNames from "classnames";


export interface IButton
extends React.PropsWithChildren<Omit<React.HTMLProps<HTMLButtonElement>, 'type'>> {
onClick?: (() => void) | ((e: SyntheticEvent) => void);
mode?: 'small' | 'big' | 'alt',
isPrime?: boolean;
htmlType: "button" | "submit" | "reset";
}

export const Button: FC<IButton> = ({ children, onClick, htmlType, isPrime, mode, ...rest }) => {
  
  const buttonClasses = classNames(styles.button, {
    [styles.button] : mode !== 'alt',
    [styles.altButton]: mode === 'alt',
    [styles.primary]: isPrime && mode !== 'alt',  
    [styles.secondary]: !isPrime && mode !== 'alt',
    [styles.small]: (mode === 'small')
})

  return (
    <button type={htmlType} onClick={onClick} className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};


