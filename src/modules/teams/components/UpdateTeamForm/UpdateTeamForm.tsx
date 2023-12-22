import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ControledInput,
  FileInput,
  Notification,
} from "../../../../common/components";
import { updateTeamRequest } from "../../../../api/teams/teamsRequests";
import { TTeamData } from "../../../../api/teams/TTeams";
import { useError } from "../../../../common/hooks/useError";
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
  const [isError, setisError] = useError();

  const { control, handleSubmit, formState, reset } = useForm<TUpdateForm>({
    mode: "onBlur",
  });
  const { isValid, errors } = formState;
  const navigate = useNavigate();
  const onSubmit = (form: TUpdateForm) => {
    const preparedData = {
      name: form.name,
      foundationYear: form.foundationYear,
      id: data.id,
      division: form.division,
      conference: form.conference,
      imageUrl: form.imageUrl || data.imageUrl,
    };
    return updateTeamRequest(preparedData)
      ?.then(() => navigate("/teams"))
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
        name="imageUrl"
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
          rules={{
            required: "Required",
            validate: (value) =>
              value && value > new Date().getFullYear()
                ? "The date can't be in the future."
                : value && value < 1891
                ? "Imposible year"
                : true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <ControledInput
              title="Year of foundation"
              type="number"
              propValue={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.foundationYear?.message}
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
