import React, {FC} from 'react';
import { Outlet } from "react-router-dom";


import styles from './teams.module.css'


export const TeamsPage:FC = () => {

  return (
    <section className={styles.page}>
        <Outlet/>
    </section>
  )
}
