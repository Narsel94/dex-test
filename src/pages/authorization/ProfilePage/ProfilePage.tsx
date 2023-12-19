import { UpdateUserForm } from "../../../modules/auth/components";
import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
  return (
    <div className={styles.wrapper}>
      <UpdateUserForm />
    </div>
  );
};
