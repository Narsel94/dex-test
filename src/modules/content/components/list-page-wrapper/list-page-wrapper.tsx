import React, { FC, PropsWithChildren } from "react";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import classNames from "classnames";
import styles from "./list-page-wrapper.module.css";

export const ListPageWrapper: FC<PropsWithChildren> = ({ children }) => {
  const isMobile = useMobileMediaQuery()
  const classes = classNames(styles.wrapper, {
    [styles.desctop]: !isMobile,
    [styles.mobile]: isMobile,
  })

  return <section className={classes}>{children}</section>;
};
