import { useForm, Controller } from "react-hook-form";
import { signInRequest } from "../../../../api/auth/signIn";
import { useNavigate } from "react-router";
import { useError } from "../../../../common/hooks/useError";
import {
  ControledInput,
  Button,
  Notification,
} from "../../../../common/components";
import styles from './SignInForm.module.css'

type TSignInFormValue = {
  login: string;
  password: string;
};

export const SignInForm = () => {
  const [isError, setIsError] = useError();

  const { control, handleSubmit, formState, reset, setError } =
    useForm<TSignInFormValue>({ mode: "onBlur" });

  const { isValid, errors } = formState;
  const navigate = useNavigate();
  const onSubmit = (data: TSignInFormValue) => {
    signInRequest(data)
      .then(() => {
        navigate("/teams");
      })
      .catch((error) => {
        if (error.status === 401) {
          setIsError(
            "User with the specified username / password was not found."
          );
          setError("password", {
            type: error.status.toString(),
            message: "Wrong password. Please, try again.",
          });
          return
        }
        if (error.status === 404) {
          setError("password", {
            type: error.status.toString(),
            message: `Server Error. Error: ${error.status}`,
          });
          setIsError(error)

        }
        setIsError(error)
      });
    reset();
  };

  return (
    <>
      <form className={styles.form}onSubmit={handleSubmit(onSubmit)}>
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
