import React, { ChangeEvent, FC, InputHTMLAttributes, forwardRef } from "react";
import { useMobileMediaQuery } from "../../hooks/useMobileMediaQuery";
import classNames from "classnames";
import styles from "./info-input.module.css";

type TInfoInpt = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "disabled" | "type" | "value"
> & {
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLInputElement>) => void;
  disabled?: boolean;
  type?: "text" | "number";
  title?: string;
  value?: string | number;
  extraClass?: string
};

export const InfoInput: FC<TInfoInpt> = forwardRef(({
  onChange,
  disabled,
  type = "text",
  value,
  title,
  extraClass,
  ...rest
}, ref) => {




  const isMobile = useMobileMediaQuery()

  const labelClassnames = classNames(styles.label, {
    [styles.labelDesc]:!isMobile,
    [styles.labelMob]:isMobile,
    [styles.active]: !disabled
  }, extraClass)


  return (
    <label className={labelClassnames}>
      {title}
      <span>{value || ''}</span>
      <input
        className={styles.input}
        onChange={onChange}
        value={value}
        disabled={disabled}
        type={type}
        {...rest}
      />
      
    </label>
  );
});
