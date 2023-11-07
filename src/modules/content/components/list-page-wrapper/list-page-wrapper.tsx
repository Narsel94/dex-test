import React, { FC, PropsWithChildren } from "react";
import styles from "./list-page-wrapper.module.css";

export const ListPageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <section className={styles.wrapper}>{children}</section>;
};
