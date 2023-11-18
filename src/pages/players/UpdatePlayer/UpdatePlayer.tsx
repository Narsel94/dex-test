import React from "react";
import { useLoaderData } from "react-router";
import { BreadCrumbs } from "../../../common/components";
import { TPlayerData } from "../../../api/players/TPlayers";
import { UpdatePlayerForm } from "../../../modules/players/components";
import styles from "./UpdatePlayer.module.css";

export const UpdatePlayer = () => {
  const playerData = useLoaderData() as TPlayerData;

  return (
    <section className={styles.wrapper}>
      <BreadCrumbs />
      <UpdatePlayerForm data={playerData} />
    </section>
  );
};
