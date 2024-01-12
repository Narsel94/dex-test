import React, { FC, useEffect } from "react";
import { usePositions } from "../../hooks/usePositions";
import { useTeamOptions } from "../../hooks/useTeamOptions";
import { useNavigate } from "react-router";
import { TAddNewPlayerForm } from "../../types";
import { Controller, useForm } from "react-hook-form";
import { addPlayerRequest } from "../../../../api/players/playersRequests";
import {
  Button,
  ControledInput,
  FileInput,
  StyledSelect,
  Notification,
} from "../../../../common/components";
import styles from "./AddPlayerForm.module.css";
import { useError } from "../../../../common/hooks/useError";

export const AddPlayerForm: FC = () => {
  const [isError, setisError] = useError();
  const { positions } = usePositions();

  const teamsOptions = useTeamOptions();
  const navigate = useNavigate();

  const {
    reset,
    control,
    handleSubmit,
    formState,
  } = useForm<TAddNewPlayerForm>({ mode: "all" });

  const { isValid, errors } = formState;

  const onSub = (data: TAddNewPlayerForm) => {
    addPlayerRequest(data)
      .then(() => navigate("/players"))
      .catch((error) => {
        setisError(error);
      });
  };

  return (
    <form
      className={styles.form}
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSub)}
    >
      <Controller
        control={control}
        name="avatarUrl"
        rules={{
          required: "Required",
          validate: (file) => {
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
            return allowedTypes.includes(file.type)
              ? true
              : "Invalid file type";
          },
        }}
        render={({ field: { onChange, onBlur } }) => (
          <FileInput
            onBlurProp={onBlur}
            onFileSelect={onChange}
            error={errors.avatarUrl?.message}
          />
        )}
      />
      <div className={styles.fieldsContainer}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: "Required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
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
          rules={{
            required: "Required",
          }}
          render={({ field }) => (
            <StyledSelect
              {...field}
              label="Position"
              options={positions}
              error={errors.position?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="team"
          rules={{
            required: "Required",
          }}
          render={({ field }) => (
            <StyledSelect
              {...field}
              label="Team"
              error={errors.team?.message}
              options={teamsOptions}
            />
          )}
        />

        <div className={styles.gridContainer}>
          <Controller
            control={control}
            name="height"
            rules={{
              required: "Required",
              validate: (value) =>
                value < 140 || value > 250 ? "Imposible height!" : true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
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
              required: "Required",
              validate: (value) =>
                value < 45 || value > 200 ? "Imposible weight!" : true,
            }}
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
          <Button htmlType="reset" onClick={reset}>
            Cancel
          </Button>
          <Button htmlType="submit" disabled={!isValid} isPrime>
            Save
          </Button>
        </div>
      </div>
      <Notification error={isError} />
    </form>
  );
};
