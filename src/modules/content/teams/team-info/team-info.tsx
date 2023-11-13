import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import { useLoaderData, useNavigate } from "react-router";
import { TTeamData } from "../../../../api/teams/types";
import { removeTeam } from "../../../../api/teams/teams-api";
import { InfoHeader, InfoWrapper, InfoSection } from "../../components/exports";
import { InfoBlock } from "../../components/exports";
import { Roster } from "../exports";
import classNames from "classnames";
import styles from "./team-info.module.css";

export const TeamInfo = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as TTeamData;
  const isMobile = useMobileMediaQuery();
  const imageClasses = classNames(styles.imageUrl, {
    [styles.imageUrlDesc]: !isMobile,
    [styles.imageUrlMob]: isMobile,
  });

  const infoBlockClasses = classNames(styles.infoBlock, {
    [styles.infoBlockDesc]: !isMobile,
    [styles.infoBlockMob]: isMobile,
  });

  const containerClasses = classNames({
    [styles.grid]: !isMobile,
    [styles.flex]: isMobile,
  });

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
        <InfoWrapper>
          <InfoHeader />
          <InfoSection extraClass={styles.section}>
            <h1 className={styles.notFoundTitle}>Sorry, team not found!</h1>
          </InfoSection>
        </InfoWrapper>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <InfoWrapper>
        <InfoHeader
          title={data.name}
          onTrashClick={onDelete}
          onUpdateClick={onChangeClick}
        />
        <InfoSection>
          <div className={styles.imageWrapper}>
            <img src={data.imageUrl} className={imageClasses} alt={data.name} />
          </div>
          <div className={infoBlockClasses}>
            <h1 className={styles.title}>{data.name}</h1>
            <div className={containerClasses}>
              <InfoBlock
                title="Year of foundation"
                subtitle={data.foundationYear}
              />
              <InfoBlock title="Division" subtitle={data.division} />
              <InfoBlock title="Conference" subtitle={data.conference} />
            </div>
          </div>
        </InfoSection>
      </InfoWrapper>
      <Roster id={data.id} />
    </div>
  );
};
