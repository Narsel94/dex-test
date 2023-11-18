import React, { FC, PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./ListHeader.module.css";

type TListHeader = PropsWithChildren & {
  cols: 2 | 3;
};

export const ListHeader: FC<TListHeader> = ({ cols, children }) => {
  const headerClasses = classNames(styles.header, {
    [styles.threeCols]: cols === 3,
    [styles.twoCols]: cols === 2,
  });

  return <header className={headerClasses}>{children}</header>;
};
