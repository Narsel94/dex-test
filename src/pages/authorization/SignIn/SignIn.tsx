import React, { FC } from "react";
import { SignInForm, ImageContainer } from "../../../modules/auth/components";
import styles from "./SignIn.module.css";
import signInImage from "../../../assests/images/sign-in.svg";
import { Link } from "react-router-dom";

export const SignIn: FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <SignInForm />
        <span className={styles.linkWrapper}>
          Not a member yet?
          <Link className={styles.link} to="/sign-up">
            Sign up
          </Link>
        </span>
      </div>
      <div className={styles.asside}>
        <ImageContainer src={signInImage}></ImageContainer>
      </div>
    </section>
  );
};
