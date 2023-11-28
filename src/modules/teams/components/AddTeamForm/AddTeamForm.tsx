import React, { FC, useState } from "react";
import {
  ControledInput,
  Button,
  GridContainer,
  FileInput,
  StyledContentForm,
  Notification,
} from "../../../../common/components";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { TAddTeamForm } from "../../../../api/teams/TTeams";
import { postTeamRequest } from "../../../../api/teams/teamsRequests";
import styles from "./AddTeamForm.module.css";

export const AddTeamForm: FC = () => {
  const [isError, setisError] = useState<unknown | undefined>(undefined);

  const { control, handleSubmit, formState, reset } = useForm<TAddTeamForm>({
    mode: "onChange",
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
    <StyledContentForm
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
        <GridContainer>
          <Button htmlType="reset" onClick={() => reset()}>
            Cancel
          </Button>
          <Button htmlType="submit" disabled={!isValid} isPrime>
            Save
          </Button>
        </GridContainer>
      </div>
      <Notification error={isError} />
    </StyledContentForm>
  );
};
