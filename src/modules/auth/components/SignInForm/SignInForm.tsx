import React from "react";
import { AuthFormWrapper } from "..";
import { useForm, Controller } from "react-hook-form";
import { signInRequest } from "../../../../api/auth/signIn";
import { useNavigate } from "react-router";

import {
  ControledInput,
  Button,
} from "../../../../common/components";
import styles from './SignInForm.module.css'

type TSignInFormValue = {
  login: string;
  password: string;
};

export const SignInForm = () => {
  const { control, handleSubmit, formState, reset, setError } = useForm<TSignInFormValue>(
    { mode: "onBlur" }
  );
  
  const { isValid, errors } = formState;
  const navigate = useNavigate();
  const onSubmit = (data: TSignInFormValue) => {
    signInRequest(data)
      .then(() => {navigate("/teams");
      })
      .catch((error) => {
        if (error.status === 401) {
          setError('password', {
            type: error.status.toString(),
            message: 'Wrong password. Please, try again.'
          })
        }
        if (error.status === 404) {
          setError('password', {
            type: error.status.toString(),
            message: `Server Error. Error: ${error.status}`
          })
        }
      });
    reset();
  };

  return (
    <>
    <AuthFormWrapper title="Sign In Привет" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        rules={{ required: "Введите логин" }}
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
        rules={{ required: "Введите пароль" }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <ControledInput
            type="password"
            onChange={onChange}
            title="Password"
            onBlur={onBlur}
            propValue={value }
            error={errors?.password?.message}
          />
        )}
      />
      <Button htmlType="submit" isPrime disabled={!isValid}>
        Sign In
      </Button>
    </AuthFormWrapper>
    {(errors.password?.type === '401') && <div className={styles.error}>User with the specified username / password was not found.</div>}
    </>
  );
};
