import React, { FC, PropsWithChildren } from "react";
import styles from "./styled-form.module.css";

type TForm = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> &
  PropsWithChildren & {
    title: string;
  };

export const Form: FC<TForm> = ({ title, children, ...rest }) => {
  return (
    <form className={styles.form} {...rest}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </form>
  );
};
