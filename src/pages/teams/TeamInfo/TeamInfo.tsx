import { useNavigate } from "react-router";
import { useTeamInfo } from "./useTeamInfo";
import { removeTeam } from "../../../api/teams/teamsRequests";
import { InfoHeader } from "../../../common/components";
import { Roster } from "../../../modules/teams/components";
import { removeImageRequest } from "../../../api/auth/deleteImage";
import { Notification } from "../../../common/components";
import { useError } from "../../../common/hooks/useError";
import styles from "./TeamInfo.module.css";

const base = process.env.REACT_APP_IMAGES;

export const TeamInfo = () => {
  const navigate = useNavigate();
  const { data, isTeam } = useTeamInfo();
  const [isError, setIsError] = useError();

  const onDelete = () => {
    if (data) {
      if (data?.players && data.players.length > 0) {
        setIsError("Нельзя удалить пока в команде есть игроки");
        return;
      }
      return removeTeam(data.id)
        ?.then(() => {
          const fileName = data.imageUrl?.split("/").pop();
          if (fileName && base && data.imageUrl?.includes(base)) {
            return removeImageRequest(fileName);
          }
        })
        .then(() => navigate("/teams", { replace: true }))
        .catch((error) => setIsError(error));
    }
  };

  const onChangeClick = () => {
    data && navigate(`/teams/update-team/${data.id}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.teamInfo}>
        {isTeam && data !== null ? (
          <>
            <InfoHeader
              title={data.name}
              onTrashClick={onDelete}
              onUpdateClick={onChangeClick}
            />
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
                    <p className={styles.infoSubTitle}>
                      {data.division || "-"}
                    </p>
                  </div>
                  <div className={styles.infoBlock}>
                    <h3 className={styles.infoTitle}>Conference</h3>
                    <p className={styles.infoSubTitle}>
                      {data.conference || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <InfoHeader />
            <section className={styles.section}>
              <h1 className={styles.notFoundTitle}>Sorry, team not found!</h1>
            </section>
          </>
        )}
        <Notification error={isError} />
      </div>
      {data !== null && data.players.length > 0 && (
        <Roster players={data.players} />
      )}
    </div>
  );
};
