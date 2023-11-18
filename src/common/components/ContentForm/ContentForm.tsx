import React, { FC } from "react";
import styles from "./ContentForm.module.css";

type TForm = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> ;

export const ContentForm:FC<TForm> = (({ children, ...props }) => {

  return <form {...props} className={styles.form}>{children}</form>;
});
