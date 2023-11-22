import React, { FC } from "react";
import styles from "./StyledContentForm.module.css";

type TForm = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> ;

export const StyledContentForm:FC<TForm> = (({ children, ...props }) => {

  return <form {...props} className={styles.form}>{children}</form>;
});
