import React, { useState } from "react";
import {
  Button,
  ControledInput,
  FileInput,
  Notification
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
  const [isError, setisError] = useState<unknown | undefined>(
    undefined
  );
  const { control, handleSubmit, formState, setError, reset } =
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
        .then(() => navigate("/teams")).catch(error => {
          setisError(error)
        });
    }

    saveImageRequest(data.avatarUrl)
      ?.then((res) => {
        const preparedData = {
          userName: data.userName || userName,
          avatarUrl: `${base}${res}`,
        };
        return updateUserRequest(preparedData)
          ?.then((res) => {
            if (res) {
              if (preparedData.avatarUrl)
                setCookie("avatarUrl", preparedData.avatarUrl);
              if (preparedData.userName)
                setCookie("name", preparedData.userName);
            }
          })
          .then(() => navigate("/teams"));
      })
      .catch((error) => {
        if (error instanceof TypeError) {
          console.log(error.stack);

          setError("avatarUrl", {
            type: "Custom",
            message: `Слишком большой файл`,
          });
        }
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="avatarUrl"
        render={({ field: { onChange, onBlur, value } }) => (
          <FileInput
            onBlurProp={onBlur}
            onFileSelect={onChange}
            defaultImageUrl={avatarUrl}
            error={errors.avatarUrl?.message}
          />
        )}
      />
      <Controller
        control={control}
        defaultValue={userName}
        name="userName"
        render={({ field: { onChange, onBlur, value } }) => (
          <ControledInput
            title="Name"
            onChange={onChange}
            onBlur={onBlur}
            propValue={value}
            error={errors.userName?.message}
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
      <Notification error={isError}/>
    </form>
  );
};
