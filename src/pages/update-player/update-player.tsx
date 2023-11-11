import React from "react";
import { useLoaderData } from "react-router";
import { PlayerForm } from "../../modules/content/players/exports";
import { BreadCrumbs } from "../../common/components/exports";
import {
  TPlayerData,
} from "../../api/players/types";
import styles from "./update-player.module.css";

export const UpdatePlayer = () => {
  const playerData = useLoaderData() as TPlayerData;

  return (
    <div className={styles.wrapper}>
      <BreadCrumbs />
      <PlayerForm data={playerData} />
    </div>
  );
};
