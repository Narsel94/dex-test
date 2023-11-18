import React, { FC } from "react";
import { useLoaderData } from "react-router";
import { useNavigate } from "react-router";
import { InfoHeader } from "../../../common/components";
import { getAge } from "../../../modules/players/helpers/getAge";
import styles from "./PlayerInfo.module.css";
import { TPlayerData } from "../../../api/players/TPlayers";
import { removePlayerRequest } from "../../../api/players/playersRequests";
import { useTeamName } from "../../../modules/players/hooks/useTeamName";

export const PlayerInfo: FC = () => {
  const playerData = useLoaderData() as TPlayerData;
  const teamName = useTeamName(playerData.team);
  const navigate = useNavigate();
  const age = getAge(playerData.birthday);

  const removePlayer = () => {
    if (playerData) {
      removePlayerRequest(playerData.id)?.then(() => navigate("/players"));
    }
  };

  const onUpdateClick = () => {
    navigate(`/players/update-player/${playerData.id}`);
  };

  if (typeof playerData === "boolean") {
    return (
      <div className={styles.wrapper}>
        <InfoHeader />
        <div className={styles.notFounSection}>
          <h1 className={styles.notFoundTitle}>Sorry, player not found!</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <InfoHeader
        title={playerData.name}
        onTrashClick={removePlayer}
        onUpdateClick={onUpdateClick}
      />

      <section className={styles.section}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={playerData.avatarUrl}
            alt={playerData.name}
          />
        </div>

        <div className={styles.flex}>
          <h1 className={styles.name}>
            {playerData.name}{" "}
            <span className={styles.number}>#{playerData.number}</span>
          </h1>
          <div className={styles.dataBlock}>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Position</h3>
              <p className={styles.infoSubTitle}>{playerData.position}</p>
            </div>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Team</h3>
              <p className={styles.infoSubTitle}>
                {teamName || playerData.team}
              </p>
            </div>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Height</h3>
              <p className={styles.infoSubTitle}>{`${playerData.height} cm`}</p>
            </div>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Weight</h3>
              <p className={styles.infoSubTitle}>{`${playerData.weight} kg`}</p>
            </div>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Age</h3>
              <p className={styles.infoSubTitle}>{age}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
