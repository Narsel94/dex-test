import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";

import styles from "./AppNotification.module.css";

type TIsCustomError = {
  isCustomError: boolean;
  status: number;
};

type TNotification = {
  error?: unknown;
};

const isCustomError = (obj: unknown): obj is TIsCustomError => {
  if (typeof obj === "object" && obj !== null) {
    return "isCustomError" in obj && "status" in obj;
  }
  return false;
};

export const AppNotification: FC<TNotification> = ({ error }) => {
  const [isHide, setIsHide] = useState<boolean>(true);
  useEffect(() => {
    error && setIsHide(false);
    !error && setIsHide(true);
  }, [error]);

  const errorClasses = classNames(styles.error, {
    [styles.hide]: isHide,
  });

  if (error) {
    if (error instanceof Error) {
      return (
        <div className={errorClasses}>
          {error.name}: {error.message}
        </div>
      );
    }
    if (typeof error === "string") {
      return <div className={errorClasses}>{error}</div>;
    }

    if (isCustomError(error)) {
      return (
        <div className={errorClasses}>Something goes wrong: {error.status}</div>
      );
    }
  }

  return null;
};
