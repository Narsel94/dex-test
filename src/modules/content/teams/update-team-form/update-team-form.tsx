import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ControledInput,
  GridContainer,
  UrlInput,
} from "../../../../common/components/exports";
import { AddFormContainer } from "../../components/exports";
import { updateTeamRequest } from "../../../../api/teams/teams-api";
import { TTeamData } from "../../../../api/teams/types";

import styles from "./update-team-form.module.css";

type TUpdateForm = {
  name: string;
  foundationYear?: number;
  division?: string;
  conference?: string;
  imageUrl?: string;
};

type TFormProp = {
  data: TTeamData;
};

export const UpdateTeamForm: FC<TFormProp> = ({ data }) => {
  const { control, handleSubmit, formState, reset, setValue } =
    useForm<TUpdateForm>({
      mode: "onBlur",
    });
  const { isValid, errors } = formState;
  const navigate = useNavigate();
  const onSubmit = (formData: TUpdateForm) => {
    const { id } = data;
    console.log({ ...formData, id });
    updateTeamRequest({ ...formData, id })
      ?.then(() => navigate("/teams"))
      .finally(() => {
        reset();
      });
  };
  return (
    <AddFormContainer
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <Controller
        control={control}
        defaultValue={data.imageUrl}
        name="imageUrl"
        render={({ field: { onChange, onBlur, value } }) => (
          <UrlInput
            setValue={setValue}
            onDrop={onChange}
            onChange={onChange}
            onBlur={onBlur}
            name="imageUrl"
            value={value}
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
    </AddFormContainer>
  );
};
