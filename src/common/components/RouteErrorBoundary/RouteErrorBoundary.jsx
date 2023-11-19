import React from "react";
import styles from "./RouteErrorBoundary.module.css";
import { isRouteErrorResponse, useRouteError } from "react-router";

export const RouteErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{error.status}</h1>
        <h3 className={styles.subtitle}>{error.data.message || "Something Goes Wrong"}</h3>
        <h4 className={styles.subtitle}>{error.data.reason}</h4>

        {error.data}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>"Something Goes Wrong"</h1>
      <p className={styles.subtitle}>{`Error: ${error.status}`}</p>
    </div>
  );
};
