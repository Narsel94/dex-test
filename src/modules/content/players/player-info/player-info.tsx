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
import { InfoInput } from "../../../../common/components/exports";
import { useForm, Controller } from "react-hook-form";

export const PlayerInfo: FC = () => {
  const playerData = useLoaderData() as TPlayerData;

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [val, setVal] = useState<number>(playerData.height);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.valueAsNumber);
  };

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
    setIsDisabled(!isDisabled);
  };

  const { control, handleSubmit, formState, reset, register } = useForm({
    mode: "onBlur",
  });

  const {} = register;

  const onSub = (data: any) => {
    console.log(data);
  };

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

          <form className={styles.form} onSubmit={handleSubmit(onSub)}>
            <GridContainer>
              <InfoBlock title="Position">
                <InfoInput value={playerData.position} disabled={isDisabled} />
              </InfoBlock>

              <InfoBlock title="Team">
                <InfoInput
                  {...register("team")}
                  value={team?.name || playerData.team}
                  disabled={isDisabled}
                />
              </InfoBlock>
              <InfoBlock title="Height">
                <Controller
                  name="height"
                  defaultValue={playerData.height}
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <InfoInput
                      value={value}
                      onBlur={onBlur}
                      type="number"
                      onChange={onChange}
                      title="cm"
                      disabled={isDisabled}
                    />
                  )}
                />
              </InfoBlock>
              <InfoBlock title="Weight">
                <InfoInput
                  value={playerData.weight}
                  type="number"
                  // onChange={onChange}
                  title="kg"
                  disabled={isDisabled}
                />
              </InfoBlock>
              <InfoBlock title="Age">
                <InfoInput
                  value={age}
                  type="number"
                  // onChange={onChange}
                  disabled={isDisabled}
                />
              </InfoBlock>
            </GridContainer>
            <button type="submit">Click</button>
          </form>
        </div>
      </InfoSection>
    </InfoWrapper>
  );
};
