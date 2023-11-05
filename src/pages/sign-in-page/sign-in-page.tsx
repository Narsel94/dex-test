import React, { ChangeEvent, FC } from "react";
import {
  SignInForm,
  FormContainer,
  ImageContainer,
  LinkBlock
} from "../../modules/auth/components/exports";
import { useMobileMediaQuery } from "../../common/hooks/useMobileMediaQuery";
import signInImage from "../../assests/images/sign-in.svg";

export const SignInPage:FC = () => {
  const isMobile = useMobileMediaQuery();

  return (
    <>
      <FormContainer>
        <SignInForm />
        <LinkBlock message="Not a member yet?" text="Sign up" to="/sign-up"/>
      </FormContainer>
      {!isMobile && <ImageContainer src={signInImage}></ImageContainer>}
    </>
  );
};
