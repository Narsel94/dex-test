import React, { FC, PropsWithChildren } from "react";
import styles from "./AuthFormWrapper.module.css";

type TForm = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> &
  PropsWithChildren & {
    title: string;
  };

export const AuthFormWrapper: FC<TForm> = ({ title, children, ...rest }) => {
  return (
    <form className={styles.form} {...rest}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </form>
  );
};
