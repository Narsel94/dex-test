import React, { ChangeEvent, FC, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { useAppSelector } from "../../../../common/hooks/useAppSelector";
import { teamsSelector } from "../../teams/selectors";
import { useNavigate } from "react-router";
import {
  InfoWrapper,
  InfoHeader,
  InfoSection,
  InfoBlock,
  GridContainer,
} from "../../components/exports";
import { getAge } from "../helpers/get-age";
import styles from "./player-info.module.css";
import { TPlayerData } from "../../../../api/players/types";
import classNames from "classnames";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import { removePlayerRequest } from "../../../../api/players/players-api";

export const PlayerInfo: FC = () => {
  const playerData = useLoaderData() as TPlayerData;


  const isMobile = useMobileMediaQuery();
  const navigate = useNavigate();

  const nameClasses = classNames({
    [styles.name]: !isMobile,
    [styles.nameMob]: isMobile,
  });

  const imageClasses = classNames({
    [styles.image]: !isMobile,
    [styles.imageMobile]: isMobile,
  });
  const age = getAge(playerData.birthday);
  const team = useAppSelector(teamsSelector).find(
    (team) => team.id === playerData?.team
  );

  const removePlayer = () => {
    if (playerData) {
      removePlayerRequest(playerData.id)?.then(() => navigate("/players"));
    }
  };

  const onUpdateClick = () => {
    navigate(`/players/update-player/${playerData.id}`);
  }


  return (
    <InfoWrapper>
      <InfoHeader
        title={playerData.name}
        onTrashClick={removePlayer}
        onUpdateClick={onUpdateClick}
      />
      <InfoSection extraClass={styles.section}>
        <img
          className={imageClasses}
          src={playerData.avatarUrl}
          alt={playerData.name}
        />
        <div className={styles.flex}>
          <h1 className={nameClasses}>
            {playerData.name}{" "}
            <span className={styles.number}>#{playerData.number}</span>
          </h1>
          <GridContainer>
            <InfoBlock title="Position" subtitle={playerData.position} />
            <InfoBlock
              title="Team"
              subtitle={team?.name || playerData.team}
            ></InfoBlock>
            <InfoBlock
              title="Height"
              subtitle={`${playerData.height} cm`}
            ></InfoBlock>
            <InfoBlock title="Weight" subtitle={`${playerData.weight} kg`} />
            <InfoBlock title="Age" subtitle={age} />
          </GridContainer>
        </div>
      </InfoSection>
    </InfoWrapper>
  );
};
