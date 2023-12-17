import React, { FC } from "react";
import classNames from "classnames";
import styles from "./CustomCheckbox.module.css";

interface ICheckbox {
  text?: string;
  error?: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

export const CustomCheckbox: FC<ICheckbox> = ({
  text,
  error,
  onChange,
  onBlur,
  checked,
  ...props
}) => {
  const checkBoxClasses = classNames(styles.label, {
    [styles.error]: Boolean(error),
  });

  return (
    <div className={styles.wrapper}>
      <label className={checkBoxClasses}>
        <input
          {...props}
          onChange={onChange}
          onBlur={onBlur}
          checked={checked || false}
          type="checkbox"
          className={styles.checkbox}
        />
        <span></span>
        {text}
      </label>
      <p className={styles.errorMessage}>{error || ""}</p>
    </div>
  );
};
