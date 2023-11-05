import React, { SyntheticEvent, FC } from "react";
import classNames from "classnames";
import styles from "./button-with-icon.module.css";

type TButtonWithIcon = Omit<React.HTMLProps<HTMLButtonElement>, "type"> & {
  text: string;
  colored?: true; 
  type: "column" | "row";
  children?: JSX.Element | undefined;
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
};

export const ButtonWithIcon: FC<TButtonWithIcon> = ({
  text,
  colored,
  type,
  onClick,
  children,
  ...rest
}) => {
  const baseClasses = classNames(styles.base, {
    [styles.column]: type === "column",
    [styles.row]: type === "row",
    [styles.colored]: colored
  });

  return (
    <button className={baseClasses} onClick={onClick} {...rest}>
      {children}
      {text}
    </button>
  );
};
