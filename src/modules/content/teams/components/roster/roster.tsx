import React, { FC } from "react";
import { useAppSelector } from "../../../../../common/hooks/useAppSelector";
import { allPlayersSelector } from "../../../players/selectors";
import { RosterElement } from "../roster-element/roster-element";
import styles from "./roster.module.css";
import { usePlayersOfTeam } from "../../../../../api/players/players-api";
import { useMobileMediaQuery } from "../../../../../common/hooks/useMobileMediaQuery";

type TRoster = {
  id: number;
};

export const Roster: FC<TRoster> = ({ id }) => {
  const players = usePlayersOfTeam(id);
  const isMobile = useMobileMediaQuery();

  if (players.length > 0) {
    return (
      <div className={styles.roster}>
        <h1 className={styles.title}>Roster</h1>
        <div className={styles.header}>
          <span className={styles.number}>#</span>
          <span className={styles.player}>Player</span>
          {!isMobile && (
            <div className={styles.info}>
              <span className={styles.span}>Height</span>
              <span className={styles.span}>Weight</span>
              <span className={styles.span}>Age</span>
            </div>
           )} 
        </div>
        {players.length > 0 &&
          players.map((player) => (
            <RosterElement key={player.id} player={player}></RosterElement>
          ))}
      </div>
    );
  }

  return null;
};
