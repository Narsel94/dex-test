import { FC } from "react";
import { RosterElement } from "../RosterElement/RosterElement";
import { TPlayerOfTeam } from "../../../../api/players/TPlayers";
import styles from "./Roster.module.css";

type TRoster = {
  players: TPlayerOfTeam[];
};

export const Roster: FC<TRoster> = ({ players }) => {
  if (players.length > 0) {
    return (
      <div className={styles.roster}>
        <h1 className={styles.title}>Roster</h1>
        <div className={styles.header}>
          <span className={styles.number}>#</span>
          <span className={styles.player}>Player</span>
          <div className={styles.info}>
            <span className={styles.span}>Height</span>
            <span className={styles.span}>Weight</span>
            <span className={styles.span}>Age</span>
          </div>
        </div>
        {players.map((player) => (
          <RosterElement key={player.id} player={player}></RosterElement>
        ))}
      </div>
    );
  }

  return null;
};
