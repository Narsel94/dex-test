import React, { FC } from "react";
import {
  ImageContainer,
  SignUpForm,
  LinkBlock,
} from "../../modules/auth/components/exports";
import styles from "./SignUp.module.css";

import signUpImage from "../../assests/images/sign-up.svg";

export const SignUp: FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <SignUpForm />
        <LinkBlock message="Already a member?" text="Sign in" to="/" />
      </div>

      <div className={styles.asside}>
        {" "}
        <ImageContainer src={signUpImage}></ImageContainer>
      </div>
    </section>
  );
};
