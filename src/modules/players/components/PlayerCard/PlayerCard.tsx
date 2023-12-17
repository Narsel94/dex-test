import React, { FC } from "react";
import { Link } from "react-router-dom";
import { TPlayerData } from "../../../../api/players/TPlayers";
import { capitalizeFirstLetter } from "../../../../common/helpers/capitalizeFirstLetter";
import classNames from "classnames";
import styles from "./PlayerCard.module.css";
import { useTeamName } from "../../hooks/useTeamName";

type TPlayerCard = {
  data: TPlayerData;
  size?: number
};

export const PlayerCard: FC<TPlayerCard> = ({ data, size }) => {

  const nameClasses = classNames(styles.name, {
    [styles.name_long]: data.name.length >= 15,
    [styles.name_24]: size === 24
  })

  const infoWrapperClasses = classNames(styles.infoWrapper, {
    [styles.infoWrapper_6]: size === 6,
    [styles.infoWrapper_12]: size === 12,
    [styles.infoWrapper_24]: size === 24,
  })

  const teamClasses = classNames(styles.team, {
    [styles.team_24]: size === 24

  })


  const teamName1 = useTeamName(data.team);
  return (
    <Link to={`/players/${data.id}`} className={styles.link}>
      <div className={styles.imageWrapper}>
        <img src={data.avatarUrl} className={styles.image} alt={data.name} />
      </div>
      <div className={infoWrapperClasses}>
        <div className={styles.nameWrapper}>
          <span className={nameClasses}>{capitalizeFirstLetter(data.name)}</span>
          <span className={styles.number}>#{data.number || "-"}</span>
        </div>
        <p className={teamClasses}>{teamName1 && capitalizeFirstLetter(teamName1) || data.team}</p>
      </div>
    </Link>
  );
};
