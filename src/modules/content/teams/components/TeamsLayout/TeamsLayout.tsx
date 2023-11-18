import React, {FC} from 'react';
import { Outlet } from "react-router-dom";


import styles from './TeamsLayout.module.css'


export const TeamsLayout:FC = () => {

  return (
    <section className={styles.page}>
        <Outlet/>
    </section>
  )
}
