import React from "react";
import { Navigate } from "react-router";
import { usePlayerInfo } from "../../../modules/players/hooks/usePlayerInfo";
import { BreadCrumbs } from "../../../common/components";
import { TPlayerData } from "../../../api/players/TPlayers";
import { UpdatePlayerForm } from "../../../modules/players/components";
import styles from "./UpdatePlayer.module.css";

export const UpdatePlayer = () => {
  const { player } = usePlayerInfo();

  return (
    <section className={styles.wrapper}>
      <BreadCrumbs />
      {player ? (
        <UpdatePlayerForm data={player} />
      ) : (
        <Navigate to="/players" replace />
      )}
    </section>
  );
};
