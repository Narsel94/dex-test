import {
  BreadCrumbs,
  ControledInput,
  Button,
  GridContainer,
  FileInput,
  ContentForm
} from "../../../common/components";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../common/hooks/useAppDispatch";
import { addTeamThunk } from "../../../modules/teams/asyncThunk";
import { saveImageRequest } from "../../../api/auth/saveImage";
import styles from "./AddTeam.module.css";

const imagesUrl = process.env.REACT_APP_IMAGES;

type TAddForm = {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
};

export const AddNewTeam = () => {
  const { control, handleSubmit, formState, reset, setValue } =
    useForm<TAddForm>({
      mode: "onBlur",
    });
  const { isValid, errors } = formState;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: TAddForm) => {
    const formData = new FormData();
    formData.append("file", data.imageUrl);
    saveImageRequest(formData)
      ?.then((res) => {
        const preparedData = {
          name: data.name,
          foundationYear: data.foundationYear,
          division: data.division,
          conference: data.conference,
          imageUrl: `${imagesUrl}${res}`,
        };
        dispatch(addTeamThunk(preparedData));
      })
      .then(() => navigate("/teams"))
      .finally(() => {
        reset();
      });
  };

  return (
    <section className={styles.wrapper}>
      <BreadCrumbs />
      <ContentForm
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <Controller
          control={control}
          name="imageUrl"
          render={({ field: { onChange, onBlur } }) => (
            <FileInput
              onBlurProp={onBlur}
              onFileSelect={onChange}
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
      </ContentForm>
    </section>
  );
};
