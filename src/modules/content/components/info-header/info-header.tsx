import React, { FC, SyntheticEvent } from "react";
import {
  BreadCrumbs,
  SmallButton,
} from "../../../../common/components/exports";
import { IconDelete, IconCreate } from "../../../../assests/icons/exports";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import classNames from "classnames";
import styles from "./info-header.module.css";

type THeader = {
  title?: string;
  onUpdateClick?: (e?: SyntheticEvent) => void;
  onTrashClick?: (e?: SyntheticEvent) => void;
};

export const InfoHeader: FC<THeader> = ({
  title,
  onUpdateClick,
  onTrashClick,
}) => {
  const isMobile = useMobileMediaQuery();

  const headerClasses = classNames(styles.header, {
    [styles.headerMob]: isMobile,
  });
  return (
    <div className={headerClasses}>
      <BreadCrumbs title={title} />
      <div className={headerClasses}>
        <SmallButton onClick={onUpdateClick}>
          <IconCreate size={16} type="primary" />
        </SmallButton>
        <SmallButton onClick={onTrashClick}>
          <IconDelete size={16} type="secondary" />
        </SmallButton>
      </div>
    </div>
  );
};
