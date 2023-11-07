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

export type TSignUpRequest = {
  login: string;
  password: string;
  userName: string;
};

export type TSignUpResponse = {
  name: string;
  avatarUrl: string;
  token: string;
};

