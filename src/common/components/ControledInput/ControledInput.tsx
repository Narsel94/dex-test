import React, { forwardRef, useCallback, useRef, useState } from "react";
import styles from "./ControledInput.module.css";
import classNames from "classnames";
import { useCombinedRefs } from "../../helpers/useCombineRefs";

type TControledInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  title?: string;
  placeholder?: string;
  error?: string;
  search?: true;
  type?: "text" | "number" | "date" | "date";
  propValue?: string | number | readonly string[] | undefined;
  onChange: (...event: any[]) => void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
};

export const ControledInput = forwardRef<HTMLInputElement, TControledInput>(
  (
    {
      type = "text",
      title,
      search,
      placeholder = "Search...",
      error,
      propValue,
      onChange,
      onBlur,
      onFocus,
      ...props
    },
    forwardRef
  ) => {
    const [focus, setFocus] = useState(false);

    const innerRef = useRef<HTMLInputElement>(null);
    const ref = useCombinedRefs<HTMLInputElement>(innerRef, forwardRef);

    const handleInputBlur = useCallback(
      (e?: React.FocusEvent<HTMLInputElement>) => {
        setFocus(false);
        if (typeof onBlur === "function") {
          onBlur(e);
        }
      },
      [setFocus, onBlur]
    );
    const handleInputFocus = useCallback(
      (e?: React.FocusEvent<HTMLInputElement>) => {
        setFocus(true);
        if (typeof onFocus === "function") {
          onFocus(e);
        }
      },
      [setFocus, onFocus]
    );

    const inpuStyles = classNames(styles.base, {
      [styles.input]: !search,
      [styles.search]: search,
      [styles.invalid]: Boolean(error),
    });

    const labelStyles = classNames(styles.label, {
      [styles.labelSearch]: search,
    });

    return (
      <label className={labelStyles}>
        {title}
        <input
          onChange={onChange}
          className={inpuStyles}
          type={type}
          ref={ref}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          placeholder={search && placeholder}
          {...props}
          value={propValue ? propValue : ""}
          autoComplete="true"
        />
        {!search && <p className={styles.error}>{error || ""}</p>}
      </label>
    );
  }
);
