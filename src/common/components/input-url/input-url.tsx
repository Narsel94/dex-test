import React, { useCallback, useState, FC, useEffect } from "react";
import { InvalidMessage } from "../exports";
import { useMobileMediaQuery } from "../../hooks/useMobileMediaQuery";

import classNames from "classnames";

import styles from "./input-url.module.css";

type DropEvent = React.DragEvent<HTMLElement>;

type UrlInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  error?: string;
  value?: string;
  setValue: any;

  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
  onChange?(e?: React.ChangeEvent<HTMLInputElement>): void;
  extraClass?: string,
  [x: string]: any;
  
};

export const UrlInput: FC<UrlInput> = ({
  error,
  value,
  onBlur,
  onFocus,
  onChange,
  setValue,
  extraClass,
  name,
  ...rest
}) => {
  const [link, setLink] = useState<string | null>(null);
  const [focus, setFocus] = useState<boolean>(false);

  const isMobile = useMobileMediaQuery();

  const imageClasses = classNames(styles.image, {
    [styles.imageHide]: link === null,
  });

  const inputClasses = classNames(styles.label, {
    [styles.labelMobile]: isMobile,
    [styles.labelDesctop]: !isMobile,
    [styles.focus]: focus,
    [styles.error]: Boolean(error),
  });

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

  const handleDragOver = (e: DropEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (value) {
      setLink(value);
    }
  }, []);

  const handleDrop = (e: DropEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "link";
    if (e.dataTransfer.getData("URL")) {
      setLink(e.dataTransfer.getData("URL"));
      setValue(name, e.dataTransfer.getData("URL"));
    } else {
      setLink(null);
    }
  };

  return (
    <div className={`${styles.wrapper} ${extraClass}`}>
      <div
        draggable
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={inputClasses}
      >
        {link && <img className={imageClasses} src={link || ""} />}
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className={styles.input}
        />
      </div>
      <InvalidMessage message={error} />
    </div>
  );
};
