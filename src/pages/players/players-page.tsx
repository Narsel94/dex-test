import React, {FC} from "react";
import styles from "./players-page.module.css";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";


export const PlayersPage:FC = () => {
 const navigate = useNavigate()
 const onClick = () => {
  navigate('/players/add-player')
 }
  return (
    <section className={styles.page}>
      <button onClick={onClick} >Click</button>
      <Outlet/>
    </section>
  );
};
