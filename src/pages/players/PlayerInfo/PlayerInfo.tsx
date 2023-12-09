import React, { FC } from "react";
import { useLoaderData } from "react-router";
import { useNavigate } from "react-router";
import { InfoHeader, Notification } from "../../../common/components";
import { getAge } from "../../../modules/players/helpers/getAge";
import { TPlayerData } from "../../../api/players/TPlayers";
import { removeImageRequest } from "../../../api/auth/deleteImage";
import { removePlayerRequest } from "../../../api/players/playersRequests";
import { useTeamName } from "../../../modules/players/hooks/useTeamName";
import { useError } from "../../../common/hooks/useError";
import styles from "./PlayerInfo.module.css";

export const PlayerInfo: FC = () => {
  const [isError, setIsError] = useError();
  const playerData = useLoaderData() as TPlayerData;
  const teamName = useTeamName(playerData.team);
  const navigate = useNavigate();
  const age = getAge(playerData.birthday);

  const removePlayer = () => {
    if (playerData) {
      const fileName = playerData.avatarUrl?.split("/").pop();
      if (fileName) {
        return removeImageRequest(fileName)
          .then(() =>
            removePlayerRequest(playerData.id)?.then(() => navigate("/players"))
          )
          .catch((error) => {
            setIsError(error);
          });
      }
      return removePlayerRequest(playerData.id)
        ?.then(() => navigate("/players"))
        .catch((error) => setIsError(error));
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
        <Notification error={isError} />
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
          <div className={styles.nameBlock}>
            <h1 className={styles.name}>{playerData.name} </h1>
            <span className={styles.number}>#{playerData.number}</span>
          </div>
          <div className={styles.dataBlock}>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Position</h3>
              <p className={styles.infoSubTitle}>{playerData.position}</p>
            </div>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Team</h3>
              <p className={`${styles.infoSubTitle} ${styles.team}`}>
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
      <Notification error={isError} />
    </div>
  );
};
