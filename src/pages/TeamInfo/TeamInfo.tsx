import { useLoaderData, useNavigate } from "react-router";
import { TTeamData } from "../../api/teams/types";
import { removeTeam } from "../../api/teams/teams-api";
import { InfoHeader } from "../../common/components";
import { Roster } from "../../modules/teams/components";
import styles from "./TeamInfo.module.css";

export const TeamInfo = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as TTeamData;

  const onDelete = () => {
    if (data) {
      removeTeam(data.id)?.then(() => navigate("/teams", { replace: true }));
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
      <Roster id={data.id} />
    </div>
  );
};
