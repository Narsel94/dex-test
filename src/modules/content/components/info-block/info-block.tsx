import React, { FC, PropsWithChildren } from "react";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import classNames from "classnames";
import { InfoInput } from "../../../../common/components/exports";

import styles from "./info-block.module.css";

type TInfoBlock = PropsWithChildren & {
  title: string;
  subtitle?: string | number;
};

export const InfoBlock: FC<TInfoBlock> = ({ title, children, subtitle }) => {
  const isMobile = useMobileMediaQuery();

  const dataClasses = classNames({
    [styles.dataBlockDesc]: !isMobile,
    [styles.dataBlockMob]: isMobile,
  });

  return (
    <div className={dataClasses}>
      <h3>{title}</h3>
      {children}
      {/* <InfoInput value={subtitle}/> */}
      {subtitle &&<p>{subtitle}</p>}
    </div>
  );
};
