import React, { FC } from "react";
import { TPlayerData } from "../../../../../api/players/types";
import { getAge } from "../../../players/helpers/getAge";
import styles from "./RosterElement.module.css";

type TRosterElement = {
  player: TPlayerData;
};

export const RosterElement: FC<TRosterElement> = ({ player }) => {
  const age = getAge(player.birthday);

  return (
    <div className={styles.wrapper}>
      <span className={styles.number}>{player.number || "-"}</span>
      <img className={styles.image} src={player.avatarUrl} alt={player.name} />
      <div className={styles.bio}>
        <span className={styles.name}>{player.name}</span>
        <span className={styles.position}>{player.position}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.span}>{player.height} cm</span>
        <span className={styles.span}>{player.weight} kg</span>
        <span className={styles.span}>{age}</span>
      </div>
    </div>
  );
};
