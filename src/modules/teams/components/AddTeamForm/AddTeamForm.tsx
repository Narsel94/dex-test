import React, { FC, useEffect } from "react";
import {
  ControledInput,
  Button,
  FileInput,
  Notification,
} from "../../../../common/components";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { TAddTeamForm } from "../../../../api/teams/TTeams";
import { postTeamRequest } from "../../../../api/teams/teamsRequests";
import styles from "./AddTeamForm.module.css";
import { useError } from "../../../../common/hooks/useError";

export const AddTeamForm: FC = () => {
  const [isError, setisError] = useError();

  const { control, handleSubmit, formState, reset } = useForm<TAddTeamForm>({
    mode: "all",
  });
  const { isValid, errors } = formState;
  const navigate = useNavigate();

  const onSubmit = (data: TAddTeamForm) => {
    postTeamRequest(data)
      .then(() => navigate("/teams"))
      .catch((error) => {
        setisError(error);
      });
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <Controller
        control={control}
        rules={{
          required: "Required",
          validate: (file) => {
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
            return allowedTypes.includes(file.type)
              ? true
              : "Invalid file type";
          },
        }}
        name="imageUrl"
        render={({ field: { onChange, onBlur } }) => (
          <FileInput
            onBlurProp={onBlur}
            onFileSelect={onChange}
            error={errors.imageUrl?.message}
          />
        )}
      />
      <div className={styles.fieldsContainer}>
        <Controller
          control={control}
          rules={{
            required: "Required",
          }}
          name="name"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ControledInput
              title="Name"
              onChange={onChange}
              onBlur={onBlur}
              propValue={value}
              error={errors?.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="division"
          rules={{
            required: "Required",
          }}
          render={({ field: { onChange, onBlur, ref, value } }) => (
            <ControledInput
              title="Division"
              onChange={onChange}
              onBlur={onBlur}
              propValue={value}
              error={errors?.division?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="conference"
          rules={{
            required: "Required",
          }}
          render={({ field: { onChange, onBlur, ref, value } }) => (
            <ControledInput
              title="Conference"
              onChange={onChange}
              onBlur={onBlur}
              propValue={value}
              error={errors?.conference?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="foundationYear"
          rules={{
            required: "Required",
            validate: (value) =>
              value && value > new Date().getFullYear()
                ? "The date can't be in the future."
                : value && value < 1891
                ? "Imposible year"
                : true,
          }}
          render={({ field: { onChange, onBlur, ref, value } }) => (
            <ControledInput
              title="Year of foundation"
              type="number"
              propValue={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors?.foundationYear?.message}
            />
          )}
        />
        <div className={styles.gridContainer}>
          <Button htmlType="reset" onClick={() => reset()}>
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
