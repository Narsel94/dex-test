import React from "react";
import styles from "./content-header.module.css";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import { Logo, UserInfo } from "../exports";
import classNames from "classnames";

export const ContentHeader = () => {
  const isMobile = useMobileMediaQuery();
  const headerClasses = classNames({
    [styles.headerMobile]: isMobile,
    [styles.headerDesctop]: !isMobile,
  });

  return (
    <div className={headerClasses}>
      <Logo to="/teams" size={isMobile ? "small" : "medium"} />
      {!isMobile && <UserInfo />}
    </div>
  );
};
