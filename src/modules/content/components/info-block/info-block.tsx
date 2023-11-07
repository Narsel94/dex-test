import React, { FC } from "react";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import classNames from "classnames";

import styles from "./info-block.module.css";

type TInfoBlock = {
  title: string;
  subtitle: string | number;
};

export const InfoBlock: FC<TInfoBlock> = ({ title, subtitle }) => {
  const isMobile = useMobileMediaQuery();

  const dataClasses = classNames({
    [styles.dataBlockDesc]: !isMobile,
    [styles.dataBlockMob]: isMobile,
  });

  return (
    <div className={dataClasses}>
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  );
};