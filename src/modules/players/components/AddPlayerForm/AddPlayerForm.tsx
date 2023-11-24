import React, { FC } from "react";
import { usePositions } from "../../hooks/usePositions";
import { useTeamOptions } from "../../hooks/useTeamOptions";
import { useNavigate } from "react-router";
import { TAddNewPlayerForm } from "../../types";
import { Controller, useForm } from "react-hook-form";
import { addPlayerRequest } from "../../../../api/players/playersRequests";
import {
  Button,
  ControledInput,
  ErrorBlock,
  FileInput,
  GridContainer,
  Preloader,
  StyledContentForm,
  StyledSelect,
} from "../../../../common/components";
import styles from "./AddPlayerForm.module.css";

export const AddPlayerForm: FC = () => {
  const { positions, error, errorMessage, isLoading } = usePositions();

  const teamsOptions = useTeamOptions();
  const navigate = useNavigate();

  const { reset, control, handleSubmit, formState, setError } =
    useForm<TAddNewPlayerForm>({ mode: "onBlur" });
    
  const { isValid, errors } = formState;

  const onSub = (data: TAddNewPlayerForm) => {
    addPlayerRequest(data)
      .then(() => navigate("/players"))
      .catch((error) => {
        if (error instanceof TypeError) {
          setError("avatarUrl", {
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

  if (isLoading) {
    return <Preloader />;
  }
  if (error) {
    return <ErrorBlock errorMessage={errorMessage} />;
  }

  return (
    <StyledContentForm
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSub)}
    >
      <Controller
        control={control}
        name="avatarUrl"
        rules={{
          required: "Required",
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
          rules={{
            required: "Required",
          }}
          render={({ field }) => (
            <StyledSelect
              {...field}
              error={errors.team?.message}
              options={teamsOptions}
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
              options={positions}
              error={errors.position?.message}
            />
          )}
        />
        <GridContainer>
          <Controller
            control={control}
            name="height"
            rules={{
              required: "Required",
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
              required: "Required",
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
          <Button htmlType="submit" disabled={!isValid} isPrime>
            Save
          </Button>
        </GridContainer>
      </div>
    </StyledContentForm>
  );
};
