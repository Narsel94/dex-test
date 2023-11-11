import React, { FC, PropsWithChildren } from "react";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import classNames from "classnames";
import { InfoInput } from "../../../../common/components/exports";

import styles from "./info-block.module.css";

type TInfoBlock = PropsWithChildren & {
  title: string;
  subtitle?: string | number;
};

export const InfoBlock: FC<TInfoBlock> = ({ title, subtitle }) => {
  const isMobile = useMobileMediaQuery();

  const dataClasses = classNames({
    [styles.dataBlockDesc]: !isMobile,
    [styles.dataBlockMob]: isMobile,
  });

  const titleClasses = classNames(styles.title, {
    [styles.titleDesc]:!isMobile,
    [styles.titleMob]: isMobile
  })

  const subtitleClasses = classNames(styles.subtitle, {
    [styles.subtitleDesc]:!isMobile,
    [styles.subtitleMob]: isMobile
  })
  return (
    <div className={dataClasses}>
      <h3 className={titleClasses}>{title}</h3>
      {subtitle &&<p className={subtitleClasses}>{subtitle}</p>}
    </div>
  );
};
