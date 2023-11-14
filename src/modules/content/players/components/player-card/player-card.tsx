import React, { FC } from "react";
import { useMobileMediaQuery } from "../../../../../common/hooks/useMobileMediaQuery";
import { Link } from "react-router-dom";
import { TPlayerData } from "../../../../../api/players/types";
import classNames from "classnames";
import styles from "./player-card.module.css";
import { useTeamName } from "../../hooks/use-teams-options/use-teams-options";

type TPlayerCard = {
  data: TPlayerData;
};

export const PlayerCard: FC<TPlayerCard> = ({ data }) => {
  const isMobile = useMobileMediaQuery();
  const teamName1 = useTeamName(data.team)
  const nameClasses = classNames(styles.name, {
    [styles.nameDesc]: !isMobile,
    [styles.nameMob]: isMobile,
  });

  return (
    <Link to={`/players/${data.id}`} className={styles.link}>
      <div className={styles.imageWrapper}>
        <img src={data.avatarUrl} className={styles.image} alt={data.name} />
      </div>
      <div className={styles.infoWrapper}>
        <h3 className={nameClasses}>
          {data.name} <span className={styles.number}>#{data.number || "-"}</span>
        </h3>
        <p className={styles.team}>{teamName1 || data.team}</p>
      </div>
    </Link>
  );
};
