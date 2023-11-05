import React, { useState } from "react";
import { BreadCrumbs } from "../../../../common/components/exports";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import { TeamData } from "../types";
import { useLoaderData, useNavigate } from "react-router";
import { IconDelete, IconCreate } from "../../../../assests/icons/exports";
import { SmallButton } from "../../../../common/components/exports";
import { removeTeam } from "../../../../api/teams/teams-api";  
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

  const headerClasses = classNames(styles.header, {
    [styles.headerMob]: isMobile,
  });

  const sectionClasses = classNames(styles.section, {
    [styles.sectionDesc]: !isMobile,
    [styles.sectionMob]: isMobile,
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
    <div className={styles.wrapper}>
      <div className={headerClasses}>
        <BreadCrumbs title={data.name} />
        <div className={headerClasses}>
          <SmallButton onClick={onClick}>
            <IconCreate size={16} type="primary" />
          </SmallButton>
          <SmallButton onClick={onDelete}>
            <IconDelete size={16} type="secondary" />
          </SmallButton>
        </div>
      </div>
      <div className={sectionClasses}>
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
      </div>
    </div>
  );
};
