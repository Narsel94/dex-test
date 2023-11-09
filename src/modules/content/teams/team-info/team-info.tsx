import React, { useState } from "react";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import { TeamData } from "../types";
import { useLoaderData, useNavigate } from "react-router";
import { removeTeam } from "../../../../api/teams/teams-api";
import { InfoHeader, InfoWrapper, InfoSection } from "../../components/exports";
import { Roster } from "../exports";
import classNames from "classnames";
import styles from "./team-info.module.css";

export const SingleTeam = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const navigate = useNavigate();
  const data = useLoaderData() as TeamData;

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

  const dataClasses = classNames({
    [styles.dataBlockDesc]: !isMobile,
    [styles.dataBlockMob]: isMobile,
  });

  const onClick = () => {
    setDisabled(!disabled);
  };

  const onDelete = () => {
    if (data) {
      removeTeam(data.id)?.then(() => navigate("/teams", { replace: true }));
    }
  };

  return (
    <div className={styles.wrapper}>
      <InfoWrapper>
        <InfoHeader title={data.name} onTrashClick={onDelete} />
        <InfoSection extraClass={styles.section}>
          <div className={styles.imageWrapper}>
            <img src={data.imageUrl} className={imageClasses} alt={data.name} />
          </div>
          <div className={infoBlockClasses}>
            <h1 className={styles.title}>{data.name}</h1>
            <div className={containerClasses}>
              <div className={dataClasses}>
                <h3>Year of foundation</h3>
                <p>{data.foundationYear}</p>
              </div>
              <div className={dataClasses}>
                <h3>Division</h3>
                <p>{data.division}</p>
              </div>
              <div className={dataClasses}>
                <h3>Conference</h3>
                <p>{data.conference}</p>
              </div>
            </div>
          </div>
        </InfoSection>
      </InfoWrapper>
      <Roster id={data.id} />
    </div>
  );
};
