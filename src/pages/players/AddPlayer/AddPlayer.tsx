import React, { FC } from "react";
import {
  BreadCrumbs,
} from "../../../common/components";
import { AddPlayerForm } from "../../../modules/players/components";
import styles from "./AddPlayer.module.css";



export const AddNewPlayer: FC = () => {

  return (
    <section className={styles.wrapper}>
      <BreadCrumbs />
      <AddPlayerForm/>
    </section>
  );
};
