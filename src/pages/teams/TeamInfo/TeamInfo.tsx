import { useLoaderData, useNavigate } from "react-router";
import { TTeamData } from "../../../api/teams/TTeams";
import { removeTeam } from "../../../api/teams/teamsRequests";
import { InfoHeader } from "../../../common/components";
import { Roster } from "../../../modules/teams/components";
import styles from "./TeamInfo.module.css";
import { removeImageRequest } from "../../../api/auth/deleteImage";
import { usePlayersOfTeam } from "../../../modules/teams/hooks/usePlayersOfTeam";
import { useState } from "react";
const base = process.env.REACT_APP_IMAGES;

export const TeamInfo = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as TTeamData;
  const players = usePlayersOfTeam(data.id);
  const [isError, setIsError] = useState<boolean>(false);

  const onDelete = () => {
    if (players && players.length > 0) {
      console.error("Нельзя удалить пока в команде есть игроки");
      setIsError(true);

      return;
    }
    if (data) {
      const fileName = data.imageUrl?.split("/").pop();
      if (fileName && base && data.imageUrl?.includes(base)) {
        return removeImageRequest(fileName)
          .catch((error) => {
            console.log(error);
          })
          .finally(() => removeTeam(data.id)?.then(() => navigate("/teams")));
      }
      return removeTeam(data.id)?.then(() =>
        navigate("/teams", { replace: true })
      );
    }
  };

  const onChangeClick = () => {
    navigate(`/teams/update-team/${data.id}`);
  };

  if (typeof data === "boolean") {
    return (
      <div className={styles.wrapper}>
        <div className={styles.teamInfo}>
          <InfoHeader />
          <section className={styles.section}>
            <h1 className={styles.notFoundTitle}>Sorry, team not found!</h1>
          </section>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.teamInfo}>
        <InfoHeader
          title={data.name}
          onTrashClick={onDelete}
          onUpdateClick={onChangeClick}
        />
        {isError && (
          <div
            onClick={() => setIsError(false)}
            className={styles.errorMessage}
          >
            <p>Нельзя удалить пока в команде есть игроки</p>
            <p>Нажмите на окно, чтобы закрыть...</p>
          </div>
        )}

        <section className={styles.section}>
          <img
            src={data.imageUrl}
            className={styles.imageUrl}
            alt={data.name}
          />
          <div className={styles.dataWrapper}>
            <h1 className={styles.title}>{data.name}</h1>
            <div className={styles.dataBlock}>
              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Year of foundation</h3>
                <p className={styles.infoSubTitle}>{data.foundationYear}</p>
              </div>
              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Division</h3>
                <p className={styles.infoSubTitle}>{data.division}</p>
              </div>
              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Conference</h3>
                <p className={styles.infoSubTitle}>{data.conference}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {players.length > 0 && <Roster players={players} />}
    </div>
  );
};
