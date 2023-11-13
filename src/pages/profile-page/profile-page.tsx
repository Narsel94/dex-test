import React from "react";
import { FormWrapper } from "../../common/components/exports";
import { UpdateUserForm } from "../../modules/auth/update-user-form.tsx/update-user-form";
import { SaveImageForm } from "../../modules/auth/image-form/image-form";
import styles from './profile-page.module.css'
import { AddFormContainer } from "../../modules/content/components/exports";

export const ProfilePage = () => {
  return (
    <div className={styles.wrapper}>
      <UpdateUserForm />
      <SaveImageForm />
    </div>
  );
};
