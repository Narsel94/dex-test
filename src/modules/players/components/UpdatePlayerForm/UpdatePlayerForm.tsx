import React, { FC } from "react";
import {
  ControledInput,
  Button,
  StyledSelect,
  FileInput,
  ContentForm
} from "../../../../common/components";
import { useNavigate, useParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { TPlayerData } from "../../../../api/players/types";
import { usePositions, useTeamOptions } from "..";
import { TUpdatePlayerForm } from "../../types";
import { updatePlayerRequest } from "../../../../api/players/players-api";
import { saveImageRequest } from "../../../../api/auth/save-image";
import styles from "./UpdatePlayerForm.module.css";

const base = process.env.REACT_APP_IMAGES;

type TPlayerForm = {
  data?: TPlayerData;
};

export const UpdatePlayerForm: FC<TPlayerForm> = ({ data }) => {
  const { playerId } = useParams();
  const navigate = useNavigate();

  const { reset, control, handleSubmit, setValue, formState } =
    useForm<TUpdatePlayerForm>({
      mode: "onBlur",
    });
  const { errors, isValid } = formState;
  const onSubmit = (form: TUpdatePlayerForm) => {
    if (!form.avatarUrl) {
      const preparedData = {
        id: Number(playerId),
        name: form.name,
        number: form.number,
        position: form.position?.value,
        team: form.team?.value,
        birthday: form.birthday ? new Date(form?.birthday).toISOString() : "",
        height: form.height,
        weight: form.weight,
        avatarUrl: data?.avatarUrl,
      };
      return updatePlayerRequest(preparedData)?.then(() =>
        navigate("/players")
      );
    }
    const formData = new FormData();
    formData.append(`file`, form.avatarUrl);
    saveImageRequest(formData)?.then((res) => {
      const preparedData = {
        id: Number(playerId),
        name: form.name,
        number: form.number,
        position: form.position?.value,
        team: form.team?.value,
        birthday: form.birthday ? new Date(form?.birthday).toISOString() : "",
        height: form.height,
        weight: form.weight,
        avatarUrl: `${base}${res}`,
      };
      updatePlayerRequest(preparedData)?.then(() => navigate("/players"));
    });
  };
  const teamsOpt = useTeamOptions();

  let formattedDate;
  if (data) {
    const originalDate = new Date(data?.birthday);
    formattedDate = originalDate.toISOString().split("T")[0];
  }

  const { positions } = usePositions();


  return (
    <ContentForm
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="avatarUrl"
        render={({ field: { onBlur, onChange } }) => (
          <FileInput
            onBlurProp={onBlur}
            onFileSelect={onChange}
            defaultImageUrl={data?.avatarUrl}
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
            <StyledSelect
              {...field}
              options={positions}
              error={errors.position?.message}
            />
          )}
        />
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
    </ContentForm>
  );
};
