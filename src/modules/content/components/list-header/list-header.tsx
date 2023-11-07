import React, { FC, PropsWithChildren } from "react";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import classNames from "classnames";
import styles from "./list-header.module.css";

type TListHeader = PropsWithChildren & {
  cols: 2 | 3;
};

export const ListHeader: FC<TListHeader> = ({ cols, children }) => {
  const isMobile = useMobileMediaQuery();

  const headerClasses = classNames({
    [styles.threeCols]: !isMobile && cols === 3,
    [styles.twoCols]: !isMobile && cols === 2,

    [styles.headerMobile]: isMobile,
  });

  return <header className={headerClasses}>{children}</header>;
};
