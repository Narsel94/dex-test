import React, {FC} from "react";
import styles from "./PlayersLayout.module.css";
import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router";


export const PlayersLayout:FC = () => {
 const navigate = useNavigate()
 const onClick = () => {
  navigate('/players/add-player')
 }
  return (
    <section className={styles.page}>
      <Outlet/>
    </section>
  );
};
