import React from "react";
import { Form } from "../../components/exports";
import { useForm, Controller } from "react-hook-form";
import { signInRequest } from "../../../../api/auth/sign-in";
import { useNavigate } from "react-router";

import {
  ControledInput,
  Button,
  PasswordInputLabel,
} from "../../../../common/components/exports";

type TSignInFormValue = {
  login: string;
  password: string;
};


export const SignInForm = () => {
  const { control, handleSubmit, formState, reset } = useForm<TSignInFormValue>(
    { mode: "onBlur" }
  );

  const { isValid, errors } = formState;
  const navigate = useNavigate()
  const onSubmit = (data: TSignInFormValue) => {
    signInRequest(data).then(()=> navigate('/teams'));
    reset();
  };

  return (
    <Form title="Sign In" onSubmit={handleSubmit(onSubmit)}>
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
          <PasswordInputLabel
            onChange={onChange}
            title="Password"
            onBlur={onBlur}
            selected={value}
            error={errors?.password?.message}
          />
        )}
      />
      <Button htmlType="submit" isPrime disabled={!isValid}>
        Sign In
      </Button>
    </Form>
  );
};
