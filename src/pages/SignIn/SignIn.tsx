import React, {  FC } from "react";
import {
  SignInForm,
  ImageContainer,
  LinkBlock,
} from "../../modules/auth/components/exports";
import styles from "./SignIn.module.css";
import signInImage from "../../assests/images/sign-in.svg";

export const SignIn: FC = () => {

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <SignInForm />
        <LinkBlock message="Not a member yet?" text="Sign up" to="/sign-up" />
      </div>

      <div className={styles.asside}>
        <ImageContainer src={signInImage}></ImageContainer>
      </div>
    </section>
  );
};
