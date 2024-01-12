import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Notification,
  ControledInput,
  Checkbox,
  Button,
} from "../../../../common/components";
import { useNavigate } from "react-router";
import { useError } from "../../../../common/hooks/useError";
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch";
import { TAuthThunk, signUpThunk } from "../../asynkThunk";
import styles from "./SignUpForm.module.css";
import { PayloadAction } from "@reduxjs/toolkit";
import { TSignUpResponse } from "../../../../api/helpers/types/types";

type TSignUpData = {
  check: boolean;
  userName: string;
  login: string;
  confirmPassword: string;
  password: string;
};

export const SignUpForm = () => {
  const [isError, setIsError] = useError();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState, reset, watch } =
    useForm<TSignUpData>({ mode: "all" });
  const { isValid, errors, isSubmitSuccessful } = formState;

  const password = watch("password");

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const onSubmit = async (data: TSignUpData) => {
    const { check, confirmPassword, ...rest } = data;
    try {
      const { payload } = (await dispatch(signUpThunk(rest))) as PayloadAction<
        TAuthThunk<TSignUpResponse>
      >;
      if (!payload.ok) {
        setIsError(payload.error || "Something went wrong!");
      } else {
        navigate("/teams");
      }
    } catch (error) {
      setIsError(error);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Sign Up</h1>
        <Controller
          control={control}
          rules={{ required: "Required" }}
          name="userName"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ControledInput
              title="Name"
              onChange={onChange}
              onBlur={onBlur}
              propValue={value}
              error={errors?.userName?.message}
            />
          )}
        />
        <Controller
          control={control}
          rules={{ required: "Required" }}
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
          rules={{
            required: "Required",
          }}
          name="password"
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
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Required",
            validate: (value) =>
              value === password ? true : "Passwords must match",
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ControledInput
              type="password"
              onChange={onChange}
              title="Enter your password again"
              onBlur={onBlur}
              propValue={value}
              error={formState.errors?.confirmPassword?.message}
            />
          )}
        />
        <Controller
          control={control}
          rules={{ required: "You must be accept the agreement." }}
          name="check"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Checkbox
              checked={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.check?.message}
              text="I accept the agreement"
            />
          )}
        />
        <Button htmlType="submit" isPrime disabled={!isValid}>
          Sign Up
        </Button>
      </form>
      <Notification error={isError} />
    </>
  );
};
