import React from "react";
import { UpdateUserForm } from "../../modules/auth/update-user-form.tsx/update-user-form";
import styles from './ProfilePage.module.css'

export const ProfilePage = () => {
  return (
    <div className={styles.wrapper}>
      <UpdateUserForm />
    </div>
  );
};
