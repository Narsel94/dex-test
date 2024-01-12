import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { useError } from "../../../../common/hooks/useError";
import {
  ControledInput,
  Button,
  Notification,
} from "../../../../common/components";
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch";
import { signInThunk, TAuthThunk } from "../../asynkThunk";
import { TSignInResponse } from "../../../../api/helpers/types/types";
import { PayloadAction } from "@reduxjs/toolkit";

import styles from "./SignInForm.module.css";

type TSignInFormValue = {
  login: string;
  password: string;
};

export const SignInForm = () => {
  const [isError, setIsError] = useError();

  const { control, handleSubmit, formState } =
    useForm<TSignInFormValue>({ mode: "all" });

  const { isValid, errors } = formState;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: TSignInFormValue) => {
    try {
      const { payload } = (await dispatch(signInThunk(data))) as PayloadAction<
        TAuthThunk<TSignInResponse>
      >;
      if (!payload.ok) {
        if (payload.error === "401") {
          setIsError(
            "User with the specified username / password was not found."
          );
        } else {
          setIsError(payload.error);
        }
      } else {
        navigate("/teams");
      }
    } catch (err) {
      setIsError(err);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Sign In</h1>
        <Controller
          control={control}
          rules={{ required: "Please enter your login" }}
          name="login"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ControledInput
              title="Login"
              onChange={onChange}
              onBlur={onBlur}
              propValue={value}
              error={errors?.login?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: "Please enter your password" }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ControledInput
              type="password"
              onChange={onChange}
              title="Password"
              onBlur={onBlur}
              propValue={value}
              error={errors?.password?.message}
            />
          )}
        />
        <Button htmlType="submit" isPrime disabled={!isValid}>
          Sign In
        </Button>
      </form>
      <Notification error={isError} />
    </>
  );
};
