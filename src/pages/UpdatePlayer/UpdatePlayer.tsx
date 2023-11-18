import React from "react";
import { useLoaderData } from "react-router";
import { PlayerForm } from "../../modules/content/players/exports";
import { BreadCrumbs } from "../../common/components";
import { TPlayerData } from "../../api/players/types";
import styles from "./UpdatePlayer.module.css";

export const UpdatePlayer = () => {
  const playerData = useLoaderData() as TPlayerData;

  return (
    <section className={styles.wrapper}>
      <BreadCrumbs />
      <PlayerForm data={playerData} />
    </section>
  );
};
