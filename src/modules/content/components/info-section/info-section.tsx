import React, { FC, PropsWithChildren } from "react";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import classNames from "classnames";
import styles from "./info-section.module.css";

type TInfoSection = PropsWithChildren & {
  extraClass?: string
}

export const InfoSection: FC<TInfoSection> = ({ children, extraClass }) => {
  const isMobile = useMobileMediaQuery();
  const sectionClasses = classNames(styles.section, {
    [styles.sectionDesc]: !isMobile,
    [styles.sectionMob]: isMobile,
  }, extraClass);

  return <section className={sectionClasses}>{children}</section>;
};
