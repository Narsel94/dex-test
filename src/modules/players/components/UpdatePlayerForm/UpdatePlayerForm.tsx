import React, { FC, useState } from "react";
import {
  ControledInput,
  Button,
  StyledSelect,
  FileInput,
  StyledContentForm,
  Notification,
} from "../../../../common/components";
import { useNavigate, useParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { TPlayerData } from "../../../../api/players/TPlayers";
import { usePositions, useTeamOptions } from "..";
import { TUpdatePlayerForm } from "../../types";
import { updatePlayerRequest } from "../../../../api/players/playersRequests";
import styles from "./UpdatePlayerForm.module.css";
import { useError } from "../../../../common/hooks/useError";

type TPlayerForm = {
  data?: TPlayerData;
};

export const UpdatePlayerForm: FC<TPlayerForm> = ({ data }) => {
  const [isError, setisError] = useError();
  const { playerId } = useParams();
  const navigate = useNavigate();

  const { reset, control, handleSubmit, formState } =
    useForm<TUpdatePlayerForm>({
      mode: "onBlur",
    });
  const { errors, isValid } = formState;

  const onSubmit = (form: TUpdatePlayerForm) => {
    const requestData = {
      ...form,
      name: form?.name,
      id: Number(playerId),
      birthday: form.birthday ? new Date(form?.birthday).toISOString() : "",
      position: form.position?.value || data?.position,
      team: form.team?.value || data?.team,
      avatarUrl: form.avatarUrl || data?.avatarUrl,
    };
    return updatePlayerRequest(requestData)
      ?.then(() => navigate("/players"))
      .catch((error) => {
        setisError(error);
      });
  };

  const teamsOpt = useTeamOptions();

  let formattedDate: string | undefined;
  if (data) {
    const originalDate = new Date(data?.birthday);
    formattedDate = originalDate.toISOString().split("T")[0];
  }

  const { positions } = usePositions();

  return (
    <StyledContentForm
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="avatarUrl"
        rules={{
          validate: (file) => {
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
            if (file) {
              return allowedTypes.includes(file.type)
                ? true
                : "Invalid file type";
            }
          },
        }}
        render={({ field: { onBlur, onChange } }) => (
          <FileInput
            onBlurProp={onBlur}
            onFileSelect={onChange}
            defaultImageUrl={data?.avatarUrl}
            error={errors?.avatarUrl?.message}
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
          name="position"
          defaultValue={positions.find((pos) => pos.label === data?.position)}
          render={({ field: { value, onChange, onBlur } }) => (
            <StyledSelect
              label="Position"
              value={
                value || positions.find((pos) => pos.label === data?.position)
              }
              onBlur={onBlur}
              onChange={onChange}
              options={positions}
              error={errors.position?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="team"
          defaultValue={teamsOpt.find((team) => team.value === data?.team)}
          render={({ field: { value, onChange, onBlur } }) => (
            <StyledSelect
              label="Team"
              onBlur={onBlur}
              onChange={onChange}
              value={
                value || teamsOpt.find((team) => team.value === data?.team)
              }
              options={teamsOpt}
            />
          )}
        />
        <div className={styles.gridContainer}>
          <Controller
            control={control}
            defaultValue={data?.height}
            name="height"
            rules={{
              validate: (value) =>
                value < 140 || value > 250 ? "Imposible height!" : true,
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <ControledInput
                title="Height (cm)"
                type="number"
                propValue={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors.height?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="weight"
            rules={{
              validate: (value) =>
                value < 45 || value > 200 ? "Imposible weight!" : true,
            }}
            defaultValue={data?.weight}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <ControledInput
                propValue={value}
                onChange={onChange}
                onBlur={onBlur}
                type="number"
                title="Weight (kg)"
                error={errors.weight?.message}
              />
            )}
          />
          <Controller
            control={control}
            defaultValue={formattedDate}
            name="birthday"
            rules={{
              required: "Required",
              validate: (value) => {
                const currentDate = new Date();
                const selectedDateObj = new Date(value);
                if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                  return "Wrong date format";
                } else if (
                  selectedDateObj.getFullYear() > currentDate.getFullYear()
                ) {
                  return "The date can't be in the future.";
                } else if (selectedDateObj.getFullYear() < 1900) {
                  return "It's inposible!";
                } else if (
                  selectedDateObj.getFullYear() <
                  currentDate.getFullYear() - 55
                ) {
                  return "Must be younger";
                } else if (
                  selectedDateObj.getFullYear() >
                  currentDate.getFullYear() - 10
                ) {
                  return "Must be older";
                } else {
                  return true;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <ControledInput
                type="date"
                propValue={value}
                onChange={onChange}
                onBlur={onBlur}
                title="Birthday"
                error={errors.birthday?.message}
              />
            )}
          />
          <Controller
            control={control}
            defaultValue={data?.number}
            name="number"
            rules={{
              required: "Required",
              validate: (value) =>
                value < 1 || value > 1000 || value % 1 !== 0
                  ? "Imposible number!"
                  : true,
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <ControledInput
                type="number"
                propValue={value}
                onChange={onChange}
                onBlur={onBlur}
                title="Number"
                error={errors.number?.message}
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
      <Notification error={isError} />
    </StyledContentForm>
  );
};
