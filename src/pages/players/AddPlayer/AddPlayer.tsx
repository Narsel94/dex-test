import React, { FC } from "react";
import {
  BreadCrumbs,
  Preloader,
  ControledInput,
  Button,
  StyledSelect,
  ContentForm,
  ErrorBlock,
  GridContainer,
  FileInput,
} from "../../../common/components";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import {
  usePositions,
  useTeamOptions,
} from "../../../modules/players/components";
import { addPlayerRequest } from "../../../api/players/playersRequests";
import { TAddNewPlayerForm } from "../../../modules/players/types";
import { saveImageRequest } from "../../../api/auth/saveImage";
import styles from "./AddPlayer.module.css";

const imagesUrl = process.env.REACT_APP_IMAGES;

export const AddNewPlayer: FC = () => {
  const { positions, error, errorMessage, isLoading } = usePositions();

  const teamsOptions = useTeamOptions();
  const navigate = useNavigate();

  const { reset, control, handleSubmit, formState, setValue, setError } =
    useForm<TAddNewPlayerForm>({ mode: "onBlur" });
  const { isValid, errors } = formState;

  const onSub = (data: TAddNewPlayerForm) => {
    const formData = new FormData();
    formData.append(`file`, data.avatarUrl);
    saveImageRequest(formData)
      ?.then((res) => {
        const preparedData = {
          name: data.name,
          number: data.number,
          position: data.position.value,
          team: data.team?.value,
          birthday: new Date(data.birthday).toISOString(),
          height: data.height,
          weight: data.weight,
          avatarUrl: `${imagesUrl}${res}`,
        };

        return preparedData;
      })
      .then((newData) => addPlayerRequest(newData))
      ?.then(() => {
        reset();
        navigate("/players");
      });
  };

  if (isLoading) {
    return <Preloader />;
  }
  if (error) {
    return <ErrorBlock errorMessage={errorMessage} />;
  }

  return (
    <section className={styles.wrapper}>
      <BreadCrumbs />
      <ContentForm encType="multipart/form-data" onSubmit={handleSubmit(onSub)}>
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
      </ContentForm>
    </section>
  );
};
