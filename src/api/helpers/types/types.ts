import { type } from "os";

export type RequestGenericType = string;

export type TSignInRequest = {
  login: string;
  password: string;
};

export type TSignInResponse = {
  name: string;
  avatarUrl: string;
  token: string;
};

export type TSignUpResponse = TSignInResponse;

export type TSignUpRequest = {
  login: string;
  password: string;
  userName: string;
};


