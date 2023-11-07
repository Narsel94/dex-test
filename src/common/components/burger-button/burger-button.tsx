import React, { FC, SyntheticEvent, useState } from "react";
import classNames from "classnames";
import styles from './burger-button.module.css'

type TButton = {
  onClick?: (e?: SyntheticEvent) => void;
  extraClasses?: string
};

export const BurgerButton: FC<TButton> = ({ onClick, extraClasses }) => {
  const [isActive, setActive] = useState<boolean>(false);
  const buttonClasses = classNames(styles.button, {
    [styles.open]:isActive,
   
  }, extraClasses)


  const handleClick = (e?: SyntheticEvent) => {
    setActive(!isActive);
    if (typeof onClick === "function") {
      onClick(e);
    }
  };

  return (
    <button className={buttonClasses} onClick={handleClick} type="button">
      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
    </button>
  );
};
