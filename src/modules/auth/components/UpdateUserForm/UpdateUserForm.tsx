import React from "react";
import {
  Button,
  ControledInput,
  GridContainer,
  FileInput,
} from "../../../../common/components";
import { useForm, Controller } from "react-hook-form";
import { updateUserRequest } from "../../../../api/auth/updateUser";
import { saveImageRequest } from "../../../../api/auth/saveImage";
import { getCookie, setCookie } from "../../../../common/helpers/cookies";
import { useNavigate } from "react-router";
import styles from "./UpdateUserForm.module.css";


const base = process.env.REACT_APP_IMAGES;

type TUserForm = {
  userName?: string;
  avatarUrl?: File;
};

export const UpdateUserForm = () => {
  const { control, handleSubmit, formState, setValue, reset } =
    useForm<TUserForm>({
      mode: "onBlur",
    });
  const avatarUrl = getCookie("avatarUrl");
  const userName = getCookie("name");
  const navigate = useNavigate();
  const { errors, isValid } = formState;

  const onSubmit = (data: TUserForm) => {
    if (!data.avatarUrl) {
      const preparedData = {
        userName: data.userName || userName,
        avatarUrl: avatarUrl,
      };
      return updateUserRequest(preparedData)
        ?.then((res) => {
          if (res) {
            if (preparedData.avatarUrl)
              setCookie("avatarUrl", preparedData.avatarUrl);
            if (preparedData.userName) setCookie("name", preparedData.userName);
          }
        })
        .then(() => navigate("/teams"));
    }

    const formData = new FormData();
    formData.append(`file`, data.avatarUrl);
    saveImageRequest(formData)?.then((res) => {
      const preparedData = {
        userName: data.userName || userName,
        avatarUrl: `${base}${res}`,
      };
      return updateUserRequest(preparedData)
        ?.then((res) => {
          if (res) {
            if (preparedData.avatarUrl)
              setCookie("avatarUrl", preparedData.avatarUrl);
            if (preparedData.userName) setCookie("name", preparedData.userName);
          }
        })
        .then(() => navigate("/teams"));
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="avatarUrl"
        rules={{
          required: "Required",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FileInput
            onBlurProp={onBlur}
            onFileSelect={onChange}
            defaultImageUrl={avatarUrl}
          />
        )}
      />
      <Controller
        control={control}
        defaultValue={userName}
        rules={{
          required: "Required",
        }}
        name="userName"
        render={({ field: { onChange, onBlur, value } }) => (
          <ControledInput
            title="Name"
            onChange={onChange}
            onBlur={onBlur}
            propValue={value}
            error={errors.avatarUrl?.message}
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
    </form>
  );
};
