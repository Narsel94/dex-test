import React, { useEffect } from "react";
import { AuthFormWrapper } from "..";
import { useForm, Controller } from "react-hook-form";
import { signUpRequest } from "../../../../api/auth/signUp";
import {
  ControledInput,
  Checkbox,
  Button,
} from "../../../../common/components";

type TSignUpData = {
  check: boolean;
  userName: string;
  login: string;
  confirmPassword: string;
  password: string;
};

export const SignUpForm = () => {
  const { control, handleSubmit, formState, reset, watch } =
    useForm<TSignUpData>({ mode: "onBlur" });
  const { isValid, errors, isSubmitSuccessful } = formState;

  const password = watch("password");

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const onSubmit = (data: TSignUpData) => {
    const { check, confirmPassword, ...rest } = data;
    signUpRequest(rest);
    reset();
  };

  return (
    <AuthFormWrapper title="Sign Up" onSubmit={handleSubmit(onSubmit)}>
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
            value === password ? true : "Пароли должны совпадать",
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
    </AuthFormWrapper>
  );
};