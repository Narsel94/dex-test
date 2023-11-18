import React from "react";
import { UpdateUserForm } from "../../modules/auth/UpdateUserForm/UpdateUserForm";
import styles from './ProfilePage.module.css'

export const ProfilePage = () => {
  return (
    <div className={styles.wrapper}>
      <UpdateUserForm />
    </div>
  );
};
