import React, { FC } from "react";
import {
  ControledInput,
  Button,
  StyledSelect,
  UrlInput,
  InvalidMessage,
} from "../../../../common/components/exports";
import { useNavigate, useParams } from "react-router";

import { AddFormContainer, ErrorBlock } from "../../components/exports";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import { useForm, Controller } from "react-hook-form";
import { TPlayerData } from "../../../../api/players/types";
import { usePositions } from "../components/exports";
import { useTeamOptions1 } from "../hooks/use-teams-options/use-teams-options";

import { TUpdatePlayerForm } from "../types";
import { updatePlayerRequest } from "../../../../api/players/players-api";
import classNames from "classnames";
import styles from "./update-player-form.module.css";

type TPlayerForm = {
  data?: TPlayerData;
};

export const PlayerForm: FC<TPlayerForm> = ({ data }) => {
  const isMobile = useMobileMediaQuery();
  const { playerId } = useParams();
  const navigate = useNavigate();

  const { reset, control, handleSubmit, setValue, formState } =
    useForm<TUpdatePlayerForm>({
      mode: "onBlur",
    });
  const { errors, isValid } = formState;
  const onSubmit = (FormData: TUpdatePlayerForm) => {
    const preparedData = {
      id: Number(playerId),
      name: FormData.name,
      number: FormData.number,
      position: FormData.position?.value,
      team: FormData.team?.value,
      birthday: FormData.birthday
        ? new Date(FormData?.birthday).toISOString()
        : "",
      height: FormData.height,
      weight: FormData.weight,
      avatarUrl: FormData.avatarUrl,
    };
    updatePlayerRequest(preparedData)?.then(() => navigate("/players"));
  };

  const teamsOpt = useTeamOptions1();

  let formattedDate;
  if (data) {
    const originalDate = new Date(data?.birthday);
    formattedDate = originalDate.toISOString().split("T")[0];
  }

  const { positions } = usePositions();
  const formClasses = classNames(styles.form, {
    [styles.formMobile]: isMobile,
  });

  return (
    <AddFormContainer
      className={formClasses}
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        defaultValue={data?.avatarUrl}
        name="avatarUrl"
        render={({ field: { onBlur, value, onChange, ref } }) => (
          <UrlInput
            setValue={setValue}
            onDrop={onChange}
            onChange={onChange}
            onBlur={onBlur}
            name="avatarUrl"
            value={value}
          />
        )}
      />
      <div className={styles.fieldsContainer}>
        <Controller
          control={control}
          defaultValue={data?.name}
          name="name"
          rules={{
            required: "Required",
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ControledInput
              title="Name"
              propValue={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="team"
          render={({ field }) => <StyledSelect {...field} options={teamsOpt} />}
        />
        <Controller
          control={control}
          name="position"
          rules={{
            required: "Required",
          }}
          render={({ field }) => (
            <StyledSelect {...field} options={positions} />
          )}
        />
        {errors.position?.message && (
          <InvalidMessage message={errors.position?.message} />
        )}
        <div className={styles.gridContainer}>
          <Controller
            control={control}
            defaultValue={data?.height}
            name="height"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <ControledInput
                title="Height (cm)"
                type="number"
                propValue={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            control={control}
            name="weight"
            defaultValue={data?.weight}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <ControledInput
                propValue={value}
                onChange={onChange}
                onBlur={onBlur}
                type="number"
                title="Weight (kg)"
              />
            )}
          />
          <Controller
            control={control}
            defaultValue={formattedDate}
            name="birthday"
            rules={{
              required: "Required",
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <ControledInput
                type="date"
                propValue={value}
                onChange={onChange}
                onBlur={onBlur}
                title="Birthday"
              />
            )}
          />
          <Controller
            control={control}
            defaultValue={data?.number}
            name="number"
            rules={{
              required: "Required",
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <ControledInput
                type="number"
                propValue={value}
                onChange={onChange}
                onBlur={onBlur}
                title="Number"
              />
            )}
          />
          <Button htmlType="reset" onClick={() => reset()}>
            Cancel
          </Button>
          <Button htmlType="submit" isPrime disabled={!isValid}>
            Save
          </Button>
        </div>
      </div>
    </AddFormContainer>
  );
};
