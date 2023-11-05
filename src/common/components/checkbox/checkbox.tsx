import React, { FC } from "react";
import styles from "./checkbox.module.css";
import { InvalidMessage } from "../exports";
import classNames from "classnames";

interface ICheckbox {
  text?: string;
  error?: string;
  onChange?: (...event: any[]) => void;
  onBlur?: () => void;
  [x: string]: any;
}

export const Checkbox: FC<ICheckbox> = ({
  text,
  error,
  onChange,
  onBlur,
  ...props
}) => {
  const checkBoxClasses = classNames(styles.label, {
    [styles.error]: Boolean(error),
  });

  return (
    <div className={styles.wrapper}>
      <label className={checkBoxClasses}>
        <input {...props} onChange={onChange} onBlur={onBlur} type="checkbox" className={styles.checkbox} />
        <span></span>
        {text}
      </label>
      <InvalidMessage message={error}></InvalidMessage>
    </div>
  );
};

