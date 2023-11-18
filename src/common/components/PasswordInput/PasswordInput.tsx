import React, { FC, forwardRef, useRef, useState } from "react";
import styles from "./PasswordInput.module.css";
import { IconCloseEye, IconEye } from "../../../assests/icons/exports";
import classNames from "classnames";
import { useCombinedRefs } from "../../hooks/useCombineRefs";

type TPasswordInput = {
  title: string;
  error?: string;
  propValue: string;
  onChange: (e?: any) => void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
};

export const PasswordInputLabel: FC<TPasswordInput> = ({
  error,
  propValue,
  onChange,
  onBlur,
  title,
  ...props
}) => {
  const [showPass, setShowPass] = useState(false);

  const inputClassess = classNames(styles.input, {
    [styles.invalid]: Boolean(error),
  });

  const onIconClick = () => {
    setShowPass(!showPass);
  };

  return (
    <label className={styles.label}>
      {title}
      <input
        className={inputClassess}
        onChange={onChange}
        value={propValue || ""}
        onBlur={onBlur}
        type={showPass ? "text" : "password"}
        {...props}
        autoComplete="password"
      />
      <div className={styles.icon} onClick={onIconClick}>
        {showPass ? (
          <IconEye type="primary" size={16} />
        ) : (
          <IconCloseEye type="primary" size={16} />
        )}
      </div>
      <p className={styles.error}>{error || ""}</p>
    </label>
  );
};
