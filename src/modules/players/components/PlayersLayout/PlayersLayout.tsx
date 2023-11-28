import React, {FC} from "react";
import styles from "./PlayersLayout.module.css";
import { Outlet } from "react-router-dom";

export const PlayersLayout:FC = () => {

  return (
    <section className={styles.page}>
      <Outlet/>
    </section>
  );
};
