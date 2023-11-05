import React, { FormEvent } from "react";
import {
  BreadCrumbs,
  Preloader,
  ControledInput,
  Button,
  StyledSelect,
  UrlInput
} from "../../../../common/components/exports";
import { AddFormContainer, ErrorBlock,  } from "../../components/exports";
import Select from "react-select";
import { useMobileMediaQuery } from "../../../../common/hooks/useMobileMediaQuery";
import { useForm, Controller } from "react-hook-form";
import { usePositions } from "../components/exports";
// import { useTeamsOptions } from "../components/get-teams-options.ts/get-teams-options";
import classNames from "classnames";
import styles from "./add-new-player.module.css";

type TAddNewPlayer = {
  name: string;
  number: number;
  position: {
    label: string;
    value: string;
  };
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
};

export const AddNewPlayer = () => {
  const isMobile = useMobileMediaQuery();
  const formClasses = classNames(styles.form, {
    [styles.formMobile]: isMobile,
  });

  const { positions, error, errorMessage, isLoading } = usePositions();

  // const teams = useTeamsOptions();

  const { reset, control, handleSubmit, formState, setValue } =
    useForm<TAddNewPlayer>({ mode: "onBlur" });
  const { isValid, errors } = formState;

  const options = [
    { label: "Center Forward", value: "Center Forward" },
    { label: "Guard Forward", value: "Guard Forward" },
    { label: "Forward", value: "Forward" },
    { label: "Center", value: "Center" },
    { label: "Guard", value: "Guard" },
  ];

  const onSub = (data: TAddNewPlayer) => {
    const preparedData = {
      name: data.name,
      number: data.number,
      position: data.position?.value,
      team: data.team,
      birthday: new Date(data.birthday).toISOString(),
      height: data.height,
      weight: data.weight,
      avatarUrl: data.avatarUrl,
    };
    console.log(preparedData);
  };

  if (isLoading) {
    return <Preloader />;
  }
  if (error) {
    return <ErrorBlock errorMessage={errorMessage} />;
  }

  return (
    <div className={styles.wrapper}>
      <BreadCrumbs />
      <AddFormContainer
        className={formClasses}
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSub)}
      >
        <Controller
          control={control}
          rules={{
            required: "Required",
          }}
          defaultValue=""
          name="avatarUrl"
          render={({ field: { onBlur, value, onChange, ref } }) => (
            <UrlInput
            setValue= {setValue}
            onDrop={onChange}
            onChange={onChange}
            onBlur={onBlur}
            name="avatarUrl"
            value={value}
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
          {/* <Controller
            control={control}
            name="team"
            rules={{
              required: "Required",
            }}
            render={({ field }) => <StyledSelect {...field} options={teams} />}
          /> */}
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
            <Button htmlType="submit" isPrime>
              Save
            </Button>
          </div>
        </div>
      </AddFormContainer>
    </div>
  );
};
