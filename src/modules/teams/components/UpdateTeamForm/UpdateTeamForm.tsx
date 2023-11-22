import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ControledInput,
  FileInput,
  GridContainer,
  ContentForm,
} from "../../../../common/components";
import { updateTeamRequest } from "../../../../api/teams/teamsRequests";
import { TTeamData } from "../../../../api/teams/TTeams";
import styles from "./UpdateTeamForm.module.css";

type TUpdateForm = {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: File;
};

type TFormProp = {
  data: TTeamData;
};

export const UpdateTeamForm: FC<TFormProp> = ({ data }) => {
  const { control, handleSubmit, formState, reset, setError } =
    useForm<TUpdateForm>({
      mode: "onBlur",
    });
  const { isValid, errors } = formState;
  const navigate = useNavigate();
  const onSubmit = (form: TUpdateForm) => {
    const preparedData = {
      name: form.name || data.name,
      foundationYear: form.foundationYear || data.foundationYear,
      id: data.id,
      division: form.division || data.division,
      conference: form.conference || data.conference,
      imageUrl: form.imageUrl || data.imageUrl,
    };
    return updateTeamRequest(preparedData)
      ?.then(() => navigate("/teams"))
      .catch((error) => {
        if (error instanceof TypeError) {
          setError("imageUrl", {
            type: "Custom",
            message: `Слишком большой файл`,
          });
        }
        if (error.status === 409) {
          setError("name", {
            type: error.status.toString(),
            message: `Поле имя должно быть уникальным`,
          });
        }
      });
  };

  return (
    <ContentForm
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <Controller
        control={control}
        name="imageUrl"
        render={({ field: { onChange, onBlur } }) => (
          <FileInput
            onBlurProp={onBlur}
            onFileSelect={onChange}
            defaultImageUrl={data?.imageUrl}
            error={errors.imageUrl?.message}
          />
        )}
      />
      <div className={styles.fieldsContainer}>
        <Controller
          control={control}
          defaultValue={data.name}
          rules={{
            required: "Required",
          }}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
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
          defaultValue={data.division}
          render={({ field: { onChange, onBlur, value } }) => (
            <ControledInput
              title="Division"
              onChange={onChange}
              onBlur={onBlur}
              propValue={value}
            />
          )}
        />
        <Controller
          control={control}
          name="conference"
          defaultValue={data.conference}
          render={({ field: { onChange, onBlur, value } }) => (
            <ControledInput
              title="Conference"
              onChange={onChange}
              onBlur={onBlur}
              propValue={value}
            />
          )}
        />
        <Controller
          control={control}
          name="foundationYear"
          defaultValue={data.foundationYear}
          render={({ field: { onChange, onBlur, value } }) => (
            <ControledInput
              title="Year of foundation"
              type="number"
              propValue={value}
              onChange={onChange}
              onBlur={onBlur}
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
    </ContentForm>
  );
};
