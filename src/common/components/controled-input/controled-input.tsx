import React, { FC } from "react";
import { InvalidMessage } from "../exports";

import styles from "./controled-input.module.css";
import classNames from "classnames";

type TControledInput = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  title?: string;
  error?: string;
  type?: "text" | "number" | "date" | "date";
  propValue: string | number | readonly string[] | undefined
  onChange: (...event: any[]) => void
};

export const ControledInput: FC<TControledInput> = ({
  type = "text",
  title,
  error,
  propValue,
  onChange,
  ...props
}) => {
  const inpuStyles = classNames(styles.input, {
    [styles.invalid]: Boolean(error),
  });

  return (
 
    <label className={styles.label}>
      {title}
      <input  onChange={onChange} className={inpuStyles} type={type} {...props} value={propValue? propValue : ''} autoComplete="true"/>
      <InvalidMessage message={error} />
    </label>
  );
};

// name={title.toLowerCase()}
