import { FC, SyntheticEvent } from "react";
import {
  BreadCrumbs,
  Button
} from "..";
import { IconDelete, IconCreate } from "../../../assests/icons/exports";
import styles from "./InfoHeader.module.css";

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

  return (
    <div className={styles.header}>
      <BreadCrumbs title={title} />
      <div className={styles.header}>
        <Button htmlType="button" mode="alt" onClick={onUpdateClick}>
          <IconCreate size={16} type="primary" />
        </Button>
        <Button htmlType="button" mode="alt" onClick={onTrashClick}>
          <IconDelete size={16} type="secondary" />
        </Button>
      </div>
    </div>
  );
};
