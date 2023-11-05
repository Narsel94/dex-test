import React, {FC} from "react";
import {
  ImageContainer,
  SignUpForm,
  FormContainer,
  LinkBlock
} from "../../modules/auth/components/exports";
import { useMobileMediaQuery } from "../../common/hooks/useMobileMediaQuery";

import signUpImage from '../../assests/images/sign-up.svg'

export const SignUpPage:FC = () => {
  const isMobile = useMobileMediaQuery();

  return (
    <>
    <FormContainer>
      <SignUpForm />
      <LinkBlock message="Already a member?" text="Sign in" to="/"/>
    </FormContainer>
    {!isMobile && <ImageContainer src={signUpImage}></ImageContainer>}
  </>
  )
}
