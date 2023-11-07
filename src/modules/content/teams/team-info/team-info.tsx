import React, { useState } from "react";
import { BreadCrumbs } from "../../../../common/components/exports";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import { TeamData } from "../types";
import { useLoaderData, useNavigate } from "react-router";
import { IconDelete, IconCreate } from "../../../../assests/icons/exports";
import { SmallButton } from "../../../../common/components/exports";
import { removeTeam } from "../../../../api/teams/teams-api";  
import { InfoHeader, InfoWrapper, InfoSection } from "../../components/exports";
import classNames from "classnames";
import styles from "./team-info.module.css";

export const SingleTeam = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const navigate = useNavigate()
  const data =  useLoaderData() as TeamData;

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
      removeTeam(data.id)?.then(() => navigate('/teams',{replace: true}))
    }
  }
    

  return (
    <InfoWrapper>
      <InfoHeader title={data.name}/>
      <InfoSection extraClass={styles.section}>
        <img src={data.imageUrl} className={imageClasses} alt={data.name} />
        <div className={infoBlockClasses}>
          <h1>{data.name}</h1>
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
  );
};
