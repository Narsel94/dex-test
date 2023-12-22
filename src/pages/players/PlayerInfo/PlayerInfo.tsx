import React, { FC } from "react";
import { useNavigate } from "react-router";
import { InfoHeader, Notification } from "../../../common/components";
import { removeImageRequest } from "../../../api/auth/deleteImage";
import { removePlayerRequest } from "../../../api/players/playersRequests";
import { capitalizeFirstLetter } from "../../../common/helpers/capitalizeFirstLetter";
import { useError } from "../../../common/hooks/useError";
import { usePlayerInfo } from "../../../modules/players/hooks/usePlayerInfo";
import styles from "./PlayerInfo.module.css";

export const PlayerInfo: FC = () => {
  const { player, isPlayer } = usePlayerInfo();
  const [isError, setIsError] = useError();
  const navigate = useNavigate();

  const removePlayer = () => {
    if (player) {
      const fileName = player.avatarUrl?.split("/").pop();
      if (fileName) {
        return removeImageRequest(fileName)
          .then(() =>
            removePlayerRequest(player.id)?.then(() => navigate("/players"))
          )
          .catch((error) => {
            setIsError(error);
          });
      }
      return removePlayerRequest(player.id)
        ?.then(() => navigate("/players"))
        .catch((error) => setIsError(error));
    }
  };

  const onUpdateClick = () => {
    player && navigate(`/players/update-player/${player.id}`);
  };

  return (
    <div className={styles.wrapper}>
      {isPlayer && player ? (
        <>
          <InfoHeader
            title={player.name}
            onTrashClick={removePlayer}
            onUpdateClick={onUpdateClick}
          />
          <section className={styles.section}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.image}
                src={player.avatarUrl || ""}
                alt={player.name}
              />
            </div>
            <div className={styles.flex}>
              <div className={styles.nameBlock}>
                <h1 className={styles.name}>{capitalizeFirstLetter(player.name)} </h1>
                <span className={styles.number}>#{player.number}</span>
              </div>
              <div className={styles.dataBlock}>
                <div className={styles.infoBlock}>
                  <h3 className={styles.infoTitle}>Position</h3>
                  <p className={styles.infoSubTitle}>{player.position}</p>
                </div>
                <div className={styles.infoBlock}>
                  <h3 className={styles.infoTitle}>Team</h3>
                  <p className={`${styles.infoSubTitle} ${styles.team}`}>
                    {(player.teamName && capitalizeFirstLetter(player.teamName)) || player.team}
                  </p>
                </div>
                <div className={styles.infoBlock}>
                  <h3 className={styles.infoTitle}>Height</h3>
                  <p className={styles.infoSubTitle}>{`${player.height} cm`}</p>
                </div>
                <div className={styles.infoBlock}>
                  <h3 className={styles.infoTitle}>Weight</h3>
                  <p className={styles.infoSubTitle}>{`${player.weight} kg`}</p>
                </div>
                <div className={styles.infoBlock}>
                  <h3 className={styles.infoTitle}>Age</h3>
                  <p className={styles.infoSubTitle}>{player.age}</p>
                </div>
              </div>
            </div>
          </section>
          <Notification error={isError} />
        </>
      ) : (
        <>
          <InfoHeader />
          <div className={styles.notFounSection}>
            <h1 className={styles.notFoundTitle}>Sorry, player not found!</h1>
          </div>
          <Notification error={isError} />
        </>
      )}
    </div>
  );
};
