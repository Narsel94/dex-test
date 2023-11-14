import React from "react";
import {
  Button,
  ControledInput,
  GridContainer,
  UrlInput,
} from "../../../common/components/exports";
import { useForm, Controller } from "react-hook-form";
import { updateUserRequest } from "../../../api/auth/update-user";
import { getCookie, setCookie } from "../../../common/helpers/cookies";

import styles from "./update-form.module.css";
import { useNavigate } from "react-router";


type TUserForm = {
  userName?: string;
  avatarUrl?: string;
};

export const UpdateUserForm = () => {
  const { control, handleSubmit, formState, setValue, reset } =
    useForm<TUserForm>({
      mode: "onBlur",
    });
  const avatarUrl = getCookie('avatarUrl')
  const userName = getCookie('name')
  const navigate = useNavigate()
  const {errors, isValid} = formState
  const onSubmit = (data:TUserForm) => {
    updateUserRequest(data)?.then((res) => {
      if (res) {
        if (data.avatarUrl) setCookie('avatarUrl', data.avatarUrl);
        if (data.userName) setCookie('name', data.userName);
      }
    }).then(()=> navigate('/teams'))
  };

  return (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
          defaultValue={avatarUrl}
          control={control}
          name="avatarUrl"
          rules={{
            required: 'Required'
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <UrlInput
            extraClass={styles.photo}
              setValue={setValue}
              onDrop={onChange}
              onChange={onChange}
              onBlur={onBlur}
              name="avatarUrl"
              value={value}
              error={errors.avatarUrl?.message}
            />
          )}
        />
        <Controller
          control={control}
          defaultValue={userName}
          rules={{
            required: 'Required'
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
          <Button htmlType="reset"  onClick={() => reset()}>
            Cancel
          </Button>
          <Button htmlType="submit" disabled={!isValid} isPrime>
            Save
          </Button>
        </GridContainer>
      </form>
  );
};
