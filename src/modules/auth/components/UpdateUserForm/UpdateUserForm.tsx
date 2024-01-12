import {
  Button,
  ControledInput,
  FileInput,
  Notification,
} from "../../../../common/components";
import { useForm, Controller } from "react-hook-form";
import { TAuthThunk, updateUserThunk } from "../../asynkThunk";
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch";
import { useNavigate } from "react-router";
import styles from "./UpdateUserForm.module.css";
import { PayloadAction } from "@reduxjs/toolkit";
import { TUpdateUserRequest } from "../../../../api/helpers/types/types";
import { useError } from "../../../../common/hooks/useError";

type TUserForm = {
  userName?: string;
  avatarUrl?: File;
};

export const UpdateUserForm = () => {
  const dispatch = useAppDispatch();
  const [isError, setisError] = useError(undefined);
  const { control, handleSubmit, formState, reset } =
    useForm<TUserForm>({
      mode: "all",
    });
  const avatarUrl = sessionStorage.getItem("avatarUrl") || undefined;
  const userName = sessionStorage.getItem("name") || undefined;
  const navigate = useNavigate();
  const { errors, isValid } = formState;

  const onSubmit = async (data: TUserForm) => {
    const preparedData = {
      userName: data.userName || userName,
      avatarUrl: data.avatarUrl || avatarUrl,
    };
    const { payload } = (await dispatch(
      updateUserThunk(preparedData)
    )) as PayloadAction<TAuthThunk<TUpdateUserRequest>>;
    if (payload.ok) {
      navigate("/teams");
    } else {
      setisError(payload.error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="avatarUrl"
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
      <Notification error={isError} />
    </form>
  );
};
