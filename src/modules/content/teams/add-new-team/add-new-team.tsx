import React, { useRef } from "react";
import {
  BreadCrumbs,
  ControledInput,
  Button,
  UrlInput,
  FormWrapper,
  GridContainer

} from "../../../../common/components/exports";
import { useNavigate, useNavigation } from "react-router";
import { AddFormContainer } from "../../components/exports";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch";
import { addTeamThunk } from "../async-thunk";
import styles from "./add-new-team.module.css";

type TAddForm = {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl?: string;
};

export const AddNewTeam = () => {
  const { control, handleSubmit, formState, reset, setValue } =
    useForm<TAddForm>({
      mode: "onBlur",
    });
  const { isValid, errors } = formState;
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const onSubmit = (data: TAddForm) => {
    dispatch(addTeamThunk(data)).then(()=>navigate('/teams')).finally(() => {
      reset();
    });
  };

  return (
    <FormWrapper>
      <BreadCrumbs />
      <AddFormContainer
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <Controller
          control={control}
          name="imageUrl"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <UrlInput
              setValue={setValue}
              onDrop={onChange}
              onChange={onChange}
              onBlur={onBlur}
              name="imageUrl"
              value={value}
              error={errors.imageUrl?.message}
            />
          )}
        />
        <div className={styles.fieldsContainer}>
          <Controller
            control={control}
            rules={{
              required: "Required",
            }}
            name="name"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <ControledInput
                title="Name"
                onChange={onChange}
                onBlur={onBlur}
                propValue={value}
                error={errors?.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="division"
            rules={{
              required: "Required",
            }}
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <ControledInput
                title="Division"
                onChange={onChange}
                onBlur={onBlur}
                propValue={value}
                error={errors?.division?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="conference"
            rules={{
              required: "Required",
            }}
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <ControledInput
                title="Conference"
                onChange={onChange}
                onBlur={onBlur}
                propValue={value}
                error={errors?.conference?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="foundationYear"
            rules={{
              required: "Required",
            }}
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <ControledInput
                title="Year of foundation"
                type="number"
                propValue={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors?.foundationYear?.message}
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
        </div>
      </AddFormContainer>
    </FormWrapper>
  );
};
