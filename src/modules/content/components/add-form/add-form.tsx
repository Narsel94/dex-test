import React, { FC } from "react";
import classNames from "classnames";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import styles from "./add-form.module.css";

type TForm = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> ;

export const AddFormContainer:FC<TForm> = (({ children, ...props }) => {


  const isMobile = useMobileMediaQuery();
  const formClasses = classNames(styles.form, {
    [styles.formMobile]: isMobile,
  });
  return <form {...props} className={formClasses}>{children}</form>;
});
