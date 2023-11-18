import React, { FC, SyntheticEvent, useState } from "react";
import classNames from "classnames";
import styles from "./BurgerButton.module.css";

type TButton = {
  onClick?: (e?: SyntheticEvent) => void;
  extraClasses?: string;
  status?: boolean;
};

export const BurgerButton: FC<TButton> = ({
  onClick,
  extraClasses,
  status,
}) => {
  const buttonClasses = classNames(
    styles.button,
    {
      [styles.open]: status,
    },
    extraClasses
  );

  return (
    <button className={buttonClasses} onClick={onClick} type="button">
      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
    </button>
  );
};
