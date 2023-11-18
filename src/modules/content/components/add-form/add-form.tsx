import React, { FC } from "react";
import styles from "./add-form.module.css";

type TForm = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> ;

export const AddFormContainer:FC<TForm> = (({ children, ...props }) => {

  return <form {...props} className={styles.form}>{children}</form>;
});
