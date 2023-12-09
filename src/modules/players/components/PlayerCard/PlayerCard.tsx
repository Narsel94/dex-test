import React, { FC } from "react";
import { Link } from "react-router-dom";
import { TPlayerData } from "../../../../api/players/TPlayers";
import styles from "./PlayerCard.module.css";
import { useTeamName } from "../../hooks/useTeamName";

type TPlayerCard = {
  data: TPlayerData;
};

export const PlayerCard: FC<TPlayerCard> = ({ data }) => {
  const teamName1 = useTeamName(data.team);
  return (
    <Link to={`/players/${data.id}`} className={styles.link}>
      <div className={styles.imageWrapper}>
        <img src={data.avatarUrl} className={styles.image} alt={data.name} />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.nameWrapper}>
          <span className={styles.name}>{data.name}</span>
          <span className={styles.number}>#{data.number || "-"}</span>
        </div>
        <p className={styles.team}>{teamName1 || data.team}</p>
      </div>
    </Link>
  );
};
