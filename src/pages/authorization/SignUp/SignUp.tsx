import React, { FC } from "react";
import { ImageContainer, SignUpForm } from "../../../modules/auth/components";
import styles from "./SignUp.module.css";

import signUpImage from "../../../assests/images/sign-up.svg";
import { Link } from "react-router-dom";

export const SignUp: FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <SignUpForm />
        <span className={styles.linkWrapper}>
          Already a member?
          <Link className={styles.link} to="/sign-in">
            Sign in
          </Link>
        </span>
      </div>
      <div className={styles.asside}>
        {" "}
        <ImageContainer src={signUpImage}></ImageContainer>
      </div>
    </section>
  );
};
