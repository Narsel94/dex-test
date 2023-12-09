import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";

import styles from "./notification.module.css";

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

export const Notification: FC<TNotification> = ({ error }) => {
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
  }

  if (isCustomError(error)) {
    if (error.status === 400) {
      return (
        <div className={errorClasses}>Error: {error.status} (Bad Request)</div>
      );
    }

    if (error.status === 401) {
      return (
        <div className={errorClasses}>Error: {error.status} (Unauthorized)</div>
      );
    }

    if (error.status === 404) {
      return <div className={errorClasses}>Server Error: {error.status}</div>;
    }

    if (error.status === 409) {
      return (
        <div className={errorClasses}>Error: {error.status} (Conflict)</div>
      );
    }

    if (error.status === 500) {
      return (
        <div className={errorClasses}>
          Error: {error.status} (Internal Server Error)
        </div>
      );
    }

    return (
      <div className={errorClasses}>Something goes wrong: {error.status}</div>
    );
  }

  return null;
};
